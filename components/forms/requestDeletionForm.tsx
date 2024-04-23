"use client";
import { TextField } from "@mui/material";
import Toast from "../shared/toasts/genToast";
import { useState } from "react";

export default function RequestDeletionForm() {
  const [formData, setFormData] = useState({
    email: "",
    reason: "",
  });

  //   const { postFn, requestError, requestPending, responseData, requestSuccess } =
  //     usePostRequest(
  //       `${process.env.NEXT_PUBLIC_BASE_URL}/clients/delete-account`,
  //       formData,
  //       false,
  //       null,
  //       null
  //     );

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // postFn();
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      {/* {requestSuccess && (
        <Toast message={responseData?.message} type="success" />
      )}
      {requestError && (
        <Toast
          message={
            [401, 400, 403, 404, 409].includes(requestError?.response?.status)
              ? requestError?.response?.data?.message
              : "Something went wrong"
          }
          type="error"
        />
      )} */}
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
        // disabled={requestPending}
        className="bg-secondary text-white w-max px-10 py-3 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Submit
        {/* {requestPending ? "Loading" : "Submit"} */}
      </button>
    </form>
  );
}
