import { useAllAppointments } from "@/app/api/appointment";
import ReactSelectComponent from "@/ui/Select";
import moment from "moment";
import { useEffect, useState } from "react";
import { AppointmentType } from "../types";

const AppointmentsCard = () => {
  const { data } = useAllAppointments();

  const todayDate = moment().format("YYYY-MM-DD");

  const [selectedDate, setSelectedDate] = useState({
    label: moment(todayDate).format("MMM DD, YYYY"),
    value: todayDate,
  });
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  useEffect(() => {
    setFilteredAppointments(
      (data &&
        data.appointments
          .filter(
            (appointment: AppointmentType) =>
              appointment.date === selectedDate.value
          )
          .sort((a: AppointmentType, b: AppointmentType) =>
            a.time.localeCompare(b.time)
          )) ||
        []
    );
  }, [selectedDate, data]);

  const AllDatesSet =
    data &&
    Array.from(
      new Set(
        data.appointments.map(
          (appointment: AppointmentType) => appointment.date
        )
      )
    ).sort();

  return (
    <div className="col-span-12 rounded-xl border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="flex flex-col gap-4 px-4">
        <div className="flex justify-between items-center pb-2">
          <h2 className="text-lg font-semibold">Appointments</h2>

          <ReactSelectComponent
            className="w-40"
            options={AllDatesSet?.map((date: string) => ({
              label: moment(date).format("MMM DD, YYYY"),
              value: date,
            }))}
            value={selectedDate}
            onChange={(newValue: unknown) => {
              const e = newValue as { label: string; value: string };
              setSelectedDate(e);
            }}
          />
        </div>
        {filteredAppointments?.length > 0 ? (
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
                  </p>
                  <p className="text-sm font-normal text-grayArea">
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
