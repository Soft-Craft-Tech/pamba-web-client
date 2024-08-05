import { publicApiCall } from "@/utils/apiRequest";
import endpoints from "@/utils/endpoints";
import { useQuery } from "@tanstack/react-query";

export const useAllImages = (business_id: string) => {
  return useQuery({
    queryKey: ["allImages"],
    queryFn: async () => {
      const response = await publicApiCall(
        "GET",
        `${endpoints.getGalleryImages}/${business_id}`
      );
      return response;
    },
  });
};
