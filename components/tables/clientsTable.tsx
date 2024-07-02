"use client";
import {
  useCreateClients,
  useDeleteClients,
  useEditClients,
} from "@/app/api/clients";
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

import { clientSchema } from "@/utils/zodSchema";
import { FaPlus } from "react-icons/fa";
import * as z from "zod";
import FormField from "@/ui/FormField";
import { useGetAllClients } from "@/app/api/clients";

type ClientsType = {
  id: number;
  customer: string;
  phone: string;
  lastApppointment: Date | null;
  nextApppointment: Date | null;
  service: string;
};

type FormValues = z.infer<typeof clientSchema>;

const ClientsTable = () => {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(clientSchema),
  });

  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data, isPending, isError } = useGetAllClients();

  const { mutateAsync, status: createClientStatus } = useCreateClients();

  const { mutateAsync: deleteClient } = useDeleteClients();

  const { mutateAsync: editClient, status: editClientStatus } =
    useEditClients();

  const editClientRow = async (clientId: number, formData: FormValues) => {
    // const data = {
    //   clientId,
    //   status: formData,
    // };
    // await editClient(data);
    reset();
    table.setEditingRow(null);
  };

  const submitClient = async (formData: { product: string }) => {
    await mutateAsync(formData);
    reset();
    table.setCreatingRow(null);
  };

  const columns = useMemo<MRT_ColumnDef<ClientsType>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Client ID",
        disableFilters: true,
        enableEditing: false,
        enableGlobalFilter: false,
      },
      {
        accessorKey: "customer",
        header: "Customer",
      },
      {
        accessorKey: "phone",
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
    ],
    []
  );

  const openDeleteConfirmModal = (row: MRT_Row<ClientsType>) => {
    deleteClient(row.original.id);
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
        <p className="mb-2">Update Client</p>
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit((data) =>
            editClientRow(row.original.id ?? 0, data)
          )}
        >
          <FormField
            type="text"
            placeholder="Customer Name"
            name="customer"
            register={register}
            defaultValue={row.original.customer}
            error={errors.customer}
          />
          <FormField
            type="email"
            placeholder="Email"
            name="email"
            register={register}
            // defaultValue={row.original.email}
            error={errors.email}
          />
          <FormField
            type="tel"
            placeholder="Phone Number"
            name="phone"
            register={register}
            defaultValue={row.original.phone}
            error={errors.phone}
          />
          <FormField
            type="datetime-local"
            placeholder="Appointment Date"
            name="appointmentDate"
            register={register}
            // defaultValue={moment(row.original.appointmentDate).format(
            //   "MMM D, YYYY"
            // )}
            error={errors.appointmentDate}
          />
          <FormField
            type="text"
            placeholder="Service"
            name="service"
            register={register}
            defaultValue={row.original.service}
            error={errors.service}
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
              disabled={editClientStatus === "pending"}
            />
          </div>
        </form>
      </div>
    ),
    renderCreateRowDialogContent: () => (
      <div className="p-10">
        <p className="mb-2">Client Details</p>
        <form
          className="flex flex-col gap-2"
          // onSubmit={handleSubmit((data) => {
          //   submitClient(data);
          // })}
        >
          <FormField
            type="text"
            placeholder="Customer Name"
            name="customer"
            register={register}
            error={errors.customer}
          />
          <FormField
            type="email"
            placeholder="Email"
            name="Email"
            register={register}
            error={errors.email}
          />
          <FormField
            type="tel"
            placeholder="Phone Number"
            name="phone"
            register={register}
            error={errors.phone}
          />
          <FormField
            type="datetime-local"
            placeholder="Appointment Date"
            name="appointmentDate"
            register={register}
            error={errors.appointmentDate}
          />
          <FormField
            type="text"
            placeholder="Service"
            name="service"
            register={register}
            error={errors.service}
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
              disabled={createClientStatus === "pending"}
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
