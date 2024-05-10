"use client";
import { Fragment, useRef } from "react";
import { Scheduler } from "@aldabil/react-scheduler";
import { useGetEvents } from "@/app/api/requests";
import {
  SchedulerRef,
  ProcessedEvent,
  ViewEvent,
} from "@aldabil/react-scheduler/types";
import React from "react";
// import { EVENTS } from "@/utils/data";

interface Appointment {
  cancelled: boolean;
  comment: string;
  completed: boolean;
  create_at: string;
  date: string;
  end: string;
  event_id: number;
  id: number;
  staff: string;
  start: string;
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

  const fetchRemote = async (query: ViewEvent): Promise<ProcessedEvent[]> => {
    console.log({ query });
    return new Promise((res) => {
      setTimeout(() => {
        res(convertedAppointments);
      }, 3000);
    });
  };

  return (
    <Fragment>
      <Scheduler
        ref={calendarRef}
        getRemoteEvents={fetchRemote}
        deletable={false}
      />
    </Fragment>
  );
};

export default TimeSlots;
