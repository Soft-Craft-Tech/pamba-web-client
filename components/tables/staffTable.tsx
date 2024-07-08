"use client";
import {
  useCreateStaff,
  useDeleteStaff,
  useEditStaff,
  useGetAllStaff,
} from "@/app/api/staff";
import Button from "@/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";

import FormField from "@/ui/FormField";
import { getUser } from "@/utils/auth";
import { staffSchema } from "@/utils/zodSchema";
import {
  MRT_Row,
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_PaginationState,
  type MRT_SortingState,
} from "material-react-table";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

type Staff = {
  f_name: string;
  phone: string;
  role: string;
  id?: number;
};

type FormValues = z.infer<typeof staffSchema>;

const StaffManagementTable = () => {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(staffSchema),
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
    isPending,
    isError,
  } = useGetAllStaff(client?.slug);

  const { mutateAsync, status: createStuffStatus } = useCreateStaff();

  const { mutateAsync: editStaff, status: editStuffStatus } = useEditStaff();

  const { mutateAsync: deleteUser } = useDeleteStaff();

  const editStaffRow = async (id: number, formData: FormValues) => {
    const data = {
      ...formData,
      id,
    };

    await editStaff(data);
    reset();
    table.setEditingRow(null);
  };

  const submitStuffDetails = async (formData: FormValues) => {
    await mutateAsync(formData);
    reset();
    table.setCreatingRow(null);
  };

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
    if (row.original.id) deleteUser(row.original.id);
  };

  const table = useMaterialReactTable({
    columns,
    data: isPending ? [] : allStaffData?.staff ?? [],
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
        <p className="mb-2">Staff Details</p>
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit((data) =>
            editStaffRow(row.original.id ?? 0, data)
          )}
        >
          <FormField
            type="text"
            placeholder="Staff Name"
            name="f_name"
            register={register}
            defaultValue={row.original.f_name}
            error={errors.f_name}
            disabled={true}
          />
          <FormField
            type="text"
            placeholder="Phone Number"
            name="phone"
            register={register}
            defaultValue={row.original.phone}
            error={errors.phone}
          />
          <FormField
            type="text"
            placeholder="Role"
            name="role"
            register={register}
            defaultValue={row.original.role}
            error={errors.role}
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
              type="submit"
              label="Save"
              variant="primary"
              disabled={editStuffStatus === "pending"}
            />
          </div>
        </form>
      </div>
    ),
    renderCreateRowDialogContent: () => (
      <div className="p-10">
        <p className="mb-2">Create Staff Details</p>
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit(submitStuffDetails)}
        >
          <FormField
            type="text"
            placeholder="Staff Name"
            name="f_name"
            register={register}
            error={errors.f_name}
          />
          <FormField
            type="text"
            placeholder="Phone Number"
            name="phone"
            register={register}
            error={errors.phone}
          />
          <FormField
            type="text"
            placeholder="Role"
            name="role"
            register={register}
            error={errors.role}
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
              type="submit"
              label="Save Staff"
              variant="primary"
              disabled={createStuffStatus === "pending"}
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
      isLoading: isPending,
      pagination,
      showAlertBanner: isError,
      sorting,
    },
  });

  return <MaterialReactTable table={table} />;
};

export default StaffManagementTable;
