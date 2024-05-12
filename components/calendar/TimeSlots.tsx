"use client";
import { Fragment, useRef } from "react";
import { Scheduler } from "@aldabil/react-scheduler";
import { useGetEvents } from "@/app/api/requests";
import { SchedulerRef } from "@aldabil/react-scheduler/types";
import React from "react";

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

  const fetchRemote = async () => {
    const data = await convertedAppointments;
    return data;
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
