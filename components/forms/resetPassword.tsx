"use client";
import { useRef } from "react";
import Toast from "../shared/toasts/authToast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setShowToast } from "@/store/toastSlice";
import { useResetPasswordMutation } from "@/app/api/auth";
import { RootState } from "@/store/store";

export default function PasswordResetForm({ token }: { token: string }) {
  const {
    toast: { toastMessage },
  } = useAppSelector((state: RootState) => state);
  const [showPassword, setShowPassword] = React.useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    mutate: resetPassword,
    isLoading,
    error,
    isSuccess,
  } = useResetPasswordMutation(token);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    resetPassword(passwordRef?.current?.value);
  };

  if (isSuccess) {
    setTimeout(() => {
      router.push("/login");
    }, 3000);
  }

  return (
    <>
      {error && <Toast message={toastMessage} type="error" />}
      {isSuccess && <Toast message={toastMessage} type="success" />}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="w-full h-10 rounded-md border border-borders relative">
          <div className="absolute flex items-center  h-full w-max right-0 px-2 hover:text-gray-300">
            {!showPassword ? (
              <Image
                onClick={() => {
                  setShowPassword((prev) => !prev);
                }}
                className="w-[20px] cursor-pointer"
                src="/eye-open.png"
                alt="hide password"
                width={24}
                height={24}
              />
            ) : (
              <Image
                onClick={() => {
                  setShowPassword((prev) => !prev);
                }}
                className="w-[20px] cursor-pointer"
                src="/eye-closed.png"
                alt="show password"
                width={24}
                height={24}
              />
            )}
          </div>
          <input
            ref={passwordRef}
            className="h-full w-full px-2 py-1"
            type={showPassword ? "text" : "password"}
            required
            name="password"
            placeholder="Password"
          />
        </div>
        <button
          disabled={isLoading}
          type="submit"
          className="bg-primary text-white w-full h-10 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
    </>
  );
}
