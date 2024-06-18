import { useAppDispatch } from "@/hooks";
import { setStep } from "@/store/completeProfileSlice";
import { setMessage } from "@/store/toastSlice";
import { apiCall } from "@/utils/apiRequest";
import endpoints from "@/utils/endpoints";
import { useMutation, useQuery } from "@tanstack/react-query";

// Create Expense Accounts
export const useCreateExpenseAccounts = (step: number) => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: async (accounts) => {
      if (accounts === undefined) {
        throw new Error("Accounts data is undefined");
      }

      const response = await apiCall("POST", endpoints.createAccount, accounts);
      dispatch(setMessage(response.message));
      dispatch(setStep(step + 1));
      return response;
    },
  });
};

// Fetch Expense Accounts
export const useGetExpenseAccounts = () => {
  return useQuery({
    queryKey: ["expenseAccounts"],
    queryFn: async () => {
      const response = await apiCall("GET", endpoints.fetchExpenseAccounts);
      return response;
    },
  });
};
