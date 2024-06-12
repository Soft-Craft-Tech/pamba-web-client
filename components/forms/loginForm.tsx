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
import Image from "next/image";

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
  const { loginLoading } = useAppSelector((state: RootState) => state.loading);
  const dispatch = useAppDispatch();

  const [message, setMessage] = React.useState("");
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

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
        setTimeout(() => {
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
        className="flex flex-col gap-4 lg:gap-5"
      >
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <input
              className={`w-full h-14 rounded-md  border px-2 py-1 outline-none lg:h-12 xl:h-14 ${
                errors.username ? "border-red-500" : "border-borders"
              }`}
              type="text"
              {...field}
              placeholder="Email"
            />
          )}
          rules={{ required: true }}
        />
        {errors.username && (
          <span className="text-red-500 font-light text-xs">
            This field is required
          </span>
        )}
        <div
          className={`w-full h-14 relative rounded-md border lg:h-12 xl:h-14 ${
            errors.username ? "border-red-500" : "border-borders"
          }`}
        >
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <input
                className="h-full w-full  py-1 px-2 outline-none rounded-md"
                type={showPassword ? "text" : "password"}
                {...field}
                placeholder="Password"
              />
            )}
            rules={{ required: true }}
          />
          {errors.password && (
            <span className="text-red-500 font-light text-xs">
              This field is required
            </span>
          )}
          <div
            onClick={() => {
              setShowPassword(!showPassword);
            }}
            className="absolute flex items-center h-full w-max top-0 right-1 px-2 cursor-pointer hover:text-gray-300"
          >
            {showPassword ? (
              <Image
                src="/eye-open.png"
                alt="Toggle password visibility"
                width={24}
                height={24}
              />
            ) : (
              <Image
                src="/eye-closed.png"
                alt="Toggle password visibility"
                width={24}
                height={24}
              />
            )}
          </div>
        </div>
        <div className="flex justify-end">
          <Link
            href="/request-password-reset"
            className="text-sm font-bold text-accent duration-75 delay-75 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
        <button
          disabled={loginLoading}
          className="text-white bg-primary rounded-md py-3 font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed delay-75 duration-75 hover:bg-primaryHover"
          type="submit"
        >
          {loginLoading ? "Loading" : "Login"}
        </button>
      </form>
    </div>
  );
}
