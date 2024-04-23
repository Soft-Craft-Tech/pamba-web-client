"use client";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { loginRequest } from "@/app/api/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

  const onSubmit: SubmitHandler<LoginFormInputs> = async ({
    username,
    password,
  }) => {
    try {
      await loginRequest(username, password, router);
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 lg:gap-3"
      >
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <input
              className="w-full h-14 rounded-md border border-borders px-2 py-1 lg:h-12"
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
              className="w-full h-14 rounded-md border border-borders px-2 py-1 lg:h-12"
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
          className="text-white bg-primary rounded-md py-3 font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}
