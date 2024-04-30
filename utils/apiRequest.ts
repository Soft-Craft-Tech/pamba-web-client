import { Method } from "axios";
import axiosInstance from "./axios";
import { getUser, logoutUser } from "./auth";

export const apiCall = (
  method: Method,
  url: string,
  body: any,
  headers: {}
) => {
  const { authToken } = getUser();
  return axiosInstance({
    url,
    data: body,
    method,
    headers: { ...headers, Authorization: `${authToken}` },
  })
    .then(({ data }) => data)
    .catch((error) => {
      throw error;
    });
};
