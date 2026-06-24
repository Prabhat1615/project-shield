const fs = require("fs");
const csv = require("csv-parser");
const Log = require("../models/Log");
const { predictBatch } = require("../services/mlService");

const MAX_ROWS = 5000;
const requiredColumns = ["timestamp", "sourceIP", "destinationIP", "protocol"];
const allowedProtocols = new Set(["TCP", "UDP", "ICMP"]);

const parseCsv = (filePath) => new Promise((resolve, reject) => {
  const rows = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (row) => {
      if (rows.length < MAX_ROWS + 1) rows.push(row);
    })
    .on("end", () => resolve(rows))
    .on("error", reject);
});

const toFiniteNumber = (value, fallback) => {
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : fallback;
};

const deriveFeatures = (row) => {
  const protocol = String(row.protocol || "").trim().toUpperCase();
  const defaults = {
    TCP: { duration: 12, srcBytes: 1200, dstBytes: 900 },
    UDP: { duration: 5, srcBytes: 4200, dstBytes: 300 },
    ICMP: { duration: 45, srcBytes: 8500, dstBytes: 7200 },
  }[protocol] || { duration: 10, srcBytes: 1000, dstBytes: 1000 };

  return {
    duration: toFiniteNumber(row.duration, defaults.duration),
    srcBytes: toFiniteNumber(row.src_bytes ?? row.srcBytes, defaults.srcBytes),
    dstBytes: toFiniteNumber(row.dst_bytes ?? row.dstBytes, defaults.dstBytes),
  };
};

const uploadLogs = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "A CSV log file is required",
    });
  }

  try {
    const rows = await parseCsv(req.file.path);

    if (!rows.length) {
      return res.status(400).json({
        success: false,
        message: "The CSV file is empty",
      });
    }

    if (rows.length > MAX_ROWS) {
      return res.status(400).json({
        success: false,
        message: `A maximum of ${MAX_ROWS} rows is allowed per upload`,
      });
    }

    const firstRow = rows[0];

    const hasSourceColumn =
      "sourceIP" in firstRow ||
      "source_ip" in firstRow;

    const hasDestinationColumn =
      "destinationIP" in firstRow ||
      "destination_ip" in firstRow;

    const missingColumns = [];

    if (!("timestamp" in firstRow))
      missingColumns.push("timestamp");

    if (!hasSourceColumn)
      missingColumns.push("sourceIP/source_ip");

    if (!hasDestinationColumn)
      missingColumns.push(
        "destinationIP/destination_ip"
      );

    if (!("protocol" in firstRow))
      missingColumns.push("protocol");

    if (missingColumns.length) {
      return res.status(400).json({
        success: false,
        message: `Missing required CSV columns: ${missingColumns.join(", ")}`,
      });
    }

    const normalizedRows = rows.map((row, index) => {
      const protocol = String(row.protocol || "")
        .trim()
        .toUpperCase();

      const sourceIP =
        row.sourceIP || row.source_ip;

      const destinationIP =
        row.destinationIP ||
        row.destination_ip;

      if (
        !row.timestamp ||
        !sourceIP ||
        !destinationIP ||
        !allowedProtocols.has(protocol)
      ) {
        const error = new Error(
          `Invalid data in CSV row ${index + 2}`
        );

        error.status = 400;
        throw error;
      }

      return {
        row,
        sourceIP,
        destinationIP,
        protocol,
        ...deriveFeatures(row),
      };
    });

    const predictions = await predictBatch(
      normalizedRows.map((item) => ({
        duration: item.duration,
        src_bytes: item.srcBytes,
        dst_bytes: item.dstBytes,
      }))
    );

    const logs = normalizedRows.map(
      (item, index) => {
        const mlResult = predictions[index];

        const protocolRisk = {
          TCP: 8,
          UDP: 18,
          ICMP: 28,
        }[item.protocol];

        const anomalyRisk =
          mlResult.prediction === "threat"
            ? Math.min(
                65,
                45 +
                  Math.round(
                    Math.abs(
                      mlResult.anomalyScore
                    ) * 100
                  )
              )
            : Math.max(
                5,
                Math.round(
                  (1 -
                    Math.min(
                      1,
                      mlResult.anomalyScore
                    )) *
                    30
                )
              );

        const threatScore = Math.min(
          100,
          protocolRisk + anomalyRisk
        );

        return {
          timestamp: String(
            item.row.timestamp
          ).trim(),

          sourceIP: String(
            item.sourceIP
          ).trim(),

          destinationIP: String(
            item.destinationIP
          ).trim(),

          protocol: item.protocol,

          duration: item.duration,

          srcBytes: item.srcBytes,

          dstBytes: item.dstBytes,

          threatScore,

          prediction:
            threatScore >= 50
              ? "threat"
              : "safe",

          aiPrediction:
            mlResult.prediction,

          anomalyScore:
            mlResult.anomalyScore,

          uploadedBy: req.user._id,
        };
      }
    );

    await Log.insertMany(logs);

    return res.status(201).json({
      success: true,
      totalLogs: logs.length,
      threatsDetected: logs.filter(
        (log) =>
          log.prediction === "threat"
      ).length,
      message: `${logs.length} logs analyzed and stored successfully`,
    });
  } catch (error) {
    next(error);
  } finally {
    fs.promises
      .unlink(req.file.path)
      .catch(() => {});
  }
};

const getAllLogs = async (req, res, next) => {
  try {
    const logs = await Log.find()
      .sort({ createdAt: -1 })
      .limit(1000)
      .lean();

    res.json({
      success: true,
      count: logs.length,
      logs,
    });
  } catch (error) {
    next(error);
  }
};

const getStats = async (req, res, next) => {
  try {
    const [stats] = await Log.aggregate([
      {
        $group: {
          _id: null,
          totalLogs: { $sum: 1 },
          safeLogs: {
            $sum: {
              $cond: [{ $eq: ["$prediction", "safe"] }, 1, 0],
            },
          },
          threatLogs: {
            $sum: {
              $cond: [{ $eq: ["$prediction", "threat"] }, 1, 0],
            },
          },
          averageThreatScore: {
            $avg: "$threatScore",
          },
        },
      },
    ]);

    res.json({
      success: true,
      totalLogs: stats?.totalLogs || 0,
      safeLogs: stats?.safeLogs || 0,
      threatLogs: stats?.threatLogs || 0,
      averageThreatScore: Number(
        (stats?.averageThreatScore || 0).toFixed(2)
      ),
    });
  } catch (error) {
    next(error);
  }
};

const getProtocolStats = async (req, res, next) => {
  try {
    const results = await Log.aggregate([
      {
        $group: {
          _id: "$protocol",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    res.json(
      Object.fromEntries(
        results.map(({ _id, count }) => [
          _id || "UNKNOWN",
          count,
        ])
      )
    );
  } catch (error) {
    next(error);
  }
};
const getRecentThreats = async (req, res, next) => {
  try {
    const threats = await Log.find({
      prediction: "threat",
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .select(
        "sourceIP protocol threatScore timestamp"
      );

    res.json({
      success: true,
      threats,
    });
  } catch (error) {
    next(error);
  }
};



module.exports = { uploadLogs, getAllLogs, getStats, getProtocolStats,getRecentThreats };
