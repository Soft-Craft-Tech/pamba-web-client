import {
  CloudinaryData,
  CustomError,
  ServiceInfoType,
} from "@/components/types";
import { useAppDispatch } from "@/hooks/redux";
import { setQueuedServices, setStep } from "@/store/completeProfileSlice";
import { privateApiCall, publicApiCall } from "@/utils/apiRequest";
import endpoints from "@/utils/endpoints";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useAssignService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      services: {
        name: string;
        price: number;
        category: string;
        description: string;
        estimatedTime: string;
        imageURL: string;
      }[]
    ) => {
      const response = await publicApiCall("POST", endpoints.assignServices, {
        services,
      });
      return response;
    },
    onSuccess: () => {
      toast.success("Services added successfully!");
      queryClient.invalidateQueries({ queryKey: ["allServices"] });
    },
    onError: (error) => {
      const customError = error as CustomError;
      customError.response?.data.message
        ? toast.error(customError.response?.data.message)
        : toast.error(error.message);
    },
  });
};

export const useAddOpeningClosingHours = (step: number) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      const response = await publicApiCall(
        "PUT",
        endpoints.businessOpeningClosing,
        { ...data }
      );
      dispatch(setStep(step + 1));
      return response;
    },
    onSuccess: () => {
      dispatch(setQueuedServices([]));
      queryClient.invalidateQueries({
        queryKey: ["allServices", "profileCompletionStatus"],
      });
    },
    onError: (error) => {
      const customError = error as CustomError;
      customError.response?.data.message
        ? toast.error(customError.response?.data.message)
        : toast.error(error.message);
    },
  });
};

export const useGetAllBusinesses = () => {
  return useQuery({
    queryKey: ["businesses"],
    queryFn: async () => {
      const response = await publicApiCall("GET", endpoints.getAllBusinesses);
      return response;
    },
  });
};

export const useGetBusinessesAnalysis = () => {
  return useQuery({
    queryKey: ["analysis"],
    queryFn: async () => {
      const response = await publicApiCall(
        "GET",
        endpoints.getBusinessesAnalysis
      );
      return response;
    },
  });
};

export const useChangeImageMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (imageURL: CloudinaryData) => {
      const response = await privateApiCall("PUT", endpoints.uploadImage, {
        imageURL,
      });
      return response;
    },
    onSuccess: () => {
      toast.success("Image updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["allServices"] });
    },
    onError: (error) => {
      const customError = error as CustomError;
      customError.response?.data.message
        ? toast.error(customError.response?.data.message)
        : toast.error(error.message);
    },
  });
};

export const useGetProfileCompletionStatus = () => {
  return useQuery({
    queryKey: ["profileCompletionStatus"],
    queryFn: async () => {
      const response = await privateApiCall("GET", endpoints.profileCompletion);
      return response;
    },
  });
};

export const useGetAllServices = (business_id: string) => {
  return useQuery({
    queryKey: ["allServices"],
    queryFn: async () => {
      const response: { message: string; services: ServiceInfoType[] } =
        await publicApiCall("GET", `${endpoints.fetchServices}/${business_id}`);
      return response;
    },
  });
};

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await publicApiCall("GET", endpoints.fetchCategories);
      return response;
    },
  });
};

export const useGetSingleBusiness = (business_id: string) => {
  return useQuery({
    queryKey: ["singleBusiness"],
    queryFn: async () => {
      const response = await publicApiCall(
        "GET",
        `${endpoints.getSingleBusiness}${business_id}`
      );
      return response;
    },
  });
};

export const useGetBusinessService = (business_id: string) => {
  return useQuery({
    queryKey: ["businessService"],
    queryFn: async () => {
      const response = await publicApiCall(
        "GET",
        `${endpoints.fetchServices}/${business_id}`
      );
      return response;
    },
  });
};
