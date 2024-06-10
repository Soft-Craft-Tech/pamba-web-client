import { apiCall } from "@/utils/apiRequest";
import endpoints from "@/utils/endpoints";
import { useQuery } from "react-query";

export const useAllImages = (business_id: string) => {
  return useQuery("", async () => {
    try {
      const response = await apiCall(
        "GET",
        `${endpoints.getGalleryImages}/${business_id}`,
        {},
        {}
      );
      return response;
    } catch (error) {
      throw new Error("Error fetching Statuses");
    }
  });
};
