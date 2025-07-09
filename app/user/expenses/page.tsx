"use client";

import { useState } from "react";
import ExpenseSummary from "@/components/charts/expenseSummary";
import InitialExpenseStates from "@/components/features/userAccount/expenses/setInitialExpenseStates";
import ExpensesTable from "@/components/tables/expensesTable";
import AddProfileExpensesModal from "@/components/forms/addExpenses";

export default function Expenses() {
  const [openModal, setOpenModal] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleOpen = () => setOpenModal(true);
  const handleModalBtnClicked = () => setIsClicked(!isClicked);

  return (
    <div className="flex flex-col gap-10">
      <AddProfileExpensesModal modalState={openModal} btnClicked={isClicked} />
      <InitialExpenseStates
        handleModal={handleOpen}
        handleBtnClicked={handleModalBtnClicked}
      />
      <ExpenseSummary />
      <ExpensesTable handleModal={handleOpen} />
    </div>
  );
}
