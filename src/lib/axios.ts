/* eslint-disable @typescript-eslint/no-explicit-any */
// src/lib/axios-instance.ts
import axios, { AxiosHeaders, type InternalAxiosRequestConfig } from "axios";
import { config } from "../config";

export const axiosInstance = axios.create({
  baseURL: config.baseUrl, // e.g. https://api.fcpearn.com/api/v1
  withCredentials: true,
  headers: new AxiosHeaders({ "Content-Type": "application/json" }),
  timeout: 20000,
});

// SSR-safe helper
function getTelegramInitData(): string | undefined {
  if (typeof window === "undefined") return undefined;

  return window?.Telegram?.WebApp?.initData as string | undefined;
}

// REQUEST interceptor — set header via AxiosHeaders
axiosInstance.interceptors.request.use(
  (cfg: InternalAxiosRequestConfig) => {
    const initData = getTelegramInitData();
    if (initData) {
      // ensure headers is AxiosHeaders
      if (
        !cfg.headers ||
        typeof (cfg.headers as AxiosHeaders).set !== "function"
      ) {
        cfg.headers = new AxiosHeaders(cfg.headers as any);
      }
      (cfg.headers as AxiosHeaders).set("X-Telegram-Init-Data", initData);
    }
    return cfg;
  },
  (error) => Promise.reject(error)
);

// RESPONSE interceptor (optional)
axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err)
);

export default axiosInstance;
