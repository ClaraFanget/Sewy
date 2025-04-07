const express = require("express");
const Utilisateur = require("../Models/utilisateur.model.js");
const router = express.Router();
const {
  getUtilisateurs,
  getUtilisateur,
  createUtilisateur,
  updateUtilisateur,
  deleteUtilisateur,
  logUser,
  logout,
} = require("../Controllers/utilisateur.controller.js");

router.get("/", getUtilisateurs);
router.get("/:id", getUtilisateur);

router.post("/", createUtilisateur);
router.post("/login", logUser);
router.post("/logout", logout);

router.put("/:id", updateUtilisateur);

router.delete("/:id", deleteUtilisateur);

module.exports = router;
