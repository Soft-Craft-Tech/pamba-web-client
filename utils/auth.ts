import dayjs from "dayjs";

export const getUser = () => {
  const authUser = localStorage.getItem("authToken") || null;
  return JSON.parse(String(authUser)) || {};
};

export const setUser = (value: any) => {
  localStorage.setItem(
    "authToken",
    JSON.stringify({ ...value, expires: dayjs().add(1, "d") })
  );
};

export const authUser = () => {
  const authUser = window.localStorage.getItem("authToken") || null;
  return authUser;
};

export const logoutUser = () => localStorage.removeItem("authToken");

export const isAuthenticated = () => {
  const authToken = localStorage.getItem("authToken") || null;
  return authToken ? true : false;
};
