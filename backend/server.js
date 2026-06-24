const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const logRoutes = require("./routes/logRoutes");
const mlRoutes = require("./routes/mlRoutes");
const reportRoutes = require("./routes/reportRoutes");
const {
  securityHeaders,
  requestLog,
  notFound,
  errorHandler,
} = require("./middleware/securityMiddleware");

const app = express();
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim());

app.disable("x-powered-by");
app.use(securityHeaders);
app.use(requestLog);
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    const error = new Error("Origin is not allowed by CORS");
    error.status = 403;
    callback(error);
  },
}));
app.use(express.json({ limit: "100kb" }));

app.get("/", (req, res) => {
  res.json({
    success: true,
    service: "Project Shield API",
    status: "operational",
    version: "1.0.0",
  });
});
app.get("/api/health", (req, res) => {
  res.json({ success: true, status: "healthy", timestamp: new Date().toISOString() });
});

app.use("/api/auth", authRoutes);
app.use("/api/logs", logRoutes);
app.use("/api/ml", mlRoutes);
app.use("/api/report", reportRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  return app.listen(PORT, () => {
    console.log(`Project Shield API listening on port ${PORT}`);
  });
};

if (require.main === module) {
  startServer().catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
  });
}

module.exports = { app, startServer };
