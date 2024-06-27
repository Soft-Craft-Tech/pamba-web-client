import { DynamicObject } from "@/components/types";
import { useAppDispatch } from "@/hooks";
import { setMessage } from "@/store/toastSlice";
import { apiCall } from "@/utils/apiRequest";
import endpoints from "@/utils/endpoints";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useAllAppointments = () => {
  return useQuery({
    queryKey: ["allAppointments"],
    queryFn: async () => {
      const response = await apiCall("GET", endpoints.fetchAllAppointments);
      return response;
    },
  });
};

export const useBookAppointments = () => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: async (formData: DynamicObject) => {
      const response = await apiCall(
        "POST",
        endpoints.bookAppointments,
        formData
      );
      dispatch(setMessage(response.message));
      return response;
    },
  });
};
