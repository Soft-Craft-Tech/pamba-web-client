"use client";

import { useState } from "react";
import ExpenseSummary from "@/components/charts/expenseSummary";
import InitialExpenseStates from "@/components/features/userAccount/expenses/setInitialExpenseStates";
import AddProfileExpenses from "@/components/forms/addExpenses";
import ExpensesTable from "@/components/tables/expensesTable";

export default function Expenses() {
  const [openModal, setOpenModal] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleOpen = () => setOpenModal(true);
  const handleModalBtnClicked = () => setIsClicked(!isClicked);
  
  return (
    <div className="flex flex-col gap-10">
      <AddProfileExpenses modalState={openModal} btnClicked={isClicked} />
      <InitialExpenseStates handleModal={handleOpen} handleBtnClicked = {handleModalBtnClicked} />
      <ExpenseSummary />
      <ExpensesTable handleModal={handleOpen} />
    </div>
  );
}
