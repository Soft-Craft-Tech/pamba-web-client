"use client";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { loginRequest } from "@/app/api/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { RootState } from "@/store/store";
import { toggleLoading } from "@/store/loadingSlice";
import Toast from "../shared/toasts/authToast";
import React from "react";
import { setShowToast } from "@/store/toastSlice";
import { AxiosError } from "axios";

type LoginFormInputs = {
  username: string;
  password: string;
};

export default function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const router = useRouter();
  const {
    loading: { loginLoading },
  } = useAppSelector((state: RootState) => state);
  const dispatch = useAppDispatch();

  const [message, setMessage] = React.useState("");
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const onSubmit: SubmitHandler<LoginFormInputs> = async ({
    username,
    password,
  }) => {
    dispatch(toggleLoading("loginLoading"));
    try {
      const { data, error } = await loginRequest(username, password, router);
      setMessage(data?.message);
      dispatch(toggleLoading("loginLoading"));

      if (!error) {
        dispatch(setShowToast(true));
      }

      if (error instanceof AxiosError) {
        setErrorMessage(error?.response?.data.message);
        setError(true);
        dispatch(setShowToast(true));
        setTimeout(()=> {
          setErrorMessage("");
          setError(false);
        }, 7000);
      }
    } catch (error) {
      dispatch(toggleLoading("loginLoading"));
    }
  };

  return (
    <div className="relative">
      {message !== " " && <Toast message={message} type="success" />}
      {error && <Toast message={errorMessage} type="error" />}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 lg:gap-3"
      >
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <input
              className="w-full h-14 rounded-md border border-borders px-2 py-1 lg:h-12 xl:h-14"
              type="text"
              {...field}
              placeholder="Email"
            />
          )}
          rules={{ required: true }}
        />
        {errors.username && <span>This field is required</span>}
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <input
              className="w-full h-14 rounded-md border border-borders px-2 py-1 lg:h-12 xl:h-14"
              type="password"
              {...field}
              placeholder="Password"
            />
          )}
          rules={{ required: true }}
        />
        {errors.password && <span>This field is required</span>}
        <div className="flex justify-end">
          <Link
            href="/request-password-reset"
            className="text-xs font-bold text-cyan-600"
          >
            Forgot Password?
          </Link>
        </div>
        <button
          disabled={loginLoading}
          className="text-white bg-primary rounded-md py-3 font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
        >
          {loginLoading ? "Loading" : "Login"}
        </button>
      </form>
    </div>
  );
}
