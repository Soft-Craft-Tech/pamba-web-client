import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY,
  },
  responseType: "json",
});

export default axiosInstance;
