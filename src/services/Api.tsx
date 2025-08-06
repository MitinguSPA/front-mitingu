import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 20000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("Mitangu-token");
  if (config.headers) {
    config.headers["Accept"] = "application/json";

    // ✅ NO agregar Authorization si es /auth/local o /auth/local/register
    if (!config.url?.includes("/auth/local")) {
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
  }

  return config;
});
