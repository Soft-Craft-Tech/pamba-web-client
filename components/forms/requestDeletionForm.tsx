"use client";
import { TextField } from "@mui/material";
import { useState } from "react";
import { useDeleteAccountMutation } from "@/app/api/auth";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Toast from "../shared/toasts/authToast";

export default function RequestDeletionForm() {
  const [formData, setFormData] = useState({
    email: "",
    reason: "",
  });
  const {
    mutate: deleteAccount,
    isLoading,
    error,
    isSuccess,
  } = useDeleteAccountMutation();

  const {
    toast: { toastMessage },
  } = useSelector((state: RootState) => state);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    deleteAccount(formData);
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      {isSuccess && <Toast message={toastMessage} type="success" />}
      {error && <Toast message={toastMessage} type="error" />}
      <TextField
        value={formData.email}
        onChange={handleChange}
        required
        id="email"
        label="Email"
        type="email"
        name="email"
      />
      <TextField
        value={formData.reason}
        onChange={handleChange}
        required
        id="reason"
        label="Reason For Leaving"
        type="text"
        name="reason"
        multiline
        rows={3}
      />
      <button
        disabled={isLoading}
        className="bg-secondary text-white w-max px-10 py-3 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Submit
        {isLoading ? "Loading" : "Submit"}
      </button>
    </form>
  );
}
