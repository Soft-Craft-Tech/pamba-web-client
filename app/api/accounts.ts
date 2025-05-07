import { CustomError, Expense } from "@/components/types";
import { useAppDispatch } from "@/hooks/redux";
import { setStep } from "@/store/completeProfileSlice";
import { privateApiCall } from "@/utils/apiRequest";
import endpoints from "@/utils/endpoints";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

// Fetch Expense Accounts
export const useGetExpenseAccounts = () => {
  return useQuery({
    queryKey: ["expenseAccounts"],
    queryFn: async () => {
      const response = await privateApiCall(
        "GET",
        endpoints.fetchExpenseAccounts
      );
      return response;
    },
  });
};

// Create Expense Accounts
export const useCreateExpenseAccounts = (step: number) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (accounts: { accounts: Expense[] }) => {
      if (accounts === undefined) {
        throw new Error("Accounts data is undefined");
      }

      const response = await privateApiCall(
        "POST",
        endpoints.createAccount,
        accounts
      );
      dispatch(setStep(step + 1));
      return response;
    },
    onSuccess: () => {
      toast.success("Expense Account created successfully!");
      queryClient.invalidateQueries({ queryKey: ["expenseAccounts"] });
    },
    onError: (error) => {
      const customError = error as CustomError;
      customError.response?.data.message
        ? toast.error(customError.response?.data.message)
        : toast.error(error.message);
    },
  });
};
