"use client";
import { useResetPasswordMutation } from "@/app/api/auth";
import Button from "@/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Toast from "../shared/toasts/authToast";

const resetPasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
})

type FormValues = z.infer<typeof resetPasswordSchema>;

export default function PasswordResetForm({ token }: { token: string }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const {
    mutate: resetPassword,
    isPending,
    error,
    isSuccess,
  } = useResetPasswordMutation(token);

  const onSubmit = (formData: FormValues) => {
    resetPassword(formData.password, {
      onSuccess: () => {
        setToastMessage("Password reset successfully");
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      },
      onError: (error: any) => {
        setToastMessage(error?.message || "Failed to reset password");
      },
    });
  };

  return (
    <div className="flex flex-col gap-5 w-full p-5 border bg-white shadow-sm lg:p-10 lg:min-w-96">
      <h3 className="text-[#4F5253] text-lg">Reset Password</h3>
      
      {error && <Toast message={toastMessage} type="error" />}
      {isSuccess && <Toast message={toastMessage} type="success" />}
      
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="relative">
          <input
            {...register("password")}
            className={`w-full h-12 px-4 pr-12 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Image
              onClick={() => setShowPassword(!showPassword)}
              className="w-5 h-5 cursor-pointer"
              src={showPassword ? "/eye-closed.png" : "/eye-open.png"}
              alt={showPassword ? "hide password" : "show password"}
              width={20}
              height={20}
            />
          </div>
        </div>
        {errors.password && (
          <span className="text-red-500 text-sm">{errors.password.message}</span>
        )}
        
        <Button
          type="submit"
          variant="primary"
          disabled={isPending}
          className="w-full h-12"
        >
          {isPending ? "Resetting..." : "Reset Password"}
        </Button>
      </form>
    </div>
  );
}
