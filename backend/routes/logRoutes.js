const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const { protect } = require("../middleware/authMiddleware");
const {
  uploadLogs,
  getAllLogs,
  getStats,
  getProtocolStats,
  getRecentThreats,
} = require("../controllers/logController");

const router = express.Router();

router.use(protect);
router.post("/upload", upload.single("logfile"), uploadLogs);
router.get("/all", getAllLogs);
router.get("/stats", getStats);
router.get("/protocols", getProtocolStats);
router.get("/recent-threats",protect,getRecentThreats);

module.exports = router;
