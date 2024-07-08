import { DeleteFormData, DynamicObject } from "@/components/types";
import { useAppDispatch } from "@/hooks";
import { setStep } from "@/store/completeProfileSlice";
import { setMessage, setShowToast } from "@/store/toastSlice";
import { apiCall } from "@/utils/apiRequest";
import { setUser } from "@/utils/auth";
import endpoints from "@/utils/endpoints";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useSignUpMutation = () => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: async (formData: DynamicObject) => {
      const response = await apiCall("POST", endpoints.signup, formData, {});
      dispatch(setMessage(response.message));
      return response;
    },
  });
};

export const useRequestPasswordReset = () => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: async (email: string | undefined) => {
      const response = await apiCall(
        "POST",
        `${endpoints.requestPasswordReset}`,
        { email }
      );
      dispatch(setShowToast(true));
      dispatch(setMessage(response.message));
      return response;
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: DynamicObject) => {
      const response = await apiCall("PUT", endpoints.updateProfile, formData);
      return response;
    },
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useChangePassword = () => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: async (formData: DynamicObject) => {
      const response = await apiCall("PUT", endpoints.changePassword, formData);
      dispatch(setMessage(response.message));
      return response;
    },
  });
};

export const useDeleteAccountMutation = () => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: async (formData: DeleteFormData) => {
      const response = await apiCall("POST", endpoints.deleteAccount, formData);
      dispatch(setShowToast(true));
      dispatch(setMessage(response.message));
      return response;
    },
  });
};

export const useResetPasswordMutation = (token: string) => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: async (password: string | undefined) => {
      const response = await apiCall(
        "PUT",
        `${endpoints.resetPassword}${token}`,
        { password }
      );
      dispatch(setShowToast(true));
      dispatch(setMessage(response.message));
      return response;
    },
  });
};

export const useVerifyAccountMutation = (token: string) => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: async () => {
      const response = await apiCall(
        "POST",
        `${endpoints.verifyAccount}${token}`
      );
      dispatch(setMessage(response.message));
      return response.data;
    },
  });
};

export const useUpdateDescription = (step: number) => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: async (description: string) => {
      const response = await apiCall(
        "PUT",
        endpoints.updateDescription,
        { description },
        {}
      );
      dispatch(setStep(step + 1));
      return response.data;
    },
  });
};

// TODO: use react-query
export const loginRequest = async (
  email: string,
  password: string,
  router: any
) => {
  try {
    const response = await axios.post(
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
    const data = response.data;
    setTimeout(() => router.push(`/user/dashboard`), 500);
    setUser(data);
    return { response, data };
  } catch (error) {
    return { error };
  }
};
