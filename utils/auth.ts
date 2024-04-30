"use client";

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
  const authToken =
    (typeof window !== "undefined" &&
      window.localStorage.getItem("authToken")) ||
    null;
  return authToken ? true : false;
};
