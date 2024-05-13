"use client";
import { Fragment, useRef, useState, useEffect } from "react";
import { Scheduler } from "@aldabil/react-scheduler";
import { useGetEvents } from "@/app/api/requests";
import { SchedulerRef } from "@aldabil/react-scheduler/types";
import React from "react";

const TimeSlots: React.FC = () => {
  const calendarRef = useRef<SchedulerRef>(null);
  const { data, isSuccess } = useGetEvents();
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    if (isSuccess) {
      const convertedAppointments = data.appointments.map(
        (appointment: any) => ({
          ...appointment,
          start: new Date(appointment.start),
          end: new Date(appointment.end),
        })
      );
      setEvents(convertedAppointments);
    }
  }, [data, isSuccess]);

  const fetchRemote = async () => {
    return events;
  };

  return (
    <Fragment>
      {isSuccess && (
        <Scheduler ref={calendarRef} deletable={false} events={events} />
      )}
    </Fragment>
  );
};

export default TimeSlots;
