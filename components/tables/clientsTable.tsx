"use client";
import {
  useCreateInventory,
  useDeleteInventory,
  useEditInventory,
} from "@/app/api/inventory";
import Button from "@/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useForm } from "react-hook-form";

import { inventorySchema } from "@/utils/zodSchema";
import { FaPlus } from "react-icons/fa";
import * as z from "zod";
import FormField from "@/ui/FormField";
import { useGetAllClients } from "@/app/api/clients";

type ClientsType = {
  id: number;
  customer: {
    name: string;
    imageURL: string;
  };
  phoneNumber: string;
  lastApppointment: Date | null;
  nextApppointment: Date | null;
  totalRevenue: number;
  status: string;
};

type FormValues = z.infer<typeof inventorySchema>;

const ClientsTable = () => {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(inventorySchema),
  });

  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data, isPending, isError } = useGetAllClients();

  const {
    mutateAsync,
    isSuccess,
    status: createInventoryStatus,
  } = useCreateInventory();

  const { mutateAsync: deleteInventory } = useDeleteInventory();

  const { mutateAsync: editInventory, status: editInventoryStatus } =
    useEditInventory();

  const editInventoryRow = async (
    inventoryId: number,
    formData: FormValues
  ) => {
    const data = {
      inventoryId,
      status: formData.status,
    };
    await editInventory(data);
    reset();
    table.setEditingRow(null);
  };

  const submitInventory = async (formData: { product: string }) => {
    await mutateAsync(formData);
    reset();
    table.setCreatingRow(null);
  };

  const columns = useMemo<MRT_ColumnDef<ClientsType>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Inventory ID",
        disableFilters: true,
        enableEditing: false,
        enableGlobalFilter: false,
      },
      {
        accessorKey: "customer",
        header: "Customer",
      },
      {
        accessorKey: "phoneNumber",
        header: "Phone Number",
      },
      {
        accessorFn: (row) => new Date(row.lastApppointment!),
        id: "lastApppointment",
        header: "Last Appointment",
        Cell: ({ cell }) => moment(cell.getValue<Date>()).format("MMM D, YYYY"),
        filterFn: "greaterThan",
        filterVariant: "date",
        enableGlobalFilter: false,
      },
      {
        accessorFn: (row) => new Date(row.nextApppointment!),
        id: "nextApppointment",
        header: "Next Apppointment",
        Cell: ({ cell }) => moment(cell.getValue<Date>()).format("MMM D, YYYY"),
        filterFn: "greaterThan",
        filterVariant: "date",
        enableGlobalFilter: false,
      },
      {
        accessorKey: "totalRevenue",
        header: "Total Revenue",
      },
      {
        accessorKey: "status",
        header: "Status",
        Cell: ({ cell }) => (
          <div className="text-[#027A48] bg-[#ECFDF3] p-4 capitalize font-medium text-xs">
            {cell.getValue<string>()}
          </div>
        ),
      },
    ],
    []
  );

  const openDeleteConfirmModal = (row: MRT_Row<ClientsType>) => {
    deleteInventory(row.original.id);
  };

  const table = useMaterialReactTable({
    columns,
    data: isPending ? [] : data?.all_clients ?? [],
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
            reset();
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
        <p className="mb-2">Update Inventory</p>
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit((data) =>
            editInventoryRow(row.original.id ?? 0, data)
          )}
        >
          <FormField
            type="text"
            placeholder="Appointment Date"
            name="nextAppointment"
            register={register}
            error={errors.updated_at}
            defaultValue={moment(row.original.nextApppointment).format(
              "MMM D, YYYY"
            )}
            disabled
          />
          <FormField
            type="text"
            placeholder="Item"
            name="product"
            register={register}
            error={errors.product}
            defaultValue={row.original.customer.name}
            disabled
          />
          <FormField
            type="text"
            placeholder="Item"
            name="status"
            register={register}
            error={errors.status}
            defaultValue={row.original.status}
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
              type="submit"
              label="Submit"
              variant="primary"
              disabled={editInventoryStatus === "pending"}
            />
          </div>
        </form>
      </div>
    ),
    renderCreateRowDialogContent: () => (
      <div className="p-10">
        <p className="mb-2">Inventory Details</p>
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit((data) => {
            submitInventory(data);
          })}
        >
          <FormField
            type="text"
            placeholder="Item"
            name="product"
            register={register}
            error={errors.product}
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
              type="submit"
              label="Submit"
              variant="primary"
              disabled={createInventoryStatus === "pending"}
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
        Add Client
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

export default ClientsTable;
