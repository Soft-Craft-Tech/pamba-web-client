"use client";

import { IUser } from "@/components/types";
import dayjs from "dayjs";

export const getUser = () => {
  const authUser =
    (typeof window !== "undefined" &&
      window.localStorage.getItem("authToken")) ||
    null;

  return JSON.parse(String(authUser)) || {};
};

export const setUser = (value: any) => {
  typeof window !== "undefined" &&
    window.localStorage.setItem(
      "authToken",
      JSON.stringify({ ...value, expires: dayjs().add(1, "d") })
    );
};

export const updateClientInLocalStorage = (newClient: IUser, authToken: string) => {
  const user = getUser();

  if (user) {
    user.client = newClient;
    user.authToken = authToken;
    const updatedAuthData = JSON.stringify(user);
    window.localStorage.setItem("authToken", updatedAuthData);
  }
};

export const authUser = () => {
  const authUser =
    (typeof window !== "undefined" &&
      window.localStorage.getItem("authToken")) ||
    null;
  return authUser;
};

export const logoutUser = () =>
  typeof window !== "undefined" && window.localStorage.removeItem("authToken");

export const isAuthenticated = () => {
  let isAuthenticated = true;
  if (typeof window !== "undefined") {
    const authToken = window.localStorage.getItem("authToken");
    isAuthenticated = authToken ? true : false;
  }
  return isAuthenticated;
};
