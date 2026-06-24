const axios = require("axios");

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || "http://localhost:8000";

const predictThreat = async (duration, srcBytes, dstBytes) => {
  try {
    const response = await axios.post(`${ML_SERVICE_URL}/predict`, {
      logs: [{
        duration: Number(duration) || 0,
        src_bytes: Number(srcBytes) || 0,
        dst_bytes: Number(dstBytes) || 0,
      }]
    });
    const [prediction] = response.data.predictions;
    return {
      prediction: prediction.prediction,
      anomalyScore: prediction.anomalyScore || 0,
    };
  } catch (error) {
    console.error("ML Service Error:", error.message);
    throw new Error("Failed to get prediction from ML service");
  }
};

const predictBatch = async (rows) => {
  try {
    const response = await axios.post(`${ML_SERVICE_URL}/predict`, {
      logs: rows
    });
    return response.data.predictions.map((p) => ({
      prediction: p.prediction,
      anomalyScore: p.anomalyScore || 0,
    }));
  } catch (error) {
    console.error("ML Batch Prediction Error:", error.message);
    throw new Error("Failed to get batch predictions from ML service");
  }
};

const getModelMetrics = async () => {
  try {
    const response = await axios.get(`${ML_SERVICE_URL}/metrics`);
    return response.data;
  } catch (error) {
    console.error("ML Metrics Error:", error.message);
    return null;
  }
};

module.exports = { predictThreat, predictBatch, getModelMetrics };
