import { CloudinaryData } from "@/components/types";
import { useAppDispatch } from "@/hooks";
import { setStep } from "@/store/completeProfileSlice";
import { apiCall } from "@/utils/apiRequest";
import { useMutation } from "react-query";

export const useChangeImageMutation = () => {
  return useMutation<void, Error, CloudinaryData>(
    async (imageURL: CloudinaryData) => {
      const response = await apiCall(
        "PUT",
        `${process.env.NEXT_PUBLIC_API_URL}/businesses/upload-profile-img`,
        { imageURL },
        {}
      );
      return response;
    }
  );
};
