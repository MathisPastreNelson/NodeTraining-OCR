// Importation des paquets 
const express = require('express');
const bodyParser = require("body-parser")
const mongoose = require('mongoose');

const stuffRoutes = require('./routes/stuff');

// Connection à Mongoose
mongoose.connect('mongodb+srv://Mathis:08pj2z380Rc6kKT5@atlascluster.1hkdzyx.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// Constante du serveur
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json())

app.use('/api/stuff', stuffRoutes);

// Export vers d'autres fichiers rendu possible de l'application
module.exports = app;