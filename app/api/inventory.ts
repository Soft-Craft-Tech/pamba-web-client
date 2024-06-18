import { DynamicObject } from "@/components/types";
import { useAppDispatch } from "@/hooks";
import { setMessage, setShowToast } from "@/store/toastSlice";
import { apiCall } from "@/utils/apiRequest";
import endpoints from "@/utils/endpoints";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetInventory = () => {
  return useQuery({
    queryKey: ["getInventory"],
    queryFn: async () => {
      const response = await apiCall("GET", endpoints.getInventory);
      return response;
    },
  });
};

export const useCreateInventory = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation<void, Error, DynamicObject>({
    mutationFn: async ({ product }) => {
      const response = await apiCall("POST", endpoints.recordInventory, {
        product,
      });
      dispatch(setMessage(response.message));
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getInventory"] });
    },
  });
};

export const useDeleteInventory = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: async (inventoryId: number) => {
      const response = await apiCall(
        "DELETE",
        `${endpoints.deleteInventory}${inventoryId}`
      );
      dispatch(setMessage(response.message));
      dispatch(setShowToast(true));
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getInventory"] });
    },
  });
};

export const useEditInventory = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation<void, Error, DynamicObject>({
    mutationFn: async ({ status, inventoryId }) => {
      const response = await apiCall(
        "PUT",
        `${endpoints.updateInventoryStatus}${inventoryId}`,
        { status }
      );
      dispatch(setMessage(response.message));
      dispatch(setShowToast(true));
      setTimeout(() => {
        dispatch(setMessage(""));
      }, 3000);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getInventory"] });
    },
  });
};
