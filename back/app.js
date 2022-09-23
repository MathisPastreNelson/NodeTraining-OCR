//Importation d'express
const express = require('express');
//Application express
const app = express();


//Middlewares
//Enregistre requête recue dans la console
app.use((req, res, next) => {
    console.log("Requête recue !")
    next();
});

//Ajoute un code d'état 201 à la réponse
app.use((req, res, next) => {
    res.status(201)
    next();
})

//Envoie la réponse JSON
app.use((req, res, next) => {
    res.json({ message: "Votre requête a bien été reçue !" })
    next();
});

//Enregistre réponse envoyée avec succès dans la console
app.use((req, res) => {
    console.log("Réponse envoyée avec succès !")
})




//Export vers d'autres fichiers rendu possible de l'application
module.exports = app;