import axios from "axios";
import Router from "next/router";
import { logoutUser } from "./auth";

const privateAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

privateAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      logoutUser()
      Router.push("/login");
    }
    return Promise.reject(error);
  }
);

export default privateAxios;
