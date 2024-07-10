"use client";
import { useAllAppointments } from "@/app/api/appointment";
import Timeslots from "@/components/calendar/TimeSlots";
import Loader from "@/components/loader";

const Page = () => {
  const { data, isPending } = useAllAppointments();

  if (isPending) return <Loader />;

  return (
    <div>
      {data?.appointments.length > 0 && (
        <Timeslots events={data.appointments} />
      )}
    </div>
  );
};

export default Page;
