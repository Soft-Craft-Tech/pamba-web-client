"use client";
import {
  useCreateInventory,
  useDeleteInventory,
  useEditInventory,
  useGetInventory,
} from "@/app/api/inventory";
import { useAppDispatch } from "@/hooks";
import { RootState } from "@/store/store";
import { setMessage, setShowToast } from "@/store/toastSlice";
import Button from "@/ui/button";
import {
  MRT_Row,
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_PaginationState,
  type MRT_SortingState,
} from "material-react-table";
import moment from "moment";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import Toast from "../shared/toasts/authToast";
import { DynamicObject } from "../types";

// TODO: form validation and strict types

type InventoryType = {
  id: number;
  product: string;
  status: string;
  updated_at: Date;
};

interface CustomError extends Error {
  response?: {
    data: {
      message: string;
    };
  };
}

const InventoryTable = () => {
  const dispatch = useAppDispatch();
  const { toastMessage } = useSelector((state: RootState) => ({
    toastMessage: state.toast.toastMessage,
  }));
  const { showToast } = useSelector((state: RootState) => ({
    showToast: state.toast.showToast,
  }));
  const { control, handleSubmit, reset } = useForm<DynamicObject>();

  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const {
    data,
    isLoading,
    isError,
    isRefetching,
    refetch: refetchInventory,
  } = useGetInventory();

  const {
    mutateAsync,
    isSuccess,
    isError: addInventoryError,
    status: createInventoryStatus,
  } = useCreateInventory();

  const {
    mutateAsync: deleteInventory,
    isSuccess: isDeleteSuccess,
    isError: isDeleteError,
  } = useDeleteInventory();

  const { mutateAsync: editInventory, status: editInventoryStatus } =
    useEditInventory();

  const editInventoryRow = async (inventoryId: number, formData: any) => {
    try {
      const data = {
        inventoryId,
        status: formData.status,
      };

      await editInventory(data);
      reset({
        formData: {},
      });
    } catch (error) {
      const customError = error as CustomError;
      dispatch(setMessage(customError?.response?.data?.message));
    }
  };

  const submitInventory = async (formData: any) => {
    try {
      await mutateAsync(formData);
      refetchInventory();
      reset({
        formData: {},
      });
      table.setCreatingRow(null);
    } catch (error) {
      const customError = error as CustomError;
      dispatch(setMessage(customError?.response?.data?.message));
    }
  };

  if (isSuccess || addInventoryError) {
    dispatch(setShowToast(true));
    setTimeout(() => {
      dispatch(setShowToast(false));
    }, 3000);
  }

  const columns = useMemo<MRT_ColumnDef<InventoryType>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Inventory ID",
        disableFilters: true,
        enableEditing: false,
        enableGlobalFilter: false,
      },
      {
        accessorFn: (row) => new Date(row.updated_at),
        id: "updated_at",
        header: "Date",
        Cell: ({ cell }) => moment(cell.getValue<Date>()).format("MMM D, YYYY"),
        filterFn: "greaterThan",
        filterVariant: "date",
        enableGlobalFilter: false,
      },
      {
        accessorKey: "product",
        header: "Name",
      },
      {
        accessorKey: "status",
        header: "Status",
      },
    ],
    []
  );

  const openDeleteConfirmModal = (row: MRT_Row<InventoryType>) => {
    deleteInventory(row.original.id);
    refetchInventory();
  };

  const table = useMaterialReactTable({
    columns,
    data: isLoading ? [] : data?.inventory ?? [],
    initialState: {
      showGlobalFilter: true,
      columnVisibility: { id: false },
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
              addInventoryError
                ? "bg-red-100 text-red-700"
                : isSuccess
                ? "bg-green-100 text-green-700"
                : ""
            }`}
          >
            {toastMessage}
          </p>
        )}
        <p className="mb-2">Update Inventory</p>
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit((data) =>
            editInventoryRow(row.original.id ?? 0, data)
          )}
        >
          <Controller
            name="updated_at"
            control={control}
            defaultValue={row.original.updated_at}
            render={({ field }) => (
              <input
                className="w-full h-14 rounded-md border border-gray-200 px-2 py-1 lg:h-12"
                type="text"
                {...field}
                placeholder="Entry Date"
              />
            )}
            rules={{ required: "Entry date is required" }}
          />
          <Controller
            name="product"
            control={control}
            defaultValue={row.original.product}
            render={({ field }) => (
              <input
                className="w-full h-14 rounded-md border border-gray-200 px-2 py-1 lg:h-12"
                type="text"
                {...field}
                placeholder="Item"
              />
            )}
            rules={{ required: "Product name is required" }}
          />
          <Controller
            name="status"
            control={control}
            defaultValue={row.original.status}
            render={({ field }) => (
              <input
                className="w-full h-14 rounded-md border border-gray-200 px-2 py-1 lg:h-12"
                type="text"
                {...field}
                placeholder="Status"
              />
            )}
            rules={{ required: "Status is required" }}
          />

          <div className="flex h-auto w-full gap-5 justify-end mt-4">
            <button
              type="button"
              className="px-10 py-2 border border-primary text-primary rounded-md font-bold"
              onClick={() => table.setEditingRow(null)}
            >
              Cancel
            </button>
            <Button
              label="Submit"
              variant="primary"
              disabled={editInventoryStatus === "loading"}
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
              addInventoryError
                ? "bg-red-100 text-red-700"
                : isSuccess
                ? "bg-green-100 text-green-700"
                : ""
            }`}
          >
            {toastMessage}
          </p>
        )}
        <p className="mb-2">Inventory Details</p>
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit(submitInventory)}
        >
          <Controller
            name="product"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                className="w-full h-14 rounded-md border border-gray-200 px-2 py-1 lg:h-12"
                type="text"
                {...field}
                placeholder="Item"
              />
            )}
            rules={{ required: "Product name is required" }}
          />
          <div className="flex h-auto w-full gap-5 justify-end mt-4">
            <button
              className="px-10 py-2 border border-primary text-primary rounded-md font-bold"
              onClick={() => {
                table.setCreatingRow(null);
              }}
            >
              Cancel
            </button>
            <Button
              label="Submit"
              variant="primary"
              disabled={createInventoryStatus === "loading"}
            />
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
        <FaPlus className="mr-2" />
        Add Inventory
      </Button>
    ),
    state: {
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
      {isDeleteError && <Toast message={toastMessage} type="error" />}
      {isDeleteSuccess && <Toast message={toastMessage} type="success" />}
      <MaterialReactTable table={table} />
    </>
  );
};

export default InventoryTable;
