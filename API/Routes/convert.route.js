const express = require("express");
const router = express.Router();
const { convertSvgToPdf } = require("../Controllers/convert.controller");

// middleware express.text() APPLIQUÉ À LA ROUTE SPÉCIFIQUE
router.post("/convert-svg", express.text({ type: "*/*" }), convertSvgToPdf);

module.exports = router;
