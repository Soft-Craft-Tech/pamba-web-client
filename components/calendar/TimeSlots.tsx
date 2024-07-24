"use client";
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
import { AppointmentType } from "../types";

const TimeSlots = ({ events }: { events: AppointmentType[] }) => {
  const todayDate = dayjs().format("YYYY-MM-DD");

  const calendar = useNextCalendarApp({
    views: [viewMonthGrid, viewMonthAgenda, viewWeek, viewDay],
    datePicker: {
      selectedDate: todayDate,
    },
    defaultView: viewWeek.name,
    // @ts-expect-error: events is not assignable to type
    events,
    calendars: {
      past: {
        colorName: "past",
        lightColors: {
          main: "#DB1471",
          container: "#cf59900f",
          onContainer: "#000",
        },
      },
      upcoming: {
        colorName: "upcoming",
        lightColors: {
          main: "#027A48",
          container: "#ECFDF3",
          onContainer: "#000",
        },
      },
    },
    plugins: [createEventModalPlugin()],
  });

  return <ScheduleXCalendar calendarApp={calendar} />;
};

export default TimeSlots;
