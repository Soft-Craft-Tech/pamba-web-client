import {
  setAcceptedTerms,
  setEmail,
  setPassword,
} from "@/store/createAccountSlice";
import { nextStep } from "@/store/signUpSlice";
import { RootState } from "@/store/store";
import FormField from "@/ui/FormField";
import { signUpSchema } from "@/utils/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import * as z from "zod";

type FormValues = z.infer<typeof signUpSchema>;

const CreateAccount = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(signUpSchema) });
  const dispatch = useDispatch();
  const { email, password, acceptedTerms } = useSelector(
    (state: RootState) => state.signUp
  );

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onSubmit = (data: any) => {
    dispatch(setEmail(data.email));
    dispatch(setAcceptedTerms(data.acceptedTerms));
    dispatch(setPassword(data.password));
    dispatch(nextStep());
  };

  return (
    <div className="w-full flex flex-col items-center gap-8 lg:gap-5 ">
      <h3 className="font-medium w-full text-lg text-center">Create Account</h3>
      <div className="flex gap-2 w-32 h-3 justify-center items-center text-accent font-semibold">
        <p>1</p>
        <div className="w-24 h-[3px] bg-blue-200 flex justify-start items-center text-center">
          <div className={`h-[3px] bg-accent w-1/2`}></div>
        </div>
        <p>2</p>
      </div>
      <form
        className="p-3 w-full flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-5 lg:gap-5">
          <FormField
            type="email"
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

          <div className="flex gap-2 flex-col">
            <div className="flex w-full h-10 items-center gap-x-2">
              <input
                id="termsandconditions"
                type="checkbox"
                {...register("acceptedTerms")}
                defaultChecked={acceptedTerms}
              />
              <span className="text-xs flex flex-wrap gap-x-1 font-normal sm:font-medium sm:text-sm sm:gap-x-2">
                Accept
                <Link
                  className="text-accent font-semibold hover:underline"
                  href="/terms-and-conditions"
                >
                  Terms and Conditions
                </Link>
                and
                <Link
                  className="text-accent font-semibold hover:underline"
                  href="/privacy-policy"
                >
                  Privacy Policy
                </Link>
              </span>
            </div>
            {errors.acceptedTerms && (
              <span className="bg-red-100 text-red-700 p-4 rounded-lg w-full">
                {errors.acceptedTerms.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex h-auto w-full">
          <button
            className="bg-primary flex justify-center items-center w-full h-10 py-4 rounded-md text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed duration-75 delay-75 hover:bg-primaryHover"
            type="submit"
          >
            Next
          </button>
        </div>
      </form>
      <div className="flex w-full h-6 gap-2 items-center justify-center">
        <p className="text-muted text-sm">Already have an account? </p>
        <Link
          className="text-accent font-bold text-sm hover:underline"
          href="/login"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default CreateAccount;
