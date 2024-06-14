"use client";

import InventoryTable from "@/components/tables/inventoryTable";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export default function Inventory() {
  return (
    <div className="flex flex-col gap-10">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <InventoryTable />
      </LocalizationProvider>
    </div>
  );
}
