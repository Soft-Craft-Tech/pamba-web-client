"use client";
import { useState } from "react";
import ExpenseSummary from "@/components/charts/expenseSummary";
import InitialExpenseStates from "@/components/features/userAccount/expenses/setInitialExpenseStates";
import AddProfileExpenses from "@/components/forms/addExpenses";
import ExpensesTable from "@/components/tables/expensesTable";

export default function Expenses() {
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  
  return (
    <div className="flex flex-col gap-10">
      <AddProfileExpenses modalState={openModal} />
      <InitialExpenseStates />
      <ExpenseSummary />
      <ExpensesTable handleModal={handleOpen} />
    </div>
  );
}
