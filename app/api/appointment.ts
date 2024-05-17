import { apiCall } from "@/utils/apiRequest";
import endpoints from "@/utils/endpoints";
import { useQuery } from "react-query";

export const useGetEvents = () => {
  return useQuery("appointments", async () => {
    try {
      const response = await apiCall("GET", endpoints.fetchEvents, {}, {});
      return response;
    } catch (error) {
      throw new Error("Error fetching all services");
    }
  });
};
