"use client";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { setMessage, setShowToast } from "@/store/toastSlice";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useChangePassword } from "@/app/api/auth";
import Toast from "@/components/shared/toasts/authToast";
import { RootState } from "@/store/store";
import { logoutUser } from "@/utils/auth";
import { useRouter } from "next/navigation";

interface CustomError extends Error {
  response?: {
    data: {
      message: string;
    };
  };
}

export default function ChangePassword() {
  const dispatch = useAppDispatch();
  const {
    toast: { toastMessage },
  } = useAppSelector((state: RootState) => state);

  const router = useRouter();

  const { mutateAsync, isLoading, isSuccess, isError } = useChangePassword();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    try {
      await mutateAsync(data);
      dispatch(setShowToast(true));
    } catch (error) {
      const customError = error as CustomError;
      dispatch(setMessage(customError?.response?.data?.message));
      dispatch(setShowToast(true));
    }
  };

  if (isSuccess) {
    logoutUser();
    router.push("/login");
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      {isError && <Toast message={toastMessage} type="error" />}
      {isSuccess && <Toast message={toastMessage} type="success" />}
      <TextField
        required
        id="oldpassword"
        label="Old Password"
        type="password"
        {...register("oldPassword", { required: true })}
      />
      <TextField
        required
        id="newpassword"
        label="New Password"
        type="password"
        {...register("newPassword", { required: true })}
      />
      <TextField
        required
        id="confirmpassword"
        label="Confirm Password"
        type="password"
        {...register("confirmPassword", { required: true })}
      />
      <button
        type="submit"
        disabled={isLoading}
        className="w-max py-2 px-5 bg-primary text-white font-semibold rounded-md disabled:cursor-not-allowed disabled:bg-opacity-20"
      >
        {isLoading ? "Submitting" : "Save Changes"}
      </button>
    </form>
  );
}
