"use client";
import { Key, useMemo, useState } from "react";
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_ColumnFiltersState,
  type MRT_PaginationState,
  type MRT_SortingState,
} from "material-react-table";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Button from "@/ui/button";
import { useMutation, useQueryClient } from "react-query";
import { useGetExpenseAccounts, useGetExpenses } from "@/app/api/requests";
import moment from "moment";
import { Controller, useForm } from "react-hook-form";
import { DynamicObject } from "../types";

type Expense = {
  created_at: Date;
  category: string;
  expense: string;
  amount: string;
};

const Table = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DynamicObject>();
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data, isLoading, isError, isRefetching } = useGetExpenses();
  const {data: expenseAccountsData, isLoading: isLoadingAccounts} = useGetExpenseAccounts();
  // const { mutateAsync } = useCreateAccount();

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
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: isLoading ? [] : data.expenses,
    initialState: { showColumnFilters: false, showGlobalFilter: true },
    manualFiltering: true,
    manualPagination: true,
    manualSorting: true,
    enableHiding: false,
    // enableGlobalFilter: false,
    enableFullScreenToggle: false,
    enableDensityToggle: false,
    enableFilters: false,
    positionGlobalFilter: "left",
    positionActionsColumn: "last",
    onColumnFiltersChange: setColumnFilters,
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
            data.expenses.splice(row.index, 1);
          }}
          className="cursor-pointer text-[#007B99] font-bold"
        >
          Delete
        </p>
      </div>
    ),
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <div className="p-10 flex flex-col gap-2">
        <p className="mb-2">Create New Expense</p>
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
            defaultValue=""
            render={({ field }) => (
              <select
                {...field}
                className="text-gray-400 border w-full h-14 py-1 px-2  lg:h-12"
                name=""
              >
                <option value="">--Add Expense Account--</option>
                {!isLoadingAccounts && expenseAccountsData?.account?.map(
                  (account: { id: string, account_name: string}) => (
                  <option key={account?.id} value={account?.id}>
                    {account?.account_name}
                  </option>
                ))}
              </select>
            )}
            rules={{ required: true }}
          />
        <div className="flex h-auto w-full gap-5 justify-end mt-4">
          <button className="px-12 py-2 border border-gray-400 rounded-md" type="button">Cancel</button>
          <Button label="Save Expense" variant="primary" />
        </div>
      </div>
    ),
    renderToolbarInternalActions: ({ table }) => (
      <Button
        variant="primary"
        onClick={() => {
          table.setCreatingRow(true);
        }}
      >
        Create Expense
      </Button>
    ),
    state: {
      columnFilters,
      globalFilter,
      isLoading,
      pagination,
      showAlertBanner: isError,
      showProgressBars: isRefetching,
      sorting,
    },
  });

  return <MaterialReactTable table={table} />;
};

const queryClient = new QueryClient();

const ExpensesTable = () => (
  <QueryClientProvider client={queryClient}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Table />
    </LocalizationProvider>
  </QueryClientProvider>
);

export default ExpensesTable;

function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user: Expense) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return Promise.resolve();
    },
    onMutate: (newUserInfo: Expense) => {
      queryClient.setQueryData(
        ["users"],
        (prevUsers: any) =>
          [
            ...prevUsers,
            {
              ...newUserInfo,
              id: (Math.random() + 1).toString(36).substring(7),
            },
          ] as Expense[]
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}
