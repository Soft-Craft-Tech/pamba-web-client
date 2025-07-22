"use client";
import { useAllAppointments, useBookAppointments } from "@/app/api/appointment";
import { useGetAllServices } from "@/app/api/businesses";
import Button from "@/ui/button";
import FormField from "@/ui/FormField";
import ReactSelectComponent from "@/ui/Select";
import { getUser } from "@/utils/auth";
import { appointmentListSchema } from "@/utils/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateValidationError } from "@mui/x-date-pickers/models";
import dayjs, { Dayjs } from "dayjs";
import {
  MaterialReactTable,
  MRT_Row,
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
import { TimePicker, TimeValidationError } from "@mui/x-date-pickers";
import { formatTime } from "@/utils/formatTime";
import { shouldDisableTime } from "@/utils/disableTime";

type AppointmentType = {
  calendarId: string;
  cancelled: boolean;
  comment: string;
  completed: boolean;
  create_at: string;
  date: string;
  end: string;
  id: number;
  people: string[];
  service: {
    business_id: number;
    description: string;
    estimated_service_time: number;
    id: number;
    price: number;
    service: string;
    service_category: number;
  };
  start: string;
  time: string;
  title: string;
};

type FormValues = z.infer<typeof appointmentListSchema>;

const AppointmentTable = () => {
  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors, isSubmitted },
  } = useForm<FormValues>({
    resolver: zodResolver(appointmentListSchema),
  });
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(null);
  const { client } = getUser();
  const { data: allAppointments, isPending, isError } = useAllAppointments();
  const { mutateAsync, status: createClientStatus } = useBookAppointments();
  const { data: allServices } = useGetAllServices(client?.slug);
  const [dateError, setDateError] = useState<DateValidationError>(null);
  const [timeError, setTimeError] = useState<TimeValidationError>(null);

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

  const openDeleteConfirmModal = (row: MRT_Row<AppointmentType>) => {
    console.log(row);
  };

  const submitClient = async (formData: FormValues) => {
    const data: WebApppointmentBookingType = {
      name: formData.name,
      date: dayjs(selectedDate).format("DD-MM-YYYY"),
      time: dayjs(selectedTime).format("HH:mm"),
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
    setSelectedTime(null);
    setSelectedDate(null);
    table.setCreatingRow(null);
  };

  const columns = useMemo<MRT_ColumnDef<AppointmentType>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Client ID",
        disableFilters: true,
        enableEditing: false,
        enableGlobalFilter: false,
      },
      {
        accessorKey: "people",
        header: "Client",
        Cell: ({ cell }) => (cell.getValue<string[]>()?.join(", ") ?? "")
      },
      {
        accessorKey: "service.service",
        header: "Service",
        Cell: ({ row }) => row.original.service?.service ?? ""
      },
      {
        accessorKey: "date",
        header: "Date",
      },
      {
        accessorKey: "start",
        header: "Start Time",
      },
      {
        accessorKey: "end",
        header: "End Time",
      },
      {
        accessorKey: "title",
        header: "Title",
      },
      {
        accessorKey: "comment",
        header: "Comment",
      },
      {
        accessorKey: "completed",
        header: "Completed",
        Cell: ({ cell }) => (cell.getValue<boolean>() ? "Yes" : "No")
      },
      {
        accessorKey: "cancelled",
        header: "Cancelled",
        Cell: ({ cell }) => (cell.getValue<boolean>() ? "Yes" : "No")
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: isPending ? [] : allAppointments?.appointments ?? [],
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
    renderEditRowDialogContent: ({ row }) => (
      <div className="p-10">
        <p className="mb-2">Appointment Details</p>
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit(submitClient)}
          noValidate
        >
          <FormField
            type="text"
            placeholder="Customer Name"
            name="name"
            register={register}
            defaultValue={row.original.name}
            error={errors.name}
          />
          <FormField
            type="email"
            placeholder="Email"
            name="email"
            register={register}
            defaultValue={row.original.email}
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

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Appointment Date"
              value={selectedDate}
              onChange={(e) => {
                let val = e as any;
                setSelectedDate(val);
              }}
              defaultValue={row.original.date}
              disablePast
              onError={(newError) => setDateError(newError)}
            />

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

            <TimePicker
              label="Appointment Time"
              value={selectedTime}
              onChange={(e) => {
                setSelectedTime(e);
              }}
              defaultValue={row.original.time}
              shouldDisableTime={(timeValue, clockType) =>
                shouldDisableTime(timeValue, clockType, selectedDate, client)
              }
              onError={(newError) => {
                setTimeError(newError);
              }}
            />
            {timeError !== null && (
              <span className="bg-red-100 text-red-700 p-4 rounded-lg">
                Please select a time between{" "}
                {selectedDate &&
                (selectedDate.day() === 0 || selectedDate.day() === 6) ? (
                  <>
                    {formatTime(client?.weekend_opening)} and{" "}
                    {formatTime(client?.weekend_closing)} (Weekend hours)
                  </>
                ) : (
                  <>
                    {formatTime(client?.weekday_opening)} and{" "}
                    {formatTime(client?.weekday_closing)} (Weekday hours)
                  </>
                )}
              </span>
            )}
          </LocalizationProvider>

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
    renderCreateRowDialogContent: () => (
      <div className="p-10">
        <p className="mb-2">Appointment Details</p>
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit(submitClient)}
          noValidate
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
                setSelectedDate(val);
              }}
              disablePast
              onError={(newError) => setDateError(newError)}
            />

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

            <TimePicker
              label="Appointment Time"
              value={selectedTime}
              onChange={(e) => {
                setSelectedTime(e);
              }}
              shouldDisableTime={(timeValue, clockType) =>
                shouldDisableTime(timeValue, clockType, selectedDate, client)
              }
              onError={(newError) => {
                setTimeError(newError);
              }}
            />
            {timeError !== null && (
              <span className="bg-red-100 text-red-700 p-4 rounded-lg">
                Please select a time between{" "}
                {selectedDate &&
                (selectedDate.day() === 0 || selectedDate.day() === 6) ? (
                  <>
                    {formatTime(client?.weekend_opening)} and{" "}
                    {formatTime(client?.weekend_closing)} (Weekend hours)
                  </>
                ) : (
                  <>
                    {formatTime(client?.weekday_opening)} and{" "}
                    {formatTime(client?.weekday_closing)} (Weekday hours)
                  </>
                )}
              </span>
            )}
          </LocalizationProvider>

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
        Add Appointment
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

export default AppointmentTable;
