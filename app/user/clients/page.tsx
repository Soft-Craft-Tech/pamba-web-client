import ClientsTable from "@/components/tables/clientsTable";

export default function Clients() {
  return (
    <div className="flex flex-col gap-10">
      {/* <ClientSummary /> */}
      <ClientsTable />
    </div>
  );
}
