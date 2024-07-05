import { apiCall } from "@/utils/apiRequest";
import endpoints from "@/utils/endpoints";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useGetAllStaff = (slug: string) => {
  return useQuery({
    queryKey: ["getAllStaff"],
    queryFn: async () => {
      const response = await apiCall("GET", `${endpoints.getStaff}${slug}`);
      return response || {};
    },
  });
};

export const useCreateStaff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      f_name,
      phone,
      role,
    }: {
      f_name: string;
      phone: string;
      role: string;
    }) => {
      const response = await apiCall("POST", `${endpoints.createStaff}`, {
        f_name,
        phone,
        role,
      });
      return response;
    },
    onSuccess: () => {
      toast.success("Staff created successfully!");
      queryClient.invalidateQueries({ queryKey: ["getAllStaff"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteStaff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (staff_id: number) => {
      const response = await apiCall(
        "DELETE",
        `${endpoints.deleteStaff}${staff_id}`
      );
      return response;
    },
    onSuccess: () => {
      toast.success("Staff deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["getAllStaff"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useEditStaff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      phone,
      role,
    }: {
      id: number;
      phone: string;
      role: string;
    }) => {
      const response = await apiCall("PUT", `${endpoints.editStaff}${id}`, {
        phone,
        role,
      });
      return response;
    },
    onSuccess: () => {
      toast.success("Staff edited successfully!");
      queryClient.invalidateQueries({ queryKey: ["getAllStaff"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
