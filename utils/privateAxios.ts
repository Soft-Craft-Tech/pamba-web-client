import axios from "axios";
import { isTokenExpired, logoutUser } from "./auth";

const getCurrentUrl = () => typeof window !== 'undefined' ? window.location.origin : '';

const privateAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY,
  },
  responseType: "json",
});

privateAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401 && isTokenExpired()) {
      logoutUser();

      if (typeof window !== "undefined") {
        window.location.replace(`${getCurrentUrl()}/login`);
      }
    }
    return Promise.reject(error);
  }
);

export default privateAxios;
