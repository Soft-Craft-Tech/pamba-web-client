import { Method } from "axios";
import axiosInstance from "./axios";
import { getUser } from "./auth";

export const apiCall = (
  method: Method,
  url: string,
  body?: unknown,
  headers?: {}
) => {
  const { authToken } = getUser();
  return axiosInstance({
    url,
    data: body,
    method,
    headers: { ...headers, "x-access-token": `${authToken}` },
  })
    .then(({ data }) => data)
    .catch((error) => {
      throw error;
    });
};
