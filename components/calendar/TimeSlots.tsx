"use client";
import { Fragment, useRef } from "react";
import { Scheduler } from "@aldabil/react-scheduler";
import { useGetEvents } from "@/app/api/requests";
import { SchedulerRef, ProcessedEvent } from "@aldabil/react-scheduler/types";
import React from "react";
import { EVENTS } from "@/utils/data";

interface Appointment {
  cancelled: boolean;
  comment: string;
  completed: boolean;
  create_at: string;
  date: string;
  end: string; // Assuming end is a string in the format "YYYY-MM-DDTHH:mm:ss"
  event_id: number;
  id: number;
  staff: string;
  start: string; // Assuming start is a string in the format "YYYY-MM-DDTHH:mm:ss"
  time: string;
  title: string;
}

const TimeSlots: React.FC = () => {
  const calendarRef = useRef<SchedulerRef>(null);
  const { data, isSuccess } = useGetEvents();

  const convertedAppointments: any = isSuccess
    ? data.appointments.map((appointment: any) => ({
        ...appointment,
        start: new Date(appointment.start),
        end: new Date(appointment.end),
      }))
    : [];

  return (
    <Fragment>
      <Scheduler
        ref={calendarRef}
        getRemoteEvents={convertedAppointments}
        deletable={false}
      />
    </Fragment>
  );
};

export default TimeSlots;
