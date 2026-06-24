import api from "./api";

export const getStats = async () => {
  const response = await api.get("/logs/stats");
  return response.data;
};

export const getLogs = async () => {
  const response = await api.get("/logs/all");
  return response.data;
};

export const getProtocolStats = async () => {
  const response = await api.get("/logs/protocols");
  return response.data;
};

export const uploadLogs = async (file, onUploadProgress) => {
  const formData = new FormData();
  formData.append("logfile", file);
  const response = await api.post("/logs/upload", formData, { onUploadProgress });
  return response.data;
};
export const getRecentThreats = async () => {
  const response = await api.get(
    "/logs/recent-threats"
  );

  return response.data;
};
