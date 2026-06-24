const express = require("express");

const {
  testPrediction,
  modelMetrics,
} = require("../controllers/mlController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/test",
  protect,
  testPrediction
);
router.get("/metrics", protect, modelMetrics);

module.exports = router;
