import { DynamicObject } from "@/components/types";
import { useAppDispatch } from "@/hooks";
import { setMessage, setShowToast } from "@/store/toastSlice";
import { apiCall } from "@/utils/apiRequest";
import endpoints from "@/utils/endpoints";
import { useMutation, useQuery } from "react-query";

export const useGetExpenses = () => {
  return useQuery("expenses", async () => {
    try {
      const response = await apiCall("GET", endpoints.fetchExpenses, {}, {});
      return response;
    } catch (error) {
      throw new Error("Error fetching Expenses");
    }
  });
};

export const useCreateExpense = () => {
  const dispatch = useAppDispatch();
  return useMutation<void, Error, DynamicObject>(
    async ({ expenseTitle, expenseAmount, description, accountID }) => {
      const response = await apiCall(
        "POST",
        `${endpoints.addExpense}`,
        { expenseTitle, expenseAmount, description, accountID },
        {}
      );
      dispatch(setMessage(response.message));
      return response;
    }
  );
};

export const useDeleteExpense = () => {
  const dispatch = useAppDispatch();
  return useMutation<void, Error, any>(async (expense_id: number) => {
    const response = await apiCall(
      "DELETE",
      `${endpoints.deleteExpenses}${expense_id}`,
      {},
      {}
    );
    dispatch(setMessage(response.message));
    dispatch(setShowToast(true));
    return response;
  });
};

export const useEditExpense = () => {
  const dispatch = useAppDispatch();
  return useMutation<void, Error, any>(async ([expenxeId, formData]) => {
    const response = await apiCall(
      "PUT",
      `${endpoints.editExpenses}${expenxeId}`,
      { formData },
      {}
    );
    dispatch(setMessage(response.message));
    dispatch(setShowToast(true));
    setTimeout(() => {
      dispatch(setMessage(""));
    }, 3000);
    return response;
  });
};
