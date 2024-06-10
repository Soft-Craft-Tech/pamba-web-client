import { DynamicObject } from "@/components/types";
import { useAppDispatch } from "@/hooks";
import { setStep } from "@/store/completeProfileSlice";
import { setMessage } from "@/store/toastSlice";
import { apiCall } from "@/utils/apiRequest";
import endpoints from "@/utils/endpoints";
import { useMutation, useQuery } from "react-query";

// Create Expense Accounts
export const useCreateExpenseAccounts = (step: number) => {
  const dispatch = useAppDispatch();
  return useMutation<void, Error, DynamicObject | undefined>(
    async (accounts) => {
      if (accounts === undefined) {
        throw new Error("Accounts data is undefined");
      }
      try {
        const response = await apiCall(
          "POST",
          endpoints.createAccount,
          accounts,
          {}
        );
        dispatch(setMessage(response.message));
        dispatch(setStep(step + 1));
        return response;
      } catch (error) {
        throw new Error("Error");
      }
    }
  );
};

// Fetch Expense Accounts
export const useGetExpenseAccounts = () => {
  return useQuery("expenseaccounts", async () => {
    try {
      const response = await apiCall(
        "GET",
        endpoints.fetchExpenseAccounts,
        {},
        {}
      );
      return response;
    } catch (error) {
      throw new Error("Unable to fetch Accounts");
    }
  });
};
