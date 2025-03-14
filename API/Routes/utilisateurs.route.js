const express = require("express");
const Utilisateur = require("../Models/utilisateur.model.js");
const router = express.Router();
const {
  getUtilisateurs,
  getUtilisateur,
  createUtilisateur,
  updateUtilisateur,
  deleteUtilisateur

} = require("../Controllers/utilisateur.controller.js");

router.get("/", getUtilisateurs);
router.get("/:id", getUtilisateur);

router.post("/", createUtilisateur);

router.put("/:id",updateUtilisateur);

router.delete("/:id", deleteUtilisateur);

module.exports = router;
