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

module.exports = {
  getUtilisateurs,
  getUtilisateur,
  createUtilisateur,
  updateUtilisateur,
  deleteUtilisateur,
};
