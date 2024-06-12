"use client";

import InventoryTrends from "@/components/charts/inventoryTrends";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import InventoryTable from "@/components/tables/inventoryTable";

export default function Inventory() {
  return (
    <div className="flex flex-col gap-10">
      <InventoryTrends />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <InventoryTable />
      </LocalizationProvider>
    </div>
  );
}
