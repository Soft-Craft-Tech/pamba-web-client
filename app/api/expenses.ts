import { DynamicObject } from "@/components/types";
import { useAppDispatch } from "@/hooks";
import { setMessage, setShowToast } from "@/store/toastSlice";
import { apiCall } from "@/utils/apiRequest";
import endpoints from "@/utils/endpoints";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useGetExpenses = () => {
  return useQuery("getAllExpenses", async () => {
    try {
      const response = await apiCall("GET", endpoints.fetchExpenses, {}, {});
      return response;
    } catch (error) {
      throw new Error("Error fetching Expenses");
    }
  });
};

export const useCreateExpense = () => {
  const queryClient = useQueryClient();
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
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getAllExpenses");
      },
    }
  );
};

export const useDeleteExpense = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation<void, Error, any>(
    async (expense_id: number) => {
      const response = await apiCall(
        "DELETE",
        `${endpoints.deleteExpenses}${expense_id}`,
        {},
        {}
      );
      dispatch(setMessage(response.message));
      dispatch(setShowToast(true));
      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getAllExpenses");
      },
    }
  );
};

export const useEditExpense = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation<void, Error, any>(
    async ({
      expenseId,
      expenseAmount,
      expenseTitle,
      description,
      accountID,
    }) => {
      const response = await apiCall(
        "PUT",
        `${endpoints.editExpenses}${expenseId}`,
        { expenseAmount, expenseTitle, description, accountID },
        {}
      );
      dispatch(setMessage(response.message));
      dispatch(setShowToast(true));
      setTimeout(() => {
        dispatch(setMessage(""));
      }, 3000);
      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getAllExpenses");
      },
    }
  );
};
