import { privateApiCall } from "@/utils/apiRequest";
import endpoints from "@/utils/endpoints";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useGetAllSales = () => {
  return useQuery({
    queryKey: ["getAllSales"],
    queryFn: async () => {
      const response = await privateApiCall("GET", endpoints.getAllSales);
      return response;
    },
  });
};

export const useGetSingleSale = () => {
  return useQuery({
    queryKey: ["getSingleSale"],
    queryFn: async () => {
      const response = await privateApiCall("GET", endpoints.getSingleSale);
      return response;
    },
  });
};

export const useGetSalesAnalysis = () => {
  return useQuery({
    queryKey: ["getSalesAnalysis"],
    queryFn: async () => {
      const response = await privateApiCall("GET", endpoints.getSalesAnalysis);
      return response;
    },
  });
};

export const useRecordSale = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      paymentMethod,
      description,
      serviceId,
    }: {
      paymentMethod: string;
      description: string;
      serviceId: number;
    }) => {
      const response = await privateApiCall("POST", endpoints.recordSale, {
        paymentMethod,
        description,
        serviceId,
      });
      return response;
    },
    onSuccess: () => {
      toast.success("Sale recorded successfully!");
      queryClient.invalidateQueries({ queryKey: ["getAllSales"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useEditSale = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      paymentmethod,
      description,
      service_id,
      sale_id,
    }: {
      paymentmethod: string;
      description: string;
      service_id: number;
      sale_id: number;
    }) => {
      const response = await privateApiCall(
        "PUT",
        `${endpoints.editSales}${sale_id}`,
        {
          paymentmethod,
          description,
          service_id,
        }
      );
      return response;
    },
    onSuccess: () => {
      toast.success("Sale updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["getAllSales"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteSale = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (sale_id: number) => {
      const response = await privateApiCall(
        "DELETE",
        `${endpoints.deleteSale}${sale_id}`
      );
      return response;
    },
    onSuccess: () => {
      toast.success("Sale deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["getAllSales"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
