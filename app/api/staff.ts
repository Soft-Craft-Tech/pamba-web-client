import { useAppDispatch } from "@/hooks";
import { setMessage, setShowToast } from "@/store/toastSlice";
import { apiCall } from "@/utils/apiRequest";
import endpoints from "@/utils/endpoints";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
  const dispatch = useAppDispatch();

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
      dispatch(setMessage(response.message));
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllStaff"] });
    },
  });
};

export const useDeleteStaff = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: async (staff_id: number) => {
      const response = await apiCall(
        "DELETE",
        `${endpoints.deleteStaff}${staff_id}`
      );
      dispatch(setMessage(response.message));
      dispatch(setShowToast(true));
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllStaff"] });
    },
  });
};

export const useEditStaff = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

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
      dispatch(setMessage(response.message));
      dispatch(setShowToast(true));
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllStaff"] });
    },
  });
};
