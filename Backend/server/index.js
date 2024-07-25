const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcrypt');
const mysql = require('mysql2'); 
const crypto = require('crypto');
const fileUpload = require('express-fileupload');
const pdfParse = require('pdf-parse');
const Poppler = require('pdf-poppler');
const Tesseract = require('tesseract.js');
const path = require('path');
const fs = require('fs');
const { createUser, findUserByEmail, updateUser, deleteUser, getClaims } = require('./user');

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
  createParentPath: true,
}));

// Configuration de la connexion MySQL
const config = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'smartscreen'
};

const connection = mysql.createConnection(config);

connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to the database.");
    }
});

// Middleware d'authentification
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Token manquant' });
    }
    try {
        const decoded = jwt.verify(token, 'hardcodedSecretKey');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token invalide' });
    }
};

// Middleware pour vérifier le rôle de l'utilisateur
const roleMiddleware = (role) => (req, res, next) => {
    console.log('Rôle requis:', role.toLowerCase());
    console.log('Rôle utilisateur:', req.user.role.trim().toLowerCase());
    if (req.user.role.trim().toLowerCase() !== role.toLowerCase()) {
        console.log('Accès refusé. Rôle requis:', role, 'Rôle utilisateur:', req.user.role.trim().toLowerCase());
        return res.status(403).json({ error: 'Accès refusé' });
    }
    next();
};

// Route d'inscription
app.post('/register', async (req, res) => {
    const { email, password, role = 'user' } = req.body;
    try {
        const userExists = await findUserByEmail(email);
        if (userExists) {
            return res.status(400).json({ error: 'Email déjà utilisé' });
        }
        const user = await createUser(email, password, role.toLowerCase());
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création de l’utilisateur' });
    }
});


// Route de connexion
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
      console.log('Attempting to log in with email:', email);

      const user = await findUserByEmail(email);
      if (!user) {
          console.log('User not found');
          return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
      }

      console.log('User found:', user);

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
          console.log('Invalid password');
          return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
      }

      const token = jwt.sign({ userId: user.id, role: user.role.trim().toLowerCase() }, 'hardcodedSecretKey', { expiresIn: '1h' });
      console.log('User role:', user.role.trim().toLowerCase());
      res.status(200).json({ token, id: user.id, role: user.role.trim().toLowerCase() });
  } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).json({ error: 'Erreur lors de la connexion de l’utilisateur' });
  }
});
app.put('/user/:id', async (req, res) => {
    const { id } = req.params;
    const { email, password } = req.body;
    try {
        const updatedUser = await updateUser(id, email, password);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour de l’utilisateur' });
    }
});

app.delete('/user/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await deleteUser(id);
        res.status(200).json(deletedUser);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression de l’utilisateur' });
    }
});


// Route protégée
app.get('/protected', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'Accès autorisé', userId: req.user.userId });
});

// Route pour valider une facture
app.post('/invoices/validate/:id', authMiddleware, roleMiddleware('comptable'), (req, res) => {
    const { id } = req.params;
    connection.query('UPDATE invoices SET status = "validated" WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error validating invoice:', err);
            return res.status(500).json({ error: 'Erreur lors de la validation de la facture' });
        }
        res.status(200).json({ message: 'Facture validée avec succès' });
    });
});

// Route pour créer une facture
app.post('/invoices', (req, res) => {
    const { vendor, client, invoice_date, invoice_number, due_date, payment_terms, reference, total_ht, total_tva, total_ttc, items } = req.body;

    console.log('Received invoice data:', req.body);

    // Verify that all required fields are present
    if (!vendor || !client || !invoice_date || !invoice_number || !due_date || !total_ht || !total_tva || !total_ttc || !items) {
        console.log('Missing required fields');
        return res.status(400).send('Missing required fields');
    }

    const invoiceQuery = 'INSERT INTO invoices (vendor, client, invoice_date, invoice_number, due_date, payment_terms, reference, total_ht, total_tva, total_ttc) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const invoiceValues = [vendor, client, invoice_date, invoice_number, due_date, payment_terms, reference, total_ht, total_tva, total_ttc];

    connection.query(invoiceQuery, invoiceValues, (err, results) => {
        if (err) {
            console.error('Error inserting invoice data:', err);
            return res.status(500).send('Error inserting invoice data');
        }
        const invoiceId = results.insertId;
        console.log('Invoice inserted successfully:', results);

        const itemQueries = items.map(item => {
            const { description, quantity, unit, unit_price_ht, tva_percent, total_tva_item, total_ttc_item } = item;
            const itemQuery = 'INSERT INTO invoice_items (invoice_id, description, quantity, unit, unit_price_ht, tva_percent, total_tva_item, total_ttc_item) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
            const itemValues = [invoiceId, description, quantity, unit, unit_price_ht, tva_percent, total_tva_item, total_ttc_item];
            return new Promise((resolve, reject) => {
                connection.query(itemQuery, itemValues, (err, itemResults) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(itemResults);
                });
            });
        });

        Promise.all(itemQueries)
            .then(itemResults => {
                console.log('All items inserted successfully:', itemResults);
                res.status(201).send('Invoice and items inserted successfully');
            })
            .catch(itemErr => {
                console.error('Error inserting items:', itemErr);
                res.status(500).send('Error inserting items');
            });
    });
});

// Route pour récupérer les factures
app.get('/invoices', authMiddleware, (req, res) => {
    connection.query('SELECT * FROM invoices', (err, results) => {
        if (err) {
            console.error('Error fetching invoices:', err);
            return res.status(500).json({ error: 'Erreur lors de la récupération des factures' });
        }
        res.status(200).json(results);
    });
});

// Route pour mettre à jour une facture
app.put('/invoices/:id', authMiddleware, roleMiddleware('comptable'), (req, res) => {
    const { id } = req.params;
    const { vendor, client, invoice_date, invoice_number, due_date, payment_terms, reference, total_ht, total_tva, total_ttc, items } = req.body;

    // Vérifier que items est défini et est un tableau
    if (!items || !Array.isArray(items)) {
        return res.status(400).json({ error: 'Items doit être un tableau' });
    }

    // Mettre à jour les informations de la facture
    const updateInvoiceQuery = 'UPDATE invoices SET vendor = ?, client = ?, invoice_date = ?, invoice_number = ?, due_date = ?, payment_terms = ?, reference = ?, total_ht = ?, total_tva = ?, total_ttc = ? WHERE id = ?';
    const invoiceValues = [vendor, client, invoice_date, invoice_number, due_date, payment_terms, reference, total_ht, total_tva, total_ttc, id];

    connection.query(updateInvoiceQuery, invoiceValues, (err, results) => {
        if (err) {
            console.error('Error updating invoice:', err);
            return res.status(500).json({ error: 'Erreur lors de la mise à jour de la facture' });
        }

        // Mettre à jour les éléments de la facture
        const deleteItemsQuery = 'DELETE FROM invoice_items WHERE invoice_id = ?';
        connection.query(deleteItemsQuery, [id], (err) => {
            if (err) {
                console.error('Error deleting invoice items:', err);
                return res.status(500).json({ error: 'Erreur lors de la mise à jour des éléments de la facture' });
            }

            const itemQueries = items.map(item => {
                const { description, quantity, unit, unit_price_ht, tva_percent, total_tva_item, total_ttc_item } = item;
                const insertItemQuery = 'INSERT INTO invoice_items (invoice_id, description, quantity, unit, unit_price_ht, tva_percent, total_tva_item, total_ttc_item) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
                const itemValues = [id, description, quantity, unit, unit_price_ht, tva_percent, total_tva_item, total_ttc_item];
                return new Promise((resolve, reject) => {
                    connection.query(insertItemQuery, itemValues, (err, itemResults) => {
                        if (err) {
                            return reject(err);
                        }
                        resolve(itemResults);
                    });
                });
            });

            Promise.all(itemQueries)
                .then(itemResults => {
                    console.log('All items updated successfully:', itemResults);
                    res.status(200).json({ message: 'Facture mise à jour avec succès' });
                })
                .catch(itemErr => {
                    console.error('Error updating items:', itemErr);
                    res.status(500).json({ error: 'Erreur lors de la mise à jour des éléments de la facture' });
                });
        });
    });
});
app.get('/claims', async (req, res) => {
    try {
        const claims = await getClaims();
        res.status(200).json(claims);
    } catch (error) {
        console.error('Error fetching claims:', error);  // Add error logging
        res.status(500).json({ error: 'Erreur lors de la récupération des réclamations' });
    }
});
const uploadPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}
// Route for extracting text from a PDF
app.post('/extract-text', async (req, res) => {
    if (!req.files || !req.files.pdf) {
      console.log('No file uploaded.');
      return res.status(400).send('No file uploaded.');
    }
  
    const pdfBuffer = req.files.pdf.data;
    const pdfPath = path.join(uploadPath, `${Date.now()}.pdf`);
  
    // Sauvegarde temporaire du PDF pour conversion
    fs.writeFileSync(pdfPath, pdfBuffer);
  
    try {
      const data = await pdfParse(pdfBuffer);
      console.log('Extracted text:', data.text);
  
      if (!data.text || data.text.trim() === '') {
        console.log('No text extracted from PDF. Attempting OCR...');
  
        // Conversion du PDF en images
        const options = {
          format: 'jpeg',
          out_dir: path.dirname(pdfPath),
          out_prefix: path.basename(pdfPath, path.extname(pdfPath)),
          page: null,
        };
  
        const result = await Poppler.convert(pdfPath, options);
  
        let ocrResults = '';
  
        for (let i = 0; i < result.length; i++) {
          const imagePath = result[i];
          const ocrResult = await Tesseract.recognize(
            imagePath,
            'eng',
            {
              logger: m => console.log(m),
            }
          );
  
          ocrResults += ocrResult.data.text;
          fs.unlinkSync(imagePath); // Supprime l'image après OCR
        }
  
        fs.unlinkSync(pdfPath); // Supprime le PDF après conversion
  
        if (ocrResults.trim() === '') {
          return res.status(400).send('No text extracted from PDF. Ensure the PDF contains selectable text or try with OCR.');
        }
  
        res.send(ocrResults);
      } else {
        res.send(data.text);
      }
    } catch (err) {
      fs.unlinkSync(pdfPath); // Supprime le PDF en cas d'erreur
      console.error('Error parsing PDF:', err);
      res.status(500).send(err.message);
    }
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});