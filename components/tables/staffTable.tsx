"use client";
import { useMemo, useState } from "react";
import {
  MRT_Row,
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_PaginationState,
  type MRT_SortingState,
} from "material-react-table";
import Button from "@/ui/button";
import {
  useCreateStaff,
  useDeleteStaff,
  useEditStaff,
  useGetAllStaff,
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
  f_name: string;
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

const StaffManagementTable = () => {
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
        f_name: "",
        phone: "",
        role: "",
      },
    },
  });

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
    refetch: refetchAllStaff,
  } = useGetAllStaff(client?.slug);

  const {
    mutateAsync,
    isSuccess,
    isError: createStuffError,
    status: createStuffStatus,
  } = useCreateStaff();

  const {
    mutateAsync: editStaff,
    isSuccess: isEditSuccess,
    isError: isEditError,
    status: editStuffStatus,
  } = useEditStaff();

  const {
    mutateAsync: deleteUser,
    isSuccess: isDeleteSuccess,
    isError: isDeleteError,
  } = useDeleteStaff();

  const editStaffRow = async (id: number, formData: any) => {
    try {
      const data = {
        ...formData,
        id,
      };
      await editStaff(data);
      reset({
        formData: {},
      });
      table.setEditingRow(null);
    } catch (error) {
      const customError = error as CustomError;
      dispatch(setMessage(customError?.response?.data?.message));
    }
  };

  const submitStuffDetails = async (formData: any) => {
    try {
      await mutateAsync(formData);
      refetchAllStaff();
      reset({
        formData: {},
      });
      table.setCreatingRow(null);
    } catch (error) {
      const customError = error as CustomError;
      dispatch(setMessage(customError?.response?.data?.message));
    }
  };

  if (isSuccess || createStuffError) {
    dispatch(setShowToast(true));
    setTimeout(() => {
      dispatch(setShowToast(false));
      // table.setEditingRow(null);
    }, 3000);
  }

  const columns = useMemo<MRT_ColumnDef<Staff>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableEditing: false,
        enableGlobalFilter: false,
      },
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
    refetchAllStaff();
  };

  const table = useMaterialReactTable({
    columns,
    data: isLoading ? [] : allStaffData?.staff ?? [],
    initialState: {
      showColumnFilters: false,
      showGlobalFilter: true,
      columnVisibility: { id: false },
    },
    positionGlobalFilter: "left",
    positionActionsColumn: "last",
    muiSearchTextFieldProps: {
      placeholder: "Search by Name, Phone, Role",
      sx: { minWidth: "400px" },
    },
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
              createStuffError
                ? "bg-red-100 text-red-700"
                : isSuccess
                ? "bg-green-100 text-green-700"
                : ""
            }`}
          >
            {toastMessage}
          </p>
        )}
        <p className="mb-2">Staff Details</p>
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit((data) =>
            editStaffRow(row.original.id ?? 0, data)
          )}
        >
          <Controller
            name="f_name"
            control={control}
            disabled
            defaultValue={row.original.f_name}
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
            defaultValue={row.original.phone}
            render={({ field }) => (
              <input
                className="w-full h-14 rounded-md border border-gray-200 px-2 py-1 lg:h-12"
                type="text"
                {...field}
                placeholder="Phone Number"
              />
            )}
            rules={{ required: true }}
          />
          <Controller
            name="role"
            control={control}
            defaultValue={row.original.role}
            render={({ field }) => (
              <input
                className="w-full h-14 rounded-md border border-gray-200 px-2 py-1 lg:h-12"
                type="text"
                {...field}
                placeholder="Role"
              />
            )}
            rules={{ required: true }}
          />
          <div className="flex h-auto w-full gap-5 justify-end mt-4">
            <button
              type="button"
              className="px-12 py-2 border border-gray-400 rounded-md"
              onClick={() => {
                table.setEditingRow(null);
                reset();
              }}
            >
              Cancel
            </button>
            <Button
              label="Save"
              variant="primary"
              disabled={editStuffStatus === "loading"}
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
              createStuffError
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
          onSubmit={handleSubmit(submitStuffDetails)}
        >
          <Controller
            name="f_name"
            control={control}
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
            render={({ field }) => (
              <input
                className="w-full h-14 rounded-md border border-gray-200 px-2 py-1 lg:h-12"
                type="text"
                {...field}
                placeholder="Role"
              />
            )}
            rules={{ required: true }}
          />
          <div className="flex h-auto w-full gap-5 justify-end mt-4">
            <button
              type="button"
              className="px-12 py-2 border border-gray-400 rounded-md"
              onClick={() => {
                table.setCreatingRow(null);
              }}
            >
              Cancel
            </button>
            <Button
              label="Save Staff"
              variant="primary"
              disabled={createStuffStatus === "loading"}
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
        Create Staff
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
      {(isDeleteError || isEditError) && (
        <Toast message={toastMessage} type="error" />
      )}
      {(isDeleteSuccess || isEditSuccess) && (
        <Toast message={toastMessage} type="success" />
      )}
      <MaterialReactTable table={table} />
    </>
  );
};

export default StaffManagementTable;
