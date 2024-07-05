import ClientSummary from "@/components/charts/clientManagement";
import ClientsTable from "@/components/tables/clientsTable";
import React from "react";

export default function Clients() {
  return (
    <div className="flex flex-col gap-10">
      <ClientSummary />
      <ClientsTable />
    </div>
  );
}
