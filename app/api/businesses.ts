import { CloudinaryData } from "@/components/types";
import { useAppDispatch } from "@/hooks";
import { setStep } from "@/store/completeProfileSlice";
import { setMessage } from "@/store/toastSlice";
import { apiCall } from "@/utils/apiRequest";
import endpoints from "@/utils/endpoints";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useAssignService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      services: {
        name: string;
        price: string;
        category: string;
        description: string;
        estimatedTime: string;
        imageURL: string;
      }[]
    ) => {
      const response = await apiCall("POST", endpoints.assignServices, {
        services,
      });
      return response;
    },
    onSuccess: () => {
      toast.success("Services added successfully!");
      queryClient.invalidateQueries({ queryKey: ["allServices"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useAddOpeningClosingHours = (step: number) => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await apiCall(
        "PUT",
        endpoints.businessOpeningClosing,
        { ...data },
        {}
      );
      dispatch(setMessage(response.message));
      dispatch(setStep(step + 1));
      return response;
    },
  });
};

export const useGetAllBusinesses = () => {
  return useQuery({
    queryKey: ["businesses"],
    queryFn: async () => {
      const response = await apiCall("GET", endpoints.getAllBusinesses);
      return response;
    },
  });
};

export const useGetBusinessesAnalysis = () => {
  return useQuery({
    queryKey: ["analysis"],
    queryFn: async () => {
      const response = await apiCall("GET", endpoints.getBusinessesAnalysis);
      return response;
    },
  });
};

export const useChangeImageMutation = () => {
  return useMutation({
    mutationFn: async (imageURL: CloudinaryData) => {
      const response = await apiCall("PUT", endpoints.uploadImage, {
        imageURL,
      });
      return response;
    },
  });
};

export const useGetProfileCompletionStatus = () => {
  return useQuery({
    queryKey: ["profileCompletionStatus"],
    queryFn: async () => {
      const response = await apiCall("GET", endpoints.profileCompletion);
      return response || {};
    },
  });
};

export const useGetAllServices = (business_id: string) => {
  return useQuery({
    queryKey: ["allServices"],
    queryFn: async () => {
      const response = await apiCall(
        "GET",
        `${endpoints.fetchServices}/${business_id}`
      );
      return response;
    },
  });
};

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await apiCall("GET", endpoints.fetchCategories, {}, {});
      return response;
    },
  });
};

export const useGetSingleBusiness = (business_id: string) => {
  return useQuery({
    queryKey: ["singleBusiness"],
    queryFn: async () => {
      const response = await apiCall(
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
      const response = await apiCall(
        "GET",
        `${endpoints.fetchServices}/${business_id}`
      );
      return response;
    },
  });
};
