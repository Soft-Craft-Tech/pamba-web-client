import { apiCall } from "@/utils/apiRequest";
import endpoints from "@/utils/endpoints";
import { useMutation } from "react-query";

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return apiCall("POST", endpoints.login, { email, password });
};

export const useLoginMutation = () => {
  return useMutation(login);
};
