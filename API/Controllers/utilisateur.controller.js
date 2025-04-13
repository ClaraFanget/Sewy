/**
 * Le controller utilisateur.controller permet la gestion des utilisateurs dans la base de données MongoDB.
 */

const { get } = require("mongoose");
const Utilisateur = require("../Models/utilisateur.model.js");

// getUtilisateurs permet de récupérer tous les utilisateurs
const getUtilisateurs = async (req, res) => {
  try {
    const utilisateurs = await Utilisateur.find({});
    res.status(200).json(utilisateurs);
  } catch (error) {
    res.status(500).json((message = error.message));
  }
};

// getUtilisateur permet de récupérer un utilisateur à partir de son ID
const getUtilisateur = async (req, res) => {
  try {
    const { id } = req.params;
    const utilisateur = await Utilisateur.findById(id);
    res.status(200).json(utilisateur);
  } catch (error) {
    res.status(500).json((message = error.message));
  }
};

// createUtilisateur permet de créer un utilisateur
const createUtilisateur = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.create(req.body);
    res.status(200).json(utilisateur);
  } catch (error) {
    res.status(500).json((message = error.message));
  }
};

// logUser permet de connecter un utilisateur
const logUser = async (req, res) => {
  try {
    const { pseudo, mot_de_passe } = req.body;


    if (!pseudo || !mot_de_passe) {
      return res.status(400).json({
        success: false,
        message: "Pseudo et mot de passe requis",
      });
    }


    const utilisateur = await Utilisateur.findOne({ pseudo });


    if (!utilisateur) {
      return res.status(401).json({
        success: false,
        message: "Pseudo ou mot de passe incorrect",
      });
    }

  
    if (utilisateur.mot_de_passe !== mot_de_passe) {
      return res.status(401).json({
        success: false,
        message: "Mot de passe incorrect",
      });
    }

    const userId = {
      id: utilisateur._id,
    };

    res.status(200).json({
      success: true,
      message: "Connexion réussie",
      user: userId,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// updateUtilisateur permet de modifier un utilisateur
const updateUtilisateur = async (req, res) => {
  try {
    const { id } = req.params;
    const utilisateur = await Utilisateur.findByIdAndUpdate(id, req.body);
    if (!utilisateur) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }
    const updatedUtilisateur = await Utilisateur.findById(id);
    res.status(200).json(updatedUtilisateur);
  } catch (error) {
    res.status(500).json((message = error.message));
  }
};

// deleteUtilisateur permet de supprimer un utilisateur
const deleteUtilisateur = async (req, res) => {
  try {
    const { id } = req.params;
    const utilisateur = await Utilisateur.findByIdAndDelete(id);
    if (!utilisateur) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }
    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    res.status(500).json((message = error.message));
  }
};

module.exports = {
  getUtilisateurs,
  getUtilisateur,
  createUtilisateur,
  updateUtilisateur,
  deleteUtilisateur,
  logUser,
};
