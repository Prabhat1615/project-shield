
const express = require("express");

const router = express.Router();

const {
  generateReport,
} = require("../controllers/reportController");

router.get("/pdf", generateReport);

module.exports = router;

