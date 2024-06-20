"use client";
import { useMemo, useState } from "react";
import {
  MRT_Row,
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_ColumnFiltersState,
  type MRT_PaginationState,
  type MRT_SortingState,
} from "material-react-table";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Button from "@/ui/button";
import {
  useCreateExpense,
  useDeleteExpense,
  useEditExpense,
  useGetExpenses,
} from "@/app/api/expenses";
import { useGetExpenseAccounts } from "@/app/api/accounts";
import moment from "moment";
import { Controller, useForm } from "react-hook-form";
import { DynamicObject } from "../types";
import { useAppDispatch } from "@/hooks";
import { setMessage, setShowToast } from "@/store/toastSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Toast from "../shared/toasts/authToast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type Expense = {
  created_at: Date;
  category: string;
  expense: string;
  amount: string;
  description: string;
  account_id: number;
  id: number;
};

interface CustomError extends Error {
  response?: {
    data: {
      message: string;
    };
  };
}

const Table = () => {
  const dispatch = useAppDispatch();
  const { toastMessage } = useSelector((state: RootState) => ({
    toastMessage: state.toast.toastMessage,
  }));
  const { showToast } = useSelector((state: RootState) => ({
    showToast: state.toast.showToast,
  }));
  const { control, handleSubmit, reset } = useForm<DynamicObject>({
    defaultValues: {
      formData: {
        expenseTitle: "",
        expenseAmount: "",
        description: "",
        accountID: null, //"expense_account"
      },
    },
  });

  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const {
    data,
    isPending,
    isError,
    isRefetching,
    refetch: refetchExpenses,
  } = useGetExpenses();

  const { data: expenseAccountsData, isPending: isLoadingAccounts } =
    useGetExpenseAccounts();

  const {
    mutateAsync,
    isSuccess,
    isError: addExpenseError,
    status: createExpenseStatus,
  } = useCreateExpense();

  const {
    mutateAsync: deleteUser,
    isSuccess: isDeleteSuccess,
    isError: isDeleteError,
  } = useDeleteExpense();

  const { mutateAsync: editExpense, status: editExpenseStatus } =
    useEditExpense();

  const editExpenseRow = async (expenseId: number, formData: any) => {
    try {
      let data = {
        expenseId,
        expenseTitle: formData?.expenseTitle,
        expenseAmount: formData?.amount,
        description: formData?.description,
        accountID: formData?.accountID.toString(),
      };

      await editExpense(data);
      reset({
        formData: {},
      });
    } catch (error) {
      const customError = error as CustomError;
      dispatch(setMessage(customError?.response?.data?.message));
    }
  };

  const submitExpense = async (formData: any) => {
    try {
      await mutateAsync(formData);
      refetchExpenses();
      reset({
        formData: {},
      });
      table.setCreatingRow(null);
    } catch (error) {
      const customError = error as CustomError;
      dispatch(setMessage(customError?.response?.data?.message));
    }
  };

  if (isSuccess || addExpenseError) {
    dispatch(setShowToast(true));
    setTimeout(() => {
      dispatch(setShowToast(false));
      // table.setEditingRow(null);
    }, 3000);
  }

  const columns = useMemo<MRT_ColumnDef<Expense>[]>(
    () => [
      {
        accessorFn: (row) => new Date(row.created_at),
        id: "created_at",
        header: "Date",
        Cell: ({ cell }) => moment(cell.getValue<Date>()).format("YYYY-MM-DD"),
        filterFn: "greaterThan",
        filterVariant: "date",
        enableGlobalFilter: false,
      },
      {
        accessorKey: "category",
        header: "Category",
      },
      {
        accessorKey: "expense",
        header: "Expense",
      },
      {
        accessorKey: "amount",
        header: "Amount",
      },
      {
        accessorKey: "description",
        header: "Description",
        disableFilters: true,
        enableGlobalFilter: false,
      },
      {
        accessorKey: "id",
        header: "Expense ID",
        disableFilters: true,
        enableEditing: false,
        enableGlobalFilter: false,
      },
      {
        accessorKey: "account_id",
        header: "Expense Account",
        disableFilters: true,
        enableGlobalFilter: false,
      },
    ],
    []
  );

  const openDeleteConfirmModal = (row: MRT_Row<Expense>) => {
    deleteUser(row.original.id);
    refetchExpenses();
  };

  const table = useMaterialReactTable({
    columns,
    data: isPending ? [] : data?.expenses ?? [],
    initialState: {
      showGlobalFilter: true,
      columnVisibility: { description: false, account_id: false, id: false },
    },
    positionGlobalFilter: "left",
    positionActionsColumn: "last",
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    enableRowActions: true,
    renderRowActions: ({ table, row }) => (
      <div className="flex flex-row gap-x-3 items-center">
        <p
          onClick={() => {
            table.setEditingRow(row);
          }}
          className="cursor-pointer font-bold"
        >
          Edit
        </p>

        <p
          onClick={() => {
            openDeleteConfirmModal(row);
          }}
          className="cursor-pointer text-[#007B99] font-bold"
        >
          Delete
        </p>
      </div>
    ),
    renderEditRowDialogContent: ({ table, row }) => (
      <div className="p-10">
        {showToast && (
          <p
            className={`w-full  p-2 text-center rounded-md mb-3 font-medium ${
              addExpenseError
                ? "bg-red-100 text-red-700"
                : isSuccess
                ? "bg-green-100 text-green-700"
                : ""
            }`}
          >
            {toastMessage}
          </p>
        )}
        <p className="mb-2">Update Expense</p>
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit((data) =>
            editExpenseRow(row.original.id ?? 0, data)
          )}
        >
          <Controller
            name="expenseTitle"
            control={control}
            defaultValue={row.original.expense}
            render={({ field }) => (
              <input
                className="w-full h-14 rounded-md border border-gray-200 px-2 py-1 lg:h-12"
                type="text"
                {...field}
                placeholder="Expense"
              />
            )}
            rules={{ required: true }}
          />
          <Controller
            name="amount"
            control={control}
            defaultValue={row.original.amount}
            render={({ field }) => (
              <input
                className="w-full h-14 rounded-md border border-gray-200 px-2 py-1 lg:h-12"
                type="number"
                {...field}
                placeholder="Amount"
              />
            )}
            rules={{ required: true }}
          />
          <Controller
            name="description"
            control={control}
            defaultValue={row.original.description}
            render={({ field }) => (
              <input
                className="w-full h-14 rounded-md border border-gray-200 px-2 py-1 lg:h-12"
                type="text"
                {...field}
                placeholder="Description"
              />
            )}
            rules={{ required: true }}
          />
          <Controller
            name="accountID"
            control={control}
            defaultValue={row.original.account_id}
            render={({ field }) => (
              <select
                {...field}
                className="text-gray-400 border w-full h-14 py-1 px-2 lg:h-12"
              >
                {!isLoadingAccounts &&
                  expenseAccountsData?.account?.map(
                    (account: { id: number; account_name: string }) => (
                      <option key={account.id} value={account.id}>
                        {account.account_name}
                      </option>
                    )
                  )}
              </select>
            )}
            rules={{ required: true }}
          />
          <div className="flex h-auto w-full gap-5 justify-end mt-4">
            <button
              type="button"
              className="px-12 py-2 border border-gray-400 rounded-md"
              onClick={() => table.setEditingRow(null)}
            >
              Cancel
            </button>
            <Button
              label="Save Expense"
              variant="primary"
              disabled={editExpenseStatus === "pending"}
            />
          </div>
        </form>
      </div>
    ),
    renderCreateRowDialogContent: () => (
      <div className="p-10">
        {showToast && (
          <p
            className={`w-full  p-2 text-center rounded-md mb-3 font-medium ${
              addExpenseError
                ? "bg-red-100 text-red-700"
                : isSuccess
                ? "bg-green-100 text-green-700"
                : ""
            }`}
          >
            {toastMessage}
          </p>
        )}
        <p className="mb-2">Create New Expense</p>
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit(submitExpense)}
        >
          <Controller
            name="expenseTitle"
            control={control}
            render={({ field }) => (
              <input
                className="w-full h-14 rounded-md border border-gray-200 px-2 py-1 lg:h-12"
                type="text"
                {...field}
                placeholder="Expense"
              />
            )}
            rules={{ required: true }}
          />
          <Controller
            name="expenseAmount"
            control={control}
            render={({ field }) => (
              <input
                className="w-full h-14 rounded-md border border-gray-200 px-2 py-1 lg:h-12"
                type="number"
                {...field}
                placeholder="Amount"
              />
            )}
            rules={{ required: true }}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <input
                className="w-full h-14 rounded-md border border-gray-200 px-2 py-1 lg:h-12"
                type="text"
                {...field}
                placeholder="Description"
              />
            )}
            rules={{ required: true }}
          />
          <Controller
            name="accountID"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className="text-gray-400 border w-full h-14 py-1 px-2  lg:h-12"
                name=""
              >
                <option value="">--Add Expense Account--</option>
                {!isLoadingAccounts &&
                  expenseAccountsData?.account?.map(
                    (account: { id: string; account_name: string }) => (
                      <option key={account?.id} value={account?.id}>
                        {account?.account_name}
                      </option>
                    )
                  )}
              </select>
            )}
            rules={{ required: true }}
          />
          <div className="flex h-auto w-full gap-5 justify-end mt-4">
            <button
              className="px-12 py-2 border border-gray-400 rounded-md"
              onClick={() => {
                table.setCreatingRow(null);
              }}
            >
              Cancel
            </button>
            <Button
              label="Save Expense"
              variant="primary"
              disabled={createExpenseStatus === "pending"}
            />
          </div>
        </form>
      </div>
    ),
    renderToolbarInternalActions: ({ table }) => (
      <Button
        variant="primary"
        onClick={() => {
          expenseAccountsData.account.length > 1 ? (
            table.setCreatingRow(true)
          ) : (
            <Toast
              message={
                "Complete your profile setup first before creating expense"
              }
              type="error"
            />
          );
        }}
      >
        Create Expense
      </Button>
    ),
    state: {
      globalFilter,
      isLoading:isPending,
      pagination,
      showAlertBanner: isError,
      showProgressBars: isRefetching,
      sorting,
    },
  });

  return (
    <>
      {isDeleteError && <Toast message={toastMessage} type="error" />}
      {isDeleteSuccess && <Toast message={toastMessage} type="success" />}
      <MaterialReactTable table={table} />
    </>
  );
};

const ExpensesTable = () => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Table />
  </LocalizationProvider>
);

export default ExpensesTable;
