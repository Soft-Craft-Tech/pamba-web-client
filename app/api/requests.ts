import { CloudinaryData, DynamicObject } from "@/components/types";
import { useAppDispatch } from "@/hooks";
import { setMessage, setShowToast } from "@/store/toastSlice";
import { apiCall } from "@/utils/apiRequest";
import endpoints from "@/utils/endpoints";
import { useMutation, useQuery } from "react-query";

export const useChangeImageMutation = () => {
  return useMutation<void, Error, CloudinaryData>(
    async (imageURL: CloudinaryData) => {
      const response = await apiCall(
        "PUT",
        endpoints.uploadImage,
        { imageURL },
        {}
      );
      return response;
    }
  );
};

export const useAssignService = () => {
  const dispatch = useAppDispatch();
  return useMutation<void, Error, any>(async (services: any) => {
    const response = await apiCall(
      "POST",
      endpoints.assignServices,
      { services },
      {}
    );
    dispatch(setMessage(response.message));
    return response;
  });
};

export const useGetServices = () => {
  return useQuery("categories", async () => {
    try {
      const response = await apiCall("GET", endpoints.fetchAllServices, {}, {});
      return response;
    } catch (error) {
      throw new Error("Error fetching all services");
    }
  });
};

export const useGetEvents = () => {
  return useQuery("appointments", async () => {
    try {
      const response = await apiCall("GET", endpoints.fetchEvents, {}, {});
      return response;
    } catch (error) {
      throw new Error("Error fetching all services");
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

export const useGetAllStaff = (slug: string) => {
  return useQuery("", async () => {
    try {
      const response = await apiCall(
        "GET",
        `${endpoints.getStaff}${slug}`,
        {},
        {}
      );
      return response;
    } catch (error) {
      throw new Error("Unable to fetch Staff");
    }
  });
};

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
  return useMutation<void, Error, any>(
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

export const useGetProfileCompletionStatus = () => {
  return useQuery("", async () => {
    try {
      const response = await apiCall(
        "GET",
        endpoints.profileCompletion,
        {},
        {}
      );
      return response || {};
    } catch (error) {
      throw new Error("Error fetching Statuses");
    }
  });
};

export const useGetAllServices = () => {
  return useQuery("", async () => {
    try {
      const response = await apiCall("GET", endpoints.fetchServices, {}, {});
      return response || {};
    } catch (error) {
      throw new Error("Error fetching Statuses");
    }
  });
};

export const useGetCategories = () => {
  return useQuery("categories", async () => {
    try {
      const response = await apiCall("GET", endpoints.fetchCategories, {}, {});
      return response;
    } catch (error) {
      throw new Error("Error fetching all services");
    }
  });
};
