"use client";
import { useBookAppointments } from "@/app/api/appointment";
import { useGetAllServices } from "@/app/api/businesses";
import { useGetAllClients } from "@/app/api/clients";
import Button from "@/ui/button";
import FormField from "@/ui/FormField";
import ReactSelectComponent from "@/ui/Select";
import { getUser } from "@/utils/auth";
import { clientSchema } from "@/utils/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateValidationError } from "@mui/x-date-pickers/models";
import dayjs from "dayjs";
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
import { WebApppointmentBookingType } from "../types";

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
    formState: { errors, isSubmitted },
  } = useForm<FormValues>({
    resolver: zodResolver(clientSchema),
  });

  const todaysDate = new Date().toUTCString();

  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const { client } = getUser();
  const { data, isPending, isError } = useGetAllClients();
  const { mutateAsync, status: createClientStatus } = useBookAppointments();
  const { data: allServices } = useGetAllServices(client?.slug);
  const [dateError, setDateError] = useState<DateValidationError | null>(null);

  const errorMessage = useMemo(() => {
    switch (dateError) {
      case "invalidDate": {
        return "Your date is not valid";
      }
      default: {
        return "";
      }
    }
  }, [dateError]);

  const submitClient = async (formData: FormValues) => {
    const now = dayjs().format("HH:mm");

    const data: WebApppointmentBookingType = {
      name: formData.name,
      date: dayjs(selectedDate).format("DD-MM-YYYY"),
      time: now,
      comment: "",
      staff: "",
      business: client?.id,
      service: formData.service.value,
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
     
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Appointment Date"
              value={selectedDate}
              onChange={(e) => {
                let val = e as any;
                setSelectedDate(val?.M?.$d);
              }}
              onError={(newError) => setDateError(newError)}
            />
          </LocalizationProvider>
    
          {(errorMessage !== "" && (
            <span className="bg-red-100 text-red-700 p-4 rounded-lg">
              {errorMessage}
            </span>
          )) ||
            (selectedDate === null && isSubmitted && (
              <span className="bg-red-100 text-red-700 p-4 rounded-lg">
                Date is required!
              </span>
            ))}

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
            name="service"
            control={control}
            render={({ field: { onChange, value } }) => (
              <ReactSelectComponent
                onChange={onChange}
                options={
                  allServices &&
                  allServices.services.map(
                    ({ service, id }: { service: string; id: number }) => ({
                      value: id,
                      label: service,
                    })
                  )
                }
                placeholder="Select Service"
                value={value}
                closeMenuOnSelect={true}
                error={errors.service}
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
