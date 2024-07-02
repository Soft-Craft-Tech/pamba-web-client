import { useAppDispatch } from "@/hooks";
import { setMessage, setShowToast } from "@/store/toastSlice";
import { apiCall } from "@/utils/apiRequest";
import endpoints from "@/utils/endpoints";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetExpenses = () => {
  return useQuery({
    queryKey: ["getAllExpenses"],
    queryFn: async () => {
      const response = await apiCall("GET", endpoints.fetchExpenses);
      return response;
    },
  });
};

export const useCreateExpense = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: async ({
      expenseTitle,
      expenseAmount,
      description,
      accountID,
    }: {
      expenseTitle: string;
      expenseAmount: number;
      description: string;
      accountID: number;
    }) => {
      const response = await apiCall("POST", endpoints.addExpense, {
        expenseTitle,
        expenseAmount,
        description,
        accountID,
      });
      dispatch(setMessage(response.message));
      return response;
    },
    onSuccess: (data) => {
      console.log(
        `This is the data from the get all expenses endpoint: ${data}`
      );
      queryClient.invalidateQueries({ queryKey: ["getAllExpenses"] });
    },
  });
};

export const useDeleteExpense = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: async (expense_id: number) => {
      const response = await apiCall(
        "DELETE",
        `${endpoints.deleteExpenses}${expense_id}`
      );
      dispatch(setMessage(response.message));
      dispatch(setShowToast(true));
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllExpenses"] });
    },
  });
};

export const useEditExpense = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: async ({
      expenseId,
      expenseAmount,
      expenseTitle,
      description,
      accountID,
    }: {
      expenseId: number;
      expenseAmount: string;
      expenseTitle: string;
      description: string;
      accountID: string;
    }) => {
      const response = await apiCall(
        "PUT",
        `${endpoints.editExpenses}${expenseId}`,
        { expenseAmount, expenseTitle, description, accountID }
      );
      dispatch(setMessage(response.message));
      dispatch(setShowToast(true));
      setTimeout(() => {
        dispatch(setMessage(""));
      }, 3000);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllExpenses"] });
    },
  });
};
