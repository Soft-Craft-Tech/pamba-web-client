import { apiCall } from "@/utils/apiRequest";
import endpoints from "@/utils/endpoints";
import { useQuery } from "@tanstack/react-query";

export const useAllReviews = (business_id: string) => {
  return useQuery({
    queryKey: ["allReviews"],
    queryFn: async () => {
      const response = await apiCall(
        "GET",
        `${endpoints.reviewsEndpoints}/${business_id}`
      );
      return response;
    },
  });
};
