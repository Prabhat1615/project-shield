import api from "./api";

export const getAIPrediction = async () => {
  const response = await api.get("/ml/test");
  return response.data;
};

export const getModelMetrics = async () => {
  const response = await api.get("/ml/metrics");
  return response.data;
};
