"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { logoutUser } from "./auth";

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
    const router = useRouter();
    if (error.response.status === 401) {
      logoutUser();
      router.push("/login");
    }
    return Promise.reject(error);
  }
);

export default privateAxios;
