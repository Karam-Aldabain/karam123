// src/api/apiClient.ts
import axios from "axios";

const BASE_URL = import.meta.env.REACT_APP_API_BASE_URL || "https://praktix.hopn.eu/back/api";
// const BASE_URL = "http://127.0.0.1:8000/api";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Token helpers
export const setAuthToken = (token: string) => {
  if (token) {
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common["Authorization"];
  }
};

export const clearAuthToken = () => {
  delete apiClient.defaults.headers.common["Authorization"];
};

apiClient.interceptors.response.use(
  (response) => {
    // Check if response is HTML instead of JSON
    if (
      typeof response.data === "string" &&
      (response.data.includes("<!DOCTYPE html>") ||
        response.data.includes("<!doctype html>"))
    ) {
      throw new Error("HTML_ERROR_RESPONSE");
    }

    // Check if content-type is HTML but we expect JSON
    const contentType = response.headers["content-type"];
    if (
      contentType &&
      contentType.includes("text/html") &&
      response.config.responseType !== "text"
    ) {
      throw new Error("HTML_ERROR_RESPONSE");
    }

    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptors
apiClient.interceptors.request.use((config) => {
  const authData = localStorage.getItem("app_auth");
  if (authData) {
    try {
      const parsed = JSON.parse(authData);
      if (parsed?.token) {
        config.headers.Authorization = `Bearer ${parsed.token}`;
      }
    } catch {
      // ignore invalid JSON
    }
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshResponse = await axios.post(
          `${BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );
        const newToken = refreshResponse.data.token;
        setAuthToken(newToken);
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (err) {
        clearAuthToken();
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
