import { DynamicObject } from "@/components/types";
import { privateApiCall } from "@/utils/apiRequest";
import endpoints from "@/utils/endpoints";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useGetAllClients = () => {
  return useQuery({
    queryKey: ["getAllClients"],
    queryFn: async () => {
      const response = await privateApiCall("GET", endpoints.getAllClients);
      return response;
    },
  });
};

export const useCreateClients = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, DynamicObject>({
    mutationFn: async ({ status, clientsId }) => {
      const response = await privateApiCall(
        "POST",
        `${endpoints.editClients}${clientsId}`,
        { status }
      );
      return response;
    },
    onSuccess: () => {
      toast.success("Client created successfully!");
      queryClient.invalidateQueries({ queryKey: ["getAllClients"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteClients = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (clientsId: number) => {
      const response = await privateApiCall(
        "DELETE",
        `${endpoints.deleteClients}${clientsId}`
      );
      return response;
    },
    onSuccess: () => {
      toast.success("Client info deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["getAllClients"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useEditClients = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, DynamicObject>({
    mutationFn: async ({ status, clientsId }) => {
      const response = await privateApiCall(
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
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
