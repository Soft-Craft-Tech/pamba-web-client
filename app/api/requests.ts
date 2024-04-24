import { CloudinaryData } from "@/components/types";
import { apiCall } from "@/utils/apiRequest";
import { useMutation } from "react-query";

export const useChangeImageMutation = () => {
  return useMutation<void, Error, CloudinaryData>(
    async (imageURL: CloudinaryData) => {
      const response = await apiCall(
        "PUT",
        `${process.env.NEXT_PUBLIC_BASE_URL}/API/businesses/upload-profile-img`,
        imageURL,
        {}
      );
      return response;
    }
  );
};
