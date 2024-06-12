"use client";
import { useRef } from "react";
import Toast from "../shared/toasts/authToast";
import { useAppSelector } from "@/hooks";
import { useRequestPasswordReset } from "@/app/api/auth";
import { RootState } from "@/store/store";

export default function RequestResetForm() {
  const emailRef = useRef<HTMLInputElement>(null);
  const {
    toast: { toastMessage },
  } = useAppSelector((state: RootState) => state);
  const {
    mutate: passwordReset,
    isLoading,
    error,
    isSuccess,
  } = useRequestPasswordReset();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    passwordReset(emailRef?.current?.value);
  };

  return (
    <>
      {error && <Toast message={toastMessage} type="error" />}
      {isSuccess && <Toast message={toastMessage} type="success" />}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          ref={emailRef}
          type="email"
          required
          name="email"
          placeholder="Email"
          className="w-full h-10 border rounded-md py-1 px-2"
        />
        <button
          disabled={isLoading}
          className="bg-primary text-white w-full h-10 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed duration-100 delay-75 hover:bg-primaryHover "
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
    </>
  );
}
