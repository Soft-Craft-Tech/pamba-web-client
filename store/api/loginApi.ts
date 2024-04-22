import { apiCall } from "@/utils/apiRequest";
import endpoints from "@/utils/endpoints";
import { useMutation } from "react-query";

export const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  return apiCall("POST", endpoints.login, {}, { username, password });
};

export const useLoginMutation = () => {
  return useMutation(login);
};
