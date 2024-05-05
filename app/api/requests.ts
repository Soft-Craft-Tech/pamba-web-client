import { CloudinaryData } from "@/components/types";
import { useAppDispatch } from "@/hooks";
import { setMessage } from "@/store/toastSlice";
import { apiCall } from "@/utils/apiRequest";
import endpoints from "@/utils/endpoints";
import { useMutation, useQuery } from "react-query";

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

export const useAssignService = () => {
  const dispatch = useAppDispatch();
  return useMutation<void, Error, any>(async (services: any) => {
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

export const useGetExpenses = () => {
  return useQuery("categories", async () => {
    try {
      const response = await apiCall("GET", endpoints.fetchExpenses, {}, {});
      return response;
    } catch (error) {
      throw new Error("Error fetching all services");
    }
  });
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

export const useGetAllServices = () => {
  return useQuery("", async () => {
    try {
      const response = await apiCall("GET", endpoints.fetchServices, {}, {});
      return response || {};
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
