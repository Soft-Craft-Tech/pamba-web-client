import { SignUpFormData } from "@/components/types";
import { apiCall } from "@/utils/apiRequest";
import endpoints from "@/utils/endpoints";
import axios from "axios";
import { useMutation } from "react-query";

export const useSignUpMutation = () => {
  return useMutation<void, Error, SignUpFormData>(
    async (formData: SignUpFormData) => {
      const response = await apiCall("POST", endpoints.signup, formData, {});
      return response.data;
    }
  );
};

export const loginRequest = async (email: string, password: string) => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/businesses/login`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY,
        },
        auth: {
          username: email,
          password: password,
        },
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
};