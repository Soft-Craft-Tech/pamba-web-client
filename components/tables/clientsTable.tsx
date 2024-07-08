"use client";
import { useGetAllServices } from "@/app/api/businesses";
import { useCreateClients, useGetAllClients } from "@/app/api/clients";
import Button from "@/ui/button";
import FormField from "@/ui/FormField";
import { getUser } from "@/utils/auth";
import { clientSchema } from "@/utils/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_PaginationState,
  type MRT_SortingState,
} from "material-react-table";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import * as z from "zod";
import {
  BusinessServiceType,
  ServiceInfoType,
  WebApppointmentBookingType,
} from "../types";
import { useBookAppointments } from "@/app/api/appointment";
import { InputLabel } from "@mui/material";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

type ClientsType = {
  id: number;
  customer: string;
  email: string;
  phone: string;
  lastApppointment: Date | null;
  service: string;
};

type FormValues = z.infer<typeof clientSchema>;

const ClientsTable = () => {
  const {
    control,
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

  const { client } = getUser();
  const { data, isPending, isError } = useGetAllClients();
  const { mutateAsync, status: createClientStatus } = useBookAppointments();
  const { data: allServices } = useGetAllServices(client?.slug);

  const submitClient = async (formData: FormValues) => {
    const now = dayjs().format("HH:mm");

    const data: WebApppointmentBookingType = {
      name: formData.name,
      date: dayjs(formData.appointmentDate).format("DD-MM-YYYY"),
      time: now,
      comment: "",
      staff: "",
      business: client?.id,
      service: formData.service,
      email: formData.email,
      phone: formData.phone,
      notification: "email",
    };

    await mutateAsync(data);
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
        accessorKey: "name",
        header: "Client",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "phone",
        header: "Phone Number",
      },
    ],
    []
  );

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
    // enableRowActions: true,
    renderCreateRowDialogContent: () => (
      <div className="p-10">
        <p className="mb-2">Client Details</p>
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit(submitClient)}
        >
          <FormField
            type="text"
            placeholder="Customer Name"
            name="name"
            register={register}
            error={errors.name}
          />
          <FormField
            type="email"
            placeholder="Email"
            name="email"
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
            type="date"
            placeholder="Appointment Date"
            name="appointmentDate"
            register={register}
            error={errors.appointmentDate}
          />
          {/* <Controller
            control={control}
            name="appointmentTime.$d"
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker value={value ?? null} onChange={onChange} />
              </LocalizationProvider>
            )}
          />
          {errors.appointmentTime?.$d && (
            <span className="bg-red-100 text-red-700 p-4 rounded-lg">
              {errors.appointmentTime?.$d.message}
            </span>
          )} */}

          <Controller
            control={control}
            name="service"
            render={({ field: { onChange, value } }) => (
              <Select
                value={value ?? ""}
                onChange={onChange}
                inputProps={{ "aria-label": "Select service" }}
                displayEmpty
                renderValue={(selected) => {
                  if (!selected) {
                    return <em>Select Service</em>;
                  }
                  return (
                    allServices.services.find(
                      (service: BusinessServiceType) => service.id === selected
                    )?.service || ""
                  );
                }}
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
          {errors.service && (
            <span className="bg-red-100 text-red-700 p-4 rounded-lg">
              {errors.service.message}
            </span>
          )}

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
