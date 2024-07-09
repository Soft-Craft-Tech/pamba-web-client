import { DeleteFormData, DynamicObject } from "@/components/types";
import { useAppDispatch } from "@/hooks";
import { setStep } from "@/store/completeProfileSlice";
import { publicApiCall } from "@/utils/apiRequest";
import { setUser, updateClientInLocalStorage } from "@/utils/auth";
import endpoints from "@/utils/endpoints";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export const useSignUpMutation = () => {
  return useMutation({
    mutationFn: async (formData: DynamicObject) => {
      const response = await publicApiCall(
        "POST",
        endpoints.signup,
        formData,
        {}
      );
      return response;
    },
    onSuccess: () => {
      toast.success("Sign Up successful!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useRequestPasswordReset = () => {
  return useMutation({
    mutationFn: async (email: string | undefined) => {
      const response = await publicApiCall(
        "POST",
        `${endpoints.requestPasswordReset}`,
        { email }
      );
      return response;
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: DynamicObject) => {
      const response = await publicApiCall(
        "PUT",
        endpoints.updateProfile,
        formData
      );
      return response;
    },
    onSuccess: (data) => {
      toast.success("Profile updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["singleBusiness"] });
      queryClient.setQueryData(["singleBusiness"], data);
      updateClientInLocalStorage(data.business, data.authToken);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: async (formData: DynamicObject) => {
      const response = await publicApiCall(
        "PUT",
        endpoints.changePassword,
        formData
      );
      return response;
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteAccountMutation = () => {
  return useMutation({
    mutationFn: async (formData: DeleteFormData) => {
      const response = await publicApiCall(
        "POST",
        endpoints.deleteAccount,
        formData
      );
      return response;
    },
    onSuccess: () => {
      toast.success("Account Deleted successfully!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useResetPasswordMutation = (token: string) => {
  return useMutation({
    mutationFn: async (password: string | undefined) => {
      const response = await publicApiCall(
        "PUT",
        `${endpoints.resetPassword}${token}`,
        { password }
      );
      return response;
    },
    onSuccess: () => {
      toast.success("Password Reset successful!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useVerifyAccountMutation = (token: string) => {
  return useMutation({
    mutationFn: async () => {
      const response = await publicApiCall(
        "POST",
        `${endpoints.verifyAccount}${token}`
      );
      return response.data;
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdateDescription = (step: number) => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: async (description: string) => {
      const response = await publicApiCall(
        "PUT",
        endpoints.updateDescription,
        { description },
        {}
      );
      dispatch(setStep(step + 1));
      return response.data;
    },
    onSuccess: () => {
      toast.success("Description updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
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
