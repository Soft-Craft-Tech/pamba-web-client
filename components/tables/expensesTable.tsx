"use client";
import { useMemo, useState } from "react";
import {
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
import { useGetExpenses } from "@/app/api/requests";

type Expense = {
  date: Date;
  category: string;
  expense: string;
  amount: string;
  status: string;
};

const Table = () => {
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

  // const { mutateAsync } = useCreateAccount();

  const columns = useMemo<MRT_ColumnDef<Expense>[]>(
    () => [
      {
        accessorFn: (row) => new Date(row.date),
        id: "date",
        header: "Date",
        Cell: ({ cell }) => new Date(cell.getValue<Date>()).toLocaleString(),
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
        accessorKey: "status",
        header: "Status",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: isLoading ? [] : data,
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
