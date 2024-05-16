import { useAppDispatch } from "@/hooks";
import { setMessage } from "@/store/toastSlice";
import { apiCall } from "@/utils/apiRequest";
import endpoints from "@/utils/endpoints";
import { useMutation, useQuery } from "react-query";

// Create Expense Accounts
export const useCreateExpenseAccounts = () => {
  const dispatch = useAppDispatch();
  return useMutation<void, Error, any>(async (accounts) => {
    try {
      const response = await apiCall(
        "POST",
        endpoints.createAccount,
        accounts,
        {}
      );
      dispatch(setMessage(response.message));
      return response;
    } catch (error) {
      throw new Error("Error");
    }
  });
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