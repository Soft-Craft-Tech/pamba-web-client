"use client";
import { useMemo, useState } from "react";
import {
  MRT_Row,
  MRT_TableOptions,
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
import {
  useCreateStaff,
  useDeleteStaff,
  useEditExpense,
  useGetAllStaff,
  useGetExpenses,
} from "@/app/api/requests";
import { Controller, useForm } from "react-hook-form";
import { DynamicObject } from "../types";
import { useAppDispatch } from "@/hooks";
import { setMessage, setShowToast } from "@/store/toastSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Toast from "../shared/toasts/authToast";
import { getUser } from "@/utils/auth";

type Staff = {
  f_name: Date;
  l_name: string;
  phone: string;
  role: string;
  id?: number;
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
  const { control, handleSubmit, reset } = useForm<DynamicObject>();
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    []
  );

  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { client } = getUser();

  const {
    data: allStaffData,
    isLoading,
    isError,
    isRefetching,
  } = useGetAllStaff(client?.slug);
  const { mutateAsync, isSuccess, isError: addExpenseError } = useCreateStaff();

  const { mutateAsync: editExpense } = useEditExpense();

  const {
    mutateAsync: deleteUser,
    isSuccess: isDeleteSuccess,
    isError: isDeleteError,
  } = useDeleteStaff();

  const editExpenseRow = async (formData: any) => {
    try {
      await editExpense(formData?.id, formData);
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

  const columns = useMemo<MRT_ColumnDef<Staff>[]>(
    () => [
      {
        accessorKey: "f_name",
        header: "First Name",
      },
      {
        accessorKey: "phone",
        header: "Phone",
      },
      {
        accessorKey: "role",
        header: "Role",
      },
    ],
    []
  );

  const openDeleteConfirmModal = (row: MRT_Row<Staff>) => {
    deleteUser(row.original.id);
  };

  const table = useMaterialReactTable({
    columns,
    data: isLoading ? [] : allStaffData?.staff,
    initialState: { showColumnFilters: true, showGlobalFilter: true },
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
            openDeleteConfirmModal(row);
          }}
          className="cursor-pointer text-[#007B99] font-bold"
        >
          Delete
        </p>
      </div>
    ),
    renderEditRowDialogContent: () => (
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
          onSubmit={handleSubmit(editExpenseRow)}
        >
          <Controller
            name="expenseTitle"
            control={control}
            defaultValue=""
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
            defaultValue=""
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
            defaultValue=""
            render={({ field }) => (
              <input
                className="w-full h-14 rounded-md border border-gray-200 px-2 py-1 lg:h-12"
                defaultValue=""
                type="text"
                {...field}
                placeholder="Description"
              />
            )}
            rules={{ required: true }}
          />
          <div className="flex h-auto w-full gap-5 justify-end mt-4">
            <button
              className="px-12 py-2 border border-gray-400 rounded-md"
              onClick={() => table.setEditingRow(null)}
            >
              Cancel
            </button>
            <Button label="Save Expense" variant="primary" />
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
        <p className="mb-2">Create Staff Details</p>
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit(submitExpense)}
        >
          <Controller
            name="f_name"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                className="w-full h-14 rounded-md border border-gray-200 px-2 py-1 lg:h-12"
                type="text"
                {...field}
                placeholder="Staff Name"
              />
            )}
            rules={{ required: true }}
          />
          <Controller
            name="phone"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                className="w-full h-14 rounded-md border border-gray-200 px-2 py-1 lg:h-12"
                type="number"
                {...field}
                placeholder="Phone Number"
              />
            )}
            rules={{ required: true }}
          />
          <Controller
            name="role"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                className="w-full h-14 rounded-md border border-gray-200 px-2 py-1 lg:h-12"
                defaultValue=""
                type="text"
                {...field}
                placeholder="Role"
              />
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
            <Button label="Save Staff" variant="primary" />
          </div>
        </form>
      </div>
    ),
    renderToolbarInternalActions: ({ table }) => (
      <Button
        variant="primary"
        onClick={() => {
          table.setCreatingRow(true);
        }}
      >
        Create Staff
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

  return (
    <>
      {/* {isDeleteError && <Toast message={toastMessage} type="error" />}
      {isDeleteSuccess && <Toast message={toastMessage} type="success" />} */}
      <MaterialReactTable table={table} />
    </>
  );
};

const queryClient = new QueryClient();

const StaffManagementTable = () => (
  <QueryClientProvider client={queryClient}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Table />
    </LocalizationProvider>
  </QueryClientProvider>
);

export default StaffManagementTable;
