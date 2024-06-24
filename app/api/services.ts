import { apiCall } from "@/utils/apiRequest";
import endpoints from "@/utils/endpoints";
import { useQuery } from "@tanstack/react-query";

export const useGetServices = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await apiCall("GET", endpoints.fetchAllServices);
      return response;
    },
  });
};

export const useGetClientServices = () => {
  return useQuery({
    queryKey: ["clientServices"],
    queryFn: async () => {
      const response = await apiCall("GET", endpoints.getClientServices);
      return response;
    },
  });
};

export const useGetServiceCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await apiCall("GET", endpoints.getServiceCategories);
      return response;
    },
  });
};

export const useGetSingleService = (slug: string) => {
  return useQuery({
    queryKey: ["singleService"],
    queryFn: async () => {
      const response = await apiCall(
        "GET",
        `${endpoints.getSingleServiceDetails}${slug}`
      );
      return response;
    },
  });
};
