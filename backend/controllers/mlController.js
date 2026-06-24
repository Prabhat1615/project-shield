const {
  predictThreat,
  getModelMetrics,
} = require("../services/mlService");

const testPrediction = async (req, res, next) => {
  try {
    const duration = Number(req.query.duration ?? 35);
    const srcBytes = Number(req.query.srcBytes ?? 9000);
    const dstBytes = Number(req.query.dstBytes ?? 8500);
    const result = await predictThreat(duration, srcBytes, dstBytes);

    res.json({
      success: true,
      prediction: result.prediction,
      anomalyScore: result.anomalyScore,
      input: { duration, srcBytes, dstBytes },
    });
  } catch (error) {
    next(error);
  }
};

const modelMetrics = async (req, res, next) => {
  try {
    const metrics = await getModelMetrics();
    if (!metrics) {
      return res.status(503).json({
        success: false,
        message: "Model metrics are not available. Ensure the ML service is running.",
      });
    }

    res.json({ success: true, metrics });
  } catch (error) {
    next(error);
  }
};

module.exports = { testPrediction, modelMetrics };
