import { DynamicObject } from "@/components/types";
import { apiCall } from "@/utils/apiRequest";
import endpoints from "@/utils/endpoints";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useGetAllClients = () => {
  return useQuery({
    queryKey: ["getAllClients"],
    queryFn: async () => {
      const response = await apiCall("GET", endpoints.getAllClients);
      return response;
    },
  });
};

export const useDeleteclients = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (clientsId: number) => {
      const response = await apiCall(
        "DELETE",
        `${endpoints.deleteClients}${clientsId}`
      );
      return response;
    },
    onSuccess: () => {
      toast.success("Client info deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["getAllClients"] });
    },
    onError: () => {
      toast.error("Could not delete! Please try again.");
    },
  });
};

export const useEditclients = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, DynamicObject>({
    mutationFn: async ({ status, clientsId }) => {
      const response = await apiCall(
        "PUT",
        `${endpoints.editClients}${clientsId}`,
        { status }
      );
      return response;
    },
    onSuccess: () => {
      toast.success("Clients info updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["getAllClients"] });
    },
    onError: () => {
      toast.error("Update failed! Please try again.");
    },
  });
};
