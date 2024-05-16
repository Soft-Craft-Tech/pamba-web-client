import { apiCall } from "@/utils/apiRequest";
import endpoints from "@/utils/endpoints";
import { useQuery } from "react-query";

export const useGetServices = () => {
  return useQuery("categories", async () => {
    try {
      const response = await apiCall("GET", endpoints.fetchAllServices, {}, {});
      return response;
    } catch (error) {
      throw new Error("Error fetching all services");
    }
  });
};
