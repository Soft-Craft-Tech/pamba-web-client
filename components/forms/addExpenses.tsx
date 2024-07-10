"use client";
import { useGetProfileCompletionStatus } from "@/app/api/businesses";
import Modal from "@mui/material/Modal";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import AddExpenseAccounts from "../features/profileCompletion/addExpenseAccounts";

const AddProfileExpensesModal = ({ modalState }: { modalState?: boolean }) => {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { data } = useGetProfileCompletionStatus();

  useEffect(() => {
    if (
      (!data?.expenseAccounts && pathname === "/user/dashboard") ||
      (!data?.expenseAccounts && pathname === "/user/expenses")
    ) {
      handleOpen();
    }
  }, [pathname, data]);

  useEffect(() => {
    if (modalState) handleOpen();
  }, [modalState]);

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
