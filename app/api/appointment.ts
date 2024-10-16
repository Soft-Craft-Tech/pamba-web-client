import { CustomError, DynamicObject, WebApppointmentBookingType } from "@/components/types";
import { publicApiCall } from "@/utils/apiRequest";
import endpoints from "@/utils/endpoints";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useAllAppointments = () => {
  return useQuery({
    queryKey: ["allAppointments"],
    queryFn: async () => {
      const response = await publicApiCall(
        "GET",
        endpoints.fetchAllAppointments
      );
      return response;
    },
  });
};

export const useBookAppointments = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      formData: DynamicObject | WebApppointmentBookingType
    ) => {
      const response = await publicApiCall(
        "POST",
        endpoints.bookAppointments,
        formData
      );
      return response;
    },
    onSuccess: () => {
      toast.success("Appointment booked successfully!");
      queryClient.invalidateQueries({
        queryKey: ["allAppointments", "getAllClients"],
      });
    },
    onError: (error) => {
      const customError = error as CustomError;
      customError.response?.data.message
        ? toast.error(customError.response?.data.message)
        : toast.error(error.message);
    },
  });
};
