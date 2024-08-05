"use client";
import { useLoginUser } from "@/app/api/auth";
import FormField from "@/ui/FormField";
import { loginSchema } from "@/utils/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import * as z from "zod";

type FormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  });
  const router = useRouter();

  const { mutateAsync, isPending } = useLoginUser();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onSubmit: SubmitHandler<FormValues> = async (FormData) => {
    await mutateAsync(FormData);
    router.push("/user/dashboard");
  };

  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 lg:gap-5"
      >
        <FormField
          type="text"
          placeholder="Email"
          name="email"
          error={errors.email}
          register={register}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <FormControl
              variant="outlined"
              error={errors.password !== undefined}
            >
              <InputLabel htmlFor="outlined-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                value={value}
                onChange={onChange}
              />
            </FormControl>
          )}
        />
        {errors.password && (
          <span className="bg-red-100 text-red-700 p-4 rounded-lg w-full">
            {errors.password.message}
          </span>
        )}
        <div className="flex justify-end">
          <Link
            href="/request-password-reset"
            className="text-sm font-bold text-accent duration-75 delay-75 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="text-white bg-primary rounded-md py-3 font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed delay-75 duration-75 hover:bg-primaryHover"
        >
          {isPending ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}
