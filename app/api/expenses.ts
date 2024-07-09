import { privateApiCall } from "@/utils/apiRequest";
import endpoints from "@/utils/endpoints";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useGetExpenses = () => {
  return useQuery({
    queryKey: ["getAllExpenses"],
    queryFn: async () => {
      const response = await privateApiCall("GET", endpoints.fetchExpenses);
      return response;
    },
  });
};

export const useCreateExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      expenseTitle,
      amount,
      description,
      accountID,
    }: {
      expenseTitle: string;
      amount: string;
      description: string;
      accountID: string;
    }) => {
      console.log(expenseTitle, amount, description, accountID);

      const response = await privateApiCall("POST", endpoints.addExpense, {
        expenseTitle,
        expenseAmount: Number(amount),
        description,
        accountID: Number(accountID),
      });

      return response;
    },
    onSuccess: () => {
      toast.success("Expense created successfully!");
      queryClient.invalidateQueries({ queryKey: ["getAllExpenses"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (expense_id: number) => {
      const response = await privateApiCall(
        "DELETE",
        `${endpoints.deleteExpenses}${expense_id}`
      );
      return response;
    },
    onSuccess: () => {
      toast.success("Expense deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["getAllExpenses"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useEditExpense = () => {
  const queryClient = useQueryClient();

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
      const response = await privateApiCall(
        "PUT",
        `${endpoints.editExpenses}${expenseId}`,
        { expenseAmount, expenseTitle, description, accountID }
      );
      return response;
    },
    onSuccess: () => {
      toast.success("Expense updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["getAllExpenses"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
