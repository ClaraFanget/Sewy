const mongoose = require("mongoose");
const UtilisateurSchema = mongoose.Schema(
  {
    nom: {
      type: String,
      required: [true, "Veuille entrer un nom"],
    },
    prenom: {
      type: String,
      required: [true, "Veuille entrer un prénom"],
    },
    pseudo: {
      type: String,
      required: [true, "Veuille entrer un pseudo"],
    },
    mot_de_passe: {
      type: String,
      required: [true, "Veuille entrer un mot de passe"],
    },
    mail: {
      type: String,
      required: [true, "Veuille entrer une adresse mail"],
    },
    mensurations: {
      taille: {
        type: Number,
        required: false,
      },
      poitrine: {
        type: Number,
        required: false,
      },
      longueurDos: {
        type: Number,
        required: false,
      },
      buste: {
        type: Number,
        required: false,
      },
      distanceEpaules: {
        type: Number,
        required: false,
      },
      carrure: {
        type: Number,
        required: false,
      },
      tourTaille: {
        type: Number,
        required: false,
      },
      longueurDevant: {
        type: Number,
        required: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Utilisateur = mongoose.model("Utilisateur", UtilisateurSchema);
module.exports = Utilisateur;
