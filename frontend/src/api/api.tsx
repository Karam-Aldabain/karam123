// src/api/apiClient.ts
import axios from "axios";

const BASE_URL = import.meta.env.REACT_APP_API_BASE_URL || "https://praktix.hopn.eu/back/api";
// const BASE_URL = "http://localhost:8000/api";

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});

// Token helpers (no longer needed with cookies, but kept for interface compatibility if needed)
export const setAuthToken = (token: string) => {
    // No-op: Token is in HttpOnly cookie
};

export const clearAuthToken = () => {
    // No-op: Cookie is cleared by backend on logout
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
    // Skip auth if explicitly requested or for known public endpoints
    const publicEndpoints = ["/experts/approved", "/roles", "/partnerships/submit", "/login", "/register"];
    const isPublic = publicEndpoints.some(endpoint => config.url?.includes(endpoint));

    // @ts-ignore - custom property
    if (config.skipAuth || isPublic) {
        // Ensure no Authorization header is sent to public endpoints
        delete config.headers.Authorization;
        return config;
    }

    // With cookies, we don't need to manually add the Authorization header from localStorage.
    // The browser automatically sends the 'auth_token' cookie with withCredentials: true.
    // The legacy header is removed here to prevent using stale localStorage tokens.
    delete config.headers.Authorization;

    return config;
});

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            // If we get a 401, the cookie is likely invalid/expired.
            localStorage.removeItem("app_auth");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default apiClient;
