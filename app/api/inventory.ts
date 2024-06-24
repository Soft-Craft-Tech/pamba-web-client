import { DynamicObject } from "@/components/types";
import { apiCall } from "@/utils/apiRequest";
import endpoints from "@/utils/endpoints";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

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

  return useMutation({
    mutationFn: async ({ product }: { product: string }) => {
      const response = await apiCall("POST", endpoints.recordInventory, {
        product,
      });
      return response;
    },
    onSuccess: () => {
      toast.success("Inventory status updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["getInventory"] });
    },
    onError: () => {
      toast.error("Could not create inventory! Please try again.");
    },
  });
};

export const useDeleteInventory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (inventoryId: number) => {
      const response = await apiCall(
        "DELETE",
        `${endpoints.deleteInventory}${inventoryId}`
      );
      return response;
    },
    onSuccess: () => {
      toast.success("Inventory status updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["getInventory"] });
    },
    onError: () => {
      toast.error("Could not delete! Please try again.");
    },
  });
};

export const useEditInventory = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, DynamicObject>({
    mutationFn: async ({ status, inventoryId }) => {
      const response = await apiCall(
        "PUT",
        `${endpoints.updateInventoryStatus}${inventoryId}`,
        { status }
      );
      return response;
    },
    onSuccess: () => {
      toast.success("Inventory status updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["getInventory"] });
    },
    onError: () => {
      toast.error("Update failed! Please try again.");
    },
  });
};
