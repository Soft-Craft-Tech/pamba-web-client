import { useAllAppointments } from "@/app/api/appointment";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import moment from "moment";
import { useState } from "react";
import { AppointmentType } from "../types";

const AppointmentsCard = () => {
  const { data } = useAllAppointments();

  const todayDate = moment().format("MMM DD, YYYY");

  const [selectedDate, setSelectedDate] = useState(todayDate);
  const filteredAppointments =
    (data &&
      data.appointments
        .filter(
          (appointment: AppointmentType) => appointment.date === selectedDate
        )
        .sort((a: AppointmentType, b: AppointmentType) =>
          a.time.localeCompare(b.time)
        )) ||
    [];

  const AllDatesSet =
    data &&
    Array.from(
      new Set(
        data.appointments.map(
          (appointment: AppointmentType) => appointment.date
        )
      )
    ).sort((a:any, b:any) => new Date(b).getTime() - new Date(a).getTime());

  return (
    <div className="col-span-12 rounded-xl border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="flex flex-col gap-4 px-4">
        <div className="flex justify-between items-center pb-2">
          <h2 className="text-lg font-semibold">Appointments</h2>

          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="select-date-label">Date</InputLabel>
            <Select
              labelId="select-date-label"
              id="selectedDate"
              value={todayDate}
              label="Date"
              onChange={(e) => setSelectedDate(e.target.value)}
            >
              <MenuItem value={todayDate}>{todayDate}</MenuItem>
              {AllDatesSet?.map((date: string, index: number) => (
                <MenuItem key={index} value={date}>
                  {moment(date).format("MMM DD, YYYY")}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {filteredAppointments.length > 0 ? (
          <div>
            <p className="text-sm font-normal text-gray-600 mb-2">Upcoming</p>
            <div className="flex flex-col gap-4 overflow-auto max-h-64">
              {filteredAppointments.map((appointment: AppointmentType) => (
                <div
                  key={appointment.id}
                  className="flex flex-col gap-1.5 border border-stroke dark:border-strokedark p-3 rounded-md bg-gray-50"
                >
                  <p className="font-normal pb-1">
                    <span className="text-primary">{appointment.title} </span>
                    <span className="text-sm">by</span>{" "}
                    <span className="text-grayArea">{appointment.staff}</span>
                  </p>
                  <p className="text-xs font-normal text-gray-600">
                    {moment(appointment.start).format("hh:mm A")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center font-medium h-full">
            You have no appointments today!
          </p>
        )}
      </div>
    </div>
  );
};

export default AppointmentsCard;
