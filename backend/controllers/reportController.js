const PDFDocument = require("pdfkit");
const Log = require("../models/Log");

const generateReport = async (req, res) => {
  try {
    const [stats] = await Log.aggregate([
      {
        $group: {
          _id: null,
          totalLogs: { $sum: 1 },
          safeLogs: {
            $sum: {
              $cond: [
                { $eq: ["$prediction", "safe"] },
                1,
                0,
              ],
            },
          },
          threatLogs: {
            $sum: {
              $cond: [
                { $eq: ["$prediction", "threat"] },
                1,
                0,
              ],
            },
          },
          averageThreatScore: {
            $avg: "$threatScore",
          },
        },
      },
    ]);

    const doc = new PDFDocument();

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=shield-report.pdf"
    );

    doc.pipe(res);

    doc.fontSize(24).text(
      "SHIELD Security Report"
    );

    doc.moveDown();

    doc.fontSize(12).text(
      `Generated: ${new Date().toLocaleString()}`
    );

    doc.moveDown();

    doc.text(
      `Total Events: ${stats?.totalLogs || 0}`
    );

    doc.text(
      `Safe Events: ${stats?.safeLogs || 0}`
    );

    doc.text(
      `Threat Events: ${stats?.threatLogs || 0}`
    );

    doc.text(
      `Average Risk Score: ${
        stats?.averageThreatScore?.toFixed(2) || 0
      }`
    );

    doc.moveDown();

    doc.text("AI Model: Isolation Forest");

    doc.text("System Status: Operational");

    doc.end();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { generateReport };

