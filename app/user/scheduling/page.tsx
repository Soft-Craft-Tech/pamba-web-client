"use client";
import { useAllAppointments } from "@/app/api/appointment";
import Timeslots from "@/components/calendar/TimeSlots";

const Page = () => {
  const { data, isPending } = useAllAppointments();

  if (isPending) return <p>Loading...</p>;

  return (
    <div>
      {data?.appointments.length > 0 && (
        <Timeslots events={data.appointments} />
      )}
    </div>
  );
};

export default Page;
