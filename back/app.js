// Importation des paquets 
const express = require('express');
const mongoose = require('mongoose');

const Thing = require('./models/thing');

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
// Middleware
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Poster un objet
app.post('/api/stuff', (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({
        ...req.body
    });
    thing.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
});

// Récupérer les objets existent
app.get('/api/stuff', (req, res, next) => {
    Thing.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
});

// Récupérer un seul objet
app.get("/api/stuff/:id", (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }));
});

// Modification d'un seul objet
app.put('/api/stuff/:id', (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: "Objet modifié !" }))
        .catch(error => res.status(400).json({ error }))

})
// Suppression d'un seul objet
app.delete('/api/stuff/:id', (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Objet supprimé !" }))
        .catch(error => res.status(400).json({ error }))

})

// Export vers d'autres fichiers rendu possible de l'application
module.exports = app;