"use client";
import { useAllAppointments } from "@/app/api/appointment";
import {
  viewDay,
  viewMonthAgenda,
  viewMonthGrid,
  viewWeek,
} from "@schedule-x/calendar";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import { ScheduleXCalendar, useNextCalendarApp } from "@schedule-x/react";
import "@schedule-x/theme-default/dist/index.css";
import dayjs from "dayjs";
import { useState } from "react";

const TimeSlots: React.FC = () => {
  const { data, isSuccess, isPending } = useAllAppointments();
  const [appointments, setAppointments] = useState([]);
  const todayDate = dayjs().format("YYYY-MM-DD");

  const calendar = useNextCalendarApp({
    views: [viewMonthGrid, viewMonthAgenda, viewWeek, viewDay],
    datePicker: {
      selectedDate: todayDate,
    },
    defaultView: viewWeek.name,
    events: isSuccess && data.appointments,
    calendars: {
      past: {
        colorName: "past",
        lightColors: {
          main: "#DB1471",
          container: "#cf59900f", //DB14711F
          onContainer: "#000",
        },
      },
    },
    plugins: [createEventModalPlugin()],
  });

  if (isPending) return <div>Loading...</div>;

  return <ScheduleXCalendar calendarApp={calendar} />;
};

export default TimeSlots;
