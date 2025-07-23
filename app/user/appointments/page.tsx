import ClientSummary from "@/components/charts/clientManagement";
import AppointmentTable from "@/components/tables/appointmentTable";

export default function Appointments() {
  return (
    <div className="flex flex-col gap-10">
      <ClientSummary />
      <AppointmentTable />
    </div>
  );
}
