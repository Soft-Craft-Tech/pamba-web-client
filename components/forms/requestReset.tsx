"use client";
import { useRequestPasswordReset } from "@/app/api/auth";
import Button from "@/ui/button";
import { useRef } from "react";

export default function RequestResetForm() {
  const emailRef = useRef<HTMLInputElement>(null);

  const {
    mutate: passwordReset,
    isPending,
  } = useRequestPasswordReset();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    passwordReset(emailRef?.current?.value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        ref={emailRef}
        type="email"
        required
        name="email"
        placeholder="Email"
        className="w-full h-10 border rounded-md py-1 px-2"
      />
      <Button
        type="submit"
        variant="primary"
        disabled={isPending}
        className="bg-primary text-white w-full h-10 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed duration-100 delay-75 hover:bg-primaryHover "
      >
        {isPending ? "Loading..." : "Submit"}
      </Button>
    </form>
  );
}
