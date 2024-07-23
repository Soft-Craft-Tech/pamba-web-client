import { CustomError } from "@/components/types";
import { privateApiCall, publicApiCall } from "@/utils/apiRequest";
import endpoints from "@/utils/endpoints";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useGetServices = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await publicApiCall("GET", endpoints.fetchAllServices);
      return response;
    },
  });
};

export const useGetClientServices = () => {
  return useQuery({
    queryKey: ["clientServices"],
    queryFn: async () => {
      const response = await publicApiCall("GET", endpoints.getClientServices);
      return response;
    },
  });
};

export const useGetServiceCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await publicApiCall(
        "GET",
        endpoints.getServiceCategories
      );
      return response;
    },
  });
};

export const useGetSingleService = (slug: string) => {
  return useQuery({
    queryKey: ["singleService"],
    queryFn: async () => {
      const response = await publicApiCall(
        "GET",
        `${endpoints.getSingleServiceDetails}${slug}`
      );
      return response;
    },
  });
};

export const useUpdateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      serviceId,
      name,
      description,
      category,
      price,
      imageURL,
      estimatedTime,
    }: {
      serviceId: number;
      name: string;
      description: string;
      category: number;
      price: number;
      imageURL: string;
      estimatedTime: string;
    }) => {
      const response = await privateApiCall(
        "PUT",
        `${endpoints.updateService}${serviceId}`,
        {
          name,
          price,
          description,
          estimatedTime,
          category,
          imageURL,
        }
      );
      return response;
    },
    onSuccess: () => {
      toast.success("Service updated successfully!");
      queryClient.invalidateQueries({
        queryKey: ["categories", "clientServices"],
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

export const useDeleteService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (serviceId: number) => {
      const response = await privateApiCall(
        "DELETE",
        `${endpoints.deleteService}${serviceId}`
      );
      return response;
    },
    onSuccess: () => {
      toast.success("Service deleted successfully!");
      queryClient.invalidateQueries({
        queryKey: ["categories", "clientServices"],
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
