import { Method } from "axios";
import axiosInstance from "./axios";
import { getUser } from "./auth";
import privateAxios from "./privateAxios";

export const publicApiCall = (
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

// Used for requests that require authentication
export const privateApiCall = (
  method: Method,
  url: string,
  body?: unknown,
  headers?: {}
) => {
  const { authToken } = getUser();
  return privateAxios({
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
