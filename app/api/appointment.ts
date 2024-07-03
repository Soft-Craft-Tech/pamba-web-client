import { DynamicObject, WebApppointmentBookingType } from "@/components/types";
import { apiCall } from "@/utils/apiRequest";
import endpoints from "@/utils/endpoints";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: DynamicObject | WebApppointmentBookingType) => {
      const response = await apiCall(
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
      toast.error(error.message);
    },
  });
};
