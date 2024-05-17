import { useMutation, useQuery } from "react-query";
import { apiCall } from "@/utils/apiRequest";
import endpoints from "@/utils/endpoints";
import { useAppDispatch } from "@/hooks";
import { setMessage, setShowToast } from "@/store/toastSlice";
import { DynamicObject } from "@/components/types";

export const useGetAllStaff = (slug: string) => {
  return useQuery("", async () => {
    try {
      const response = await apiCall(
        "GET",
        `${endpoints.getStaff}${slug}`,
        {},
        {}
      );
      return response || {};
    } catch (error) {
      throw new Error("Unable to fetch Staff");
    }
  });
};

export const useCreateStaff = () => {
  const dispatch = useAppDispatch();
  return useMutation<void, Error, any>(async ({ f_name, phone, role }) => {
    const response = await apiCall(
      "POST",
      `${endpoints.createStaff}`,
      { f_name, phone, role },
      {}
    );
    dispatch(setMessage(response.message));
    return response;
  });
};

export const useDeleteStaff = () => {
  const dispatch = useAppDispatch();
  return useMutation<void, Error, any>(async (staff_id: number) => {
    const response = await apiCall(
      "DELETE",
      `${endpoints.deleteStaff}${staff_id}`,
      {},
      {}
    );
    dispatch(setMessage(response.message));
    dispatch(setShowToast(true));
    return response;
  });
};

export const useEditStaff = () => {
  const dispatch = useAppDispatch();
  return useMutation<void, Error, DynamicObject>(
    async ({ f_name, phone, role, staff_id }) => {
      const response = await apiCall(
        "PUT",
        `${endpoints.editStaff}${staff_id}`,
        { f_name, phone, role },
        {}
      );
      dispatch(setMessage(response.message));
      dispatch(setShowToast(true));
      setTimeout(() => {
        dispatch(setMessage(""));
      }, 3000);
      return response;
    }
  );
};
