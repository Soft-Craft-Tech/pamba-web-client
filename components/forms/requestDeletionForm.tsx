"use client";
import { useState } from "react";
import { useDeleteAccountMutation } from "@/app/api/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import FormField from "@/ui/FormField";
import Button from "@/ui/button";
import Toast from "../shared/toasts/authToast";

const deletionSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  reason: z.string().min(1, "Reason is required").min(10, "Please provide a detailed reason (at least 10 characters)"),
});

type FormValues = z.infer<typeof deletionSchema>;

export default function RequestDeletionForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(deletionSchema),
  });

  const {
    mutate: deleteAccount,
    isPending,
    error,
    isSuccess,
  } = useDeleteAccountMutation();

  const [toastMessage, setToastMessage] = useState("");

  const onSubmit = (formData: FormValues) => {
    deleteAccount(formData, {
      onSuccess: () => {
        setToastMessage("Account deletion request submitted successfully");
        reset();
      },
      onError: (error: any) => {
        setToastMessage(error?.message || "Failed to submit deletion request");
      },
    });
  };

  return (
    <div className="flex flex-col gap-5 w-full p-5 border bg-white shadow-sm lg:p-10 lg:min-w-96">
      <h3 className="text-[#4F5253] text-lg">Request Account Deletion</h3>
      
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
        
        <div className="flex flex-col gap-2">
          <textarea
            {...register("reason")}
            placeholder="Reason for leaving (minimum 10 characters)"
            className={`w-full p-3 border rounded-md resize-none ${
              errors.reason ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            rows={4}
          />
          {errors.reason && (
            <span className="text-red-500 text-sm">{errors.reason.message}</span>
          )}
        </div>
        
        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => reset()}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
        disabled={isPending}
            className="flex-1"
      >
            {isPending ? "Submitting..." : "Submit Request"}
          </Button>
        </div>
    </form>
    </div>
  );
}
