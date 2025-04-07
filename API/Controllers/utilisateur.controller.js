const { get } = require("mongoose");
const Utilisateur = require("../Models/utilisateur.model.js");

const getUtilisateurs = async (req, res) => {
  try {
    const utilisateurs = await Utilisateur.find({});
    res.status(200).json(utilisateurs);
  } catch (error) {
    res.status(500).json((message = error.message));
  }
};

const getUtilisateur = async (req, res) => {
  try {
    const { id } = req.params;
    const utilisateur = await Utilisateur.findById(id);
    res.status(200).json(utilisateur);
  } catch (error) {
    res.status(500).json((message = error.message));
  }
};

const createUtilisateur = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.create(req.body);
    res.status(200).json(utilisateur);
  } catch (error) {
    res.status(500).json((message = error.message));
  }
};

const logUser = async (req, res) => {
  try {
    const { pseudo, mot_de_passe } = req.body;

    // Vérifier si les champs requis sont présents
    if (!pseudo || !mot_de_passe) {
      return res.status(400).json({
        success: false,
        message: "Pseudo et mot de passe requis",
      });
    }

    // Rechercher l'utilisateur par email
    const utilisateur = await Utilisateur.findOne({ pseudo });

    // Vérifier si l'utilisateur existe
    if (!utilisateur) {
      return res.status(401).json({
        success: false,
        message: "Pseudo ou mot de passe incorrect",
      });
    }

    // Vérifier si le mot de passe correspond
    // Note: Idéalement, les mots de passe devraient être hachés et
    // comparés avec une fonction comme bcrypt.compare()
    if (utilisateur.mot_de_passe !== mot_de_passe) {
      return res.status(401).json({
        success: false,
        message: "Mot de passe incorrect",
      });
    }

    // Si tout est valide, renvoyer les données de l'utilisateur sans le mot de passe
    const userWithoutPassword = {
      _id: utilisateur._id,
      pseudo: utilisateur.pseudo,
      // Ajoutez ici les autres champs que vous souhaitez renvoyer
      // firstName: utilisateur.firstName,
      // lastName: utilisateur.lastName,
    };

    res.status(200).json({
      success: true,
      message: "Connexion réussie",
      user: userWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
const logout = async (req, res) => {
  try {
    // Suppression du token côté client (si tu utilises des sessions, tu peux aussi les gérer ici)
    res.status(200).json({
      success: true,
      message: "Déconnexion réussie",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUtilisateurs,
  getUtilisateur,
  createUtilisateur,
  updateUtilisateur,
  deleteUtilisateur,
  logUser,
  logout,
};
