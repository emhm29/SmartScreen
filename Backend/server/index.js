const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const axios = require('axios'); // Ajoutez axios pour faire des requêtes HTTP
const { createClaim, findClaimById } = require('./claim');
const { createUser, findUserByEmail } = require('./user'); 

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' })); // Augmente la limite de taille des requêtes JSON
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // Augmente la limite de taille des requêtes URL-encoded


app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const userExists = await findUserByEmail(email);
        if (userExists) {
            return res.status(400).json({ error: 'Email déjà utilisé' });
        }

        const user = await createUser(email, password,role);
        res.status(201).json(user);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Erreur lors de la création de l’utilisateur' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('Login attempt for:', email);
    
        const user = await findUserByEmail(email);
        if (!user) {
            console.log('User not found');
            return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
        }
        console.log('User found:', user);


        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        console.log('Password correct');
    }) ;
    
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Token manquant' });
    }
    try {
        const decoded = jwt.verify(token, hardcodedSecretKey);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token invalide' });
    }
};

app.get('/protected', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'Accès autorisé', userId: req.user.userId });
});

app.post('/claims', async (req, res) => {
    const { name, email, description, imageUrl } = req.body;
    try {
        const claim = await createClaim(name, email, description, imageUrl);
        res.status(201).json(claim);
    } catch (error) {
        console.error('Error creating claim:', error);
        res.status(500).json({ error: 'Error creating claim' });
    }
});
// Route de reconnaissance d'image
app.post('/analyze-image', async (req, res) => {
    const { imageBase64, name, email, description, imageUrl } = req.body;
    const API_KEY = 'AIzaSyAh-pVHDkzpgs6YcOJV613DkMXLNeWHi2Q';
    try {
        console.log('Envoi de l\'image à l\'API Google Vision');
        const response = await axios.post(
            `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`,
            {
                requests: [
                    {
                        image: {
                            content: imageBase64,
                        },
                        features: [
                            {
                                type: 'TEXT_DETECTION',
                            },
                        ],
                    },
                ],
            }
        );
        console.log('Réponse de l\'API Google Vision :', response.data);
        const textAnnotations = response.data.responses[0].textAnnotations;
        const recognizedText = textAnnotations ? textAnnotations[0].description : '';

        // Insertion des données dans la base de données
        const claim = await createClaim(name, email, description, imageUrl);
        res.status(200).json({ recognizedText, claim });
    } catch (error) {
        console.error('Erreur lors de l\'analyse de l\'image :', error);
        res.status(500).json({ error: 'Erreur lors de l\'analyse de l\'image' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
