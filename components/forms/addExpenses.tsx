"use client";

// import { useGetProfileCompletionStatus } from "@/app/api/businesses";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import AddExpenseAccounts from "../features/profileCompletion/addExpenseAccounts";

const AddProfileExpensesModal = ({
  modalState,
  btnClicked,
}: {
  modalState: boolean;
  btnClicked: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  // const { data } = useGetProfileCompletionStatus();

  // useEffect(() => {
  //   if (!data?.expenseAccounts) {
  //     handleOpen();
  //   }
  // }, [data]);

  useEffect(() => {
    if (modalState) handleOpen();
  }, [btnClicked, modalState]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="expense-modal-title"
        aria-describedby="expense-modal-description"
      >
        <AddExpenseAccounts onSubmitSuccess={handleClose} />
      </Modal>
    </div>
  );
};

export default AddProfileExpensesModal;
