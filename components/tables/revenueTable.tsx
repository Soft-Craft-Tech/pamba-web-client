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
import { getUser } from "@/utils/auth";
import { revenueSchema } from "@/utils/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
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
import SelectField from "@/ui/SelectField";

type RevenueType = {
  id: number;
  date_created: string;
  service: string;
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
      paymentmethod: paymentMethod,
      description,
      service_id: serviceId,
      sale_id,
    });
    reset();
    table.setEditingRow(null);
  };

  const submitRevenue = async (formData: FormValues) => {
    await mutateAsync(formData);
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
      columnVisibility: { id: false },
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
          {/* <FormControl sx={{ minWidth: 120 }}>
            <Controller
              control={control}
              name="serviceId"
              render={({ field: { onChange, value } }) => (
                <Select
                  value={value}
                  onChange={onChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Select service" }}
                  placeholder="Select Service"
                >
                  {allServices &&
                    allServices.services.map((service: BusinessServiceType) => (
                      <MenuItem key={service?.id} value={service?.id}>
                        {service?.service}
                      </MenuItem>
                    ))}
                </Select>
              )}
            />
          </FormControl> */}
          <SelectField
            placeholder="Select Service"
            name="serviceId"
            error={errors.serviceId}
            control={control}
            options={
              allServices &&
              allServices.services.map((service: BusinessServiceType) => (
                <option key={service?.id} value={service?.id}>
                  {service?.service}
                </option>
              ))
            }
            defaultValue={row.original.service}
          />

          <FormField
            type="text"
            placeholder="Description"
            name="description"
            register={register}
            defaultValue={row.original.description}
            error={errors.description}
          />
          <FormField
            type="text"
            placeholder="Payment Method"
            name="paymentMethod"
            register={register}
            defaultValue={row.original.payment_method}
            error={errors.paymentMethod}
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
          {/* <FormField
            type="text"
            placeholder="Customer Name"
            name="customer"
            register={register}
            error={errors.customer}
          /> */}
          <SelectField
            placeholder="Select Service"
            name="serviceId"
            error={errors.serviceId}
            control={control}
            options={
              allServices &&
              allServices.services.map((service: BusinessServiceType) => (
                <option key={service?.id} value={service?.id}>
                  {service?.service}
                </option>
              ))
            }
          />
          <FormField
            type="text"
            placeholder="Description"
            name="description"
            register={register}
            error={errors.description}
          />
          <FormField
            type="text"
            placeholder="Payment Method"
            name="paymentMethod"
            register={register}
            error={errors.paymentMethod}
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
