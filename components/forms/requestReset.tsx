"use client";
import { useRequestPasswordReset } from "@/app/api/auth";
import Button from "@/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import FormField from "@/ui/FormField";
import { useState } from "react";
import Toast from "../shared/toasts/authToast";

const requestResetSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
});

type FormValues = z.infer<typeof requestResetSchema>;

export default function RequestResetForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(requestResetSchema),
  });

  const {
    mutate: passwordReset,
    isPending,
    error,
    isSuccess,
  } = useRequestPasswordReset();

  const [toastMessage, setToastMessage] = useState("");

  const onSubmit = (formData: FormValues) => {
    passwordReset(formData.email, {
      onSuccess: () => {
        setToastMessage("Password reset email sent successfully");
        reset();
      },
      onError: (error: any) => {
        setToastMessage(error?.message || "Failed to send reset email");
      },
    });
  };

  return (
    <div className="flex flex-col gap-5 w-full p-5 border bg-white shadow-sm lg:p-10 lg:min-w-96">
      <h3 className="text-[#4F5253] text-lg">Request Password Reset</h3>
      
      {isSuccess && <Toast message={toastMessage} type="success" />}
      {error && <Toast message={toastMessage} type="error" />}
      
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
        type="email"
          placeholder="Email Address"
        name="email"
          register={register}
          error={errors.email}
      />
        
      <Button
        type="submit"
        variant="primary"
        disabled={isPending}
          className="w-full h-12"
      >
          {isPending ? "Sending..." : "Send Reset Email"}
      </Button>
    </form>
    </div>
  );
}
