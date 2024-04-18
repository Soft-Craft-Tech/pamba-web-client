import { Method } from "axios";
import axiosInstance from "./axios";
import { getUser, logoutUser } from "./auth";

export const apiCall = (
  method: Method,
  url: string,
  body: any,
  headers: {}
) => {
  const accessToken = getUser()?.accessToken || "";
  return axiosInstance({
    url,
    data: body,
    method,
    headers: { ...headers, Authorization: `Bearer ${accessToken}` },
  })
    .then(({ data }) => data)
    .catch((error) => {
      if (error.response?.status === 401) {
        window.location.href = "/login";
        logoutUser();
      }
      throw error;
    });
};
