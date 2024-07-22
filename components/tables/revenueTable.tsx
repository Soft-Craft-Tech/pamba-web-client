"use client";

import { useGetAllServices } from "@/app/api/businesses";
import {
  useDeleteSale,
  useEditSale,
  useGetAllSales,
  useRecordSale,
} from "@/app/api/revenue";
import Button from "@/ui/button";
import FormField from "@/ui/FormField";
import ReactSelectComponent from "@/ui/Select";
import { getUser } from "@/utils/auth";
import { revenueSchema } from "@/utils/zodSchema";
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
import { Controller, useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import * as z from "zod";
import { BusinessServiceType } from "../types";

type RevenueType = {
  id: number;
  date_created: string;
  service: string;
  service_id: number;
  description: string;
  payment_method: string;
};

type FormValues = z.infer<typeof revenueSchema>;

const RevenueTable = () => {
  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(revenueSchema),
  });

  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { client } = getUser();
  const { data, isPending, isError } = useGetAllSales();

  const { mutateAsync, status: recordSaleStatus } = useRecordSale();
  const { mutateAsync: deleteSale } = useDeleteSale();
  const { mutateAsync: editSale } = useEditSale();
  const { data: allServices } = useGetAllServices(client?.slug);

  const editRevenue = async (formData: FormValues, sale_id: number) => {
    const { serviceId, description, paymentMethod } = formData;
    await editSale({
      paymentmethod: paymentMethod.value,
      description,
      service_id: serviceId.value,
      sale_id,
    });
    reset();
    table.setEditingRow(null);
  };

  const submitRevenue = async (formData: FormValues) => {
    const data = {
      serviceId: formData.serviceId.value,
      description: formData.description,
      paymentMethod: formData.paymentMethod.value,
    };

    await mutateAsync(data);
    reset();

    table.setCreatingRow(null);
  };

  const openDeleteConfirmModal = (row: MRT_Row<RevenueType>) => {
    deleteSale(row.original.id);
  };

  const columns = useMemo<MRT_ColumnDef<RevenueType>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Revenue ID",
        disableFilters: true,
        enableEditing: false,
        enableGlobalFilter: false,
      },
      {
        accessorFn: (row) => new Date(row.date_created),
        id: "date_created",
        header: "Date Created",
        Cell: ({ cell }) => moment(cell.getValue<Date>()).format("MMM D, YYYY"),
        filterFn: "greaterThan",
        filterVariant: "date",
        enableGlobalFilter: false,
      },
      {
        accessorKey: "service",
        header: "Service",
      },
      {
        accessorKey: "service_id",
        header: "Service ID",
        disableFilters: true,
        enableEditing: false,
        enableGlobalFilter: false,
      },
      {
        accessorKey: "description",
        header: "Description",
      },
      {
        accessorKey: "payment_method",
        header: "Payment Method",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: isPending ? [] : data?.sales ?? [],
    initialState: {
      showGlobalFilter: true,
      columnVisibility: { id: false, service_id: false },
    },
    positionGlobalFilter: "left",
    positionActionsColumn: "last",
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    enableRowActions: true,
    renderRowActions: ({ row }) => (
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
        <p className="mb-2">Sale Details</p>
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit((data) => editRevenue(data, row.original.id))}
        >
          <Controller
            control={control}
            name="serviceId"
            defaultValue={{
              value: row.original.service_id,
              label: row.original.service,
            }}
            render={({ field: { onChange, value } }) => (
              <ReactSelectComponent
                onChange={onChange}
                options={
                  allServices &&
                  allServices.services.map((service: BusinessServiceType) => ({
                    value: service?.service_category,
                    label: service?.service,
                  }))
                }
                placeholder="Select Service"
                value={value}
                closeMenuOnSelect={true}
                error={errors.serviceId}
              />
            )}
          />
          <FormField
            type="text"
            placeholder="Description"
            name="description"
            register={register}
            defaultValue={row.original.description}
            error={errors.description}
          />

          <Controller
            control={control}
            name="paymentMethod"
            defaultValue={{
              value: row.original.payment_method,
              label: row.original.payment_method,
            }}
            render={({ field: { onChange, value } }) => (
              <ReactSelectComponent
                onChange={onChange}
                options={[
                  { value: "Cash", label: "Cash" },
                  { value: "POS", label: "POS" },
                  { value: "Bank Transfer", label: "Bank Transfer" },
                  { value: "Cheque", label: "Cheque" },
                ]}
                name="paymentMethod"
                placeholder="Select Payment Method"
                value={value}
                closeMenuOnSelect={true}
                error={errors.paymentMethod}
              />
            )}
          />

          <div className="flex h-auto w-full gap-5 justify-end mt-4">
            <button
              className="px-10 py-2 border border-primary text-primary rounded-md font-bold"
              onClick={() => {
                table.setEditingRow(null);
              }}
            >
              Cancel
            </button>
            <Button
              type="submit"
              label="Submit"
              variant="primary"
              disabled={recordSaleStatus === "pending"}
            />
          </div>
        </form>
      </div>
    ),
    renderCreateRowDialogContent: () => (
      <div className="p-10">
        <p className="mb-2">Sale Details</p>
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit(submitRevenue)}
        >
          <Controller
            control={control}
            name="serviceId"
            render={({ field: { onChange, value } }) => (
              <ReactSelectComponent
                onChange={onChange}
                options={
                  allServices &&
                  allServices.services.map((service: BusinessServiceType) => ({
                    value: service?.id,
                    label: service?.service,
                  }))
                }
                name="serviceId"
                placeholder="Select Service"
                value={value}
                closeMenuOnSelect={true}
                error={errors.serviceId}
              />
            )}
          />

          <FormField
            type="text"
            placeholder="Description"
            name="description"
            register={register}
            error={errors.description}
          />

          <Controller
            control={control}
            name="paymentMethod"
            render={({ field: { onChange, value } }) => (
              <ReactSelectComponent
                onChange={onChange}
                options={[
                  { value: "Cash", label: "Cash" },
                  { value: "POS", label: "POS" },
                  { value: "Bank Transfer", label: "Bank Transfer" },
                  { value: "Cheque", label: "Cheque" },
                ]}
                name="paymentMethod"
                placeholder="Select Payment Method"
                value={value}
                closeMenuOnSelect={true}
                error={errors.paymentMethod}
              />
            )}
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
              disabled={recordSaleStatus === "pending"}
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
        Add Sale
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

export default RevenueTable;
