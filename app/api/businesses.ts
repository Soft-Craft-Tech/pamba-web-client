import { CloudinaryData, DynamicObject } from "@/components/types";
import { useAppDispatch } from "@/hooks";
import { setMessage } from "@/store/toastSlice";
import { apiCall } from "@/utils/apiRequest";
import endpoints from "@/utils/endpoints";
import { useMutation, useQuery } from "react-query";

export const useAssignService = () => {
  const dispatch = useAppDispatch();
  return useMutation<void, Error, DynamicObject>(async (services: any) => {
    const response = await apiCall(
      "POST",
      endpoints.assignServices,
      { services },
      {}
    );
    dispatch(setMessage(response.message));
    return response;
  });
};

export const useGetAllBusinesses = () => {
  return useQuery("businesses", async () => {
    try {
      const response = await apiCall("GET", endpoints.getAllBusinesses, {}, {});
      return response;
    } catch (error) {
      throw new Error("Error fetching all services");
    }
  });
};

export const useGetBusinessesAnalysis = () => {
  return useQuery("analysis", async () => {
    try {
      const response = await apiCall(
        "GET",
        endpoints.getBusinessesAnalysis,
        {},
        {}
      );
      return response;
    } catch (error) {
      throw new Error("Error fetching all analysis");
    }
  });
};

export const useChangeImageMutation = () => {
  return useMutation<void, Error, CloudinaryData>(
    async (imageURL: CloudinaryData) => {
      const response = await apiCall(
        "PUT",
        endpoints.uploadImage,
        { imageURL },
        {}
      );
      return response;
    }
  );
};

export const useGetProfileCompletionStatus = () => {
  return useQuery("", async () => {
    try {
      const response = await apiCall(
        "GET",
        endpoints.profileCompletion,
        {},
        {}
      );
      return response || {};
    } catch (error) {
      throw new Error("Error fetching Statuses");
    }
  });
};

export const useGetAllServices = (business_id: string) => {
  return useQuery("all-services", async () => {
    try {
      const response = await apiCall(
        "GET",
        `${endpoints.fetchServices}/${business_id}`,
        {},
        {}
      );
      return response;
    } catch (error) {
      throw new Error("Error fetching Statuses");
    }
  });
};

export const useGetCategories = () => {
  return useQuery("categories", async () => {
    try {
      const response = await apiCall("GET", endpoints.fetchCategories, {}, {});
      return response;
    } catch (error) {
      throw new Error("Error fetching all services");
    }
  });
};

export const useGetSingleBusiness = (business_id: string) => {
  return useQuery("", async () => {
    try {
      const response = await apiCall(
        "GET",
        `${endpoints.getSingleBusiness}${business_id}`,
        {},
        {}
      );
      return response;
    } catch (error) {
      throw new Error("Error fetching all services");
    }
  });
};

export const useGetBusinessService = (business_id: string) => {
  return useQuery("", async () => {
    try {
      const response = await apiCall(
        "GET",
        `${endpoints.fetchServices}/${business_id}`,
        {},
        {}
      );
      return response;
    } catch (error) {
      throw new Error("Error fetching Statuses");
    }
  });
};
