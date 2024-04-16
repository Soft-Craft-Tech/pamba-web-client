"use client";
import dayjs from "dayjs";

export const getUser = () => {
  const authUser = localStorage.getItem("AuthToken") || null;
  return JSON.parse(String(authUser)) || {};
};

export const setUser = (value: any) => {
  localStorage.setItem(
    "AuthToken",
    JSON.stringify({ ...value, expires: dayjs().add(1, "d") })
  );
};

export const authUser = () => {
  const authUser = window.localStorage.getItem("AuthToken") || null;
  return authUser;
};

export const logoutUser = () => localStorage.removeItem("AuthToken");

export const isAuthenticated = () => {
  const authUser = localStorage.getItem("AuthToken") || null;
  return authUser ? true : false;
};
