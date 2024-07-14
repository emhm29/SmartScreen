const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { createClaim, findClaimById } = require('./claim');
const { createUser, findUserByEmail } = require('./user'); 

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const userExists = await findUserByEmail(email);
        if (userExists) {
            return res.status(400).json({ error: 'Email déjà utilisé' });
        }

        const user = await createUser(email, password);
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
