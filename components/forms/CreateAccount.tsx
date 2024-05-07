import React from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { nextStep } from "@/store/signUpSlice";
import {
  setEmail,
  setPassword,
  setAcceptedTerms,
} from "@/store/createAccountSlice";
import { RootState } from "@/store/store";
import { DynamicObject } from "../types";

const CreateAccount = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DynamicObject>();
  const dispatch = useDispatch();
  const { email, password, acceptedTerms } = useSelector(
    (state: RootState) => state.signUp
  );

  const [showPassword, setShowPassword] = React.useState(false);

  const onSubmit = (data: any) => {
    dispatch(setEmail(data.email));
    dispatch(setAcceptedTerms(data.acceptedTerms));
    dispatch(setPassword(data.password));
    dispatch(nextStep());
  };

  return (
    <div className="w-full flex flex-col items-center gap-8 lg:gap-5 ">
      <h3 className="font-medium w-full text-lg text-center">Create Account</h3>
      <div className="flex gap-2 w-32 h-3 justify-center items-center text-blue-500 font-semibold">
        <p>1</p>
        <div className="w-24 h-[3px] bg-blue-200 flex justify-start items-center text-center">
          <div className={`h-[3px] bg-blue-600 w-1/2`}></div>
        </div>
        <p>2</p>
      </div>
      <form
        className="p-3 w-full flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-5 lg:gap-4">
          <input
            className="border w-full h-14 py-1 px-2  lg:h-12"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: /^\S+@\S+$/i,
            })}
            defaultValue={email}
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500 text-xs">Email is a required field</p>
          )}
          <div className="border w-full h-14 flex relative  lg:h-12">
            <input
              className="h-full w-full  py-1 px-2"
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: 6,
              })}
              defaultValue={password}
              placeholder="Password"
            />
            <div
              onClick={() => {
                setShowPassword(!showPassword);
              }}
              className="absolute flex items-center  h-full w-max right-0 px-2 hover:text-gray-300"
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
          {errors.password && (
            <p className="text-red-500 text-xs">Password is a required field</p>
          )}
          <div className="flex gap-4 w-full h-10 items-center">
            <div>
              <div className="flex w-full h-10 items-center gap-x-2">
                <input
                  className="h-5 w-5"
                  type="checkbox"
                  {...register("acceptedTerms", {
                    required: "Please accept terms and conditions",
                  })}
                  defaultChecked={acceptedTerms}
                />
                <span className="text-sm flex gap-2">
                  Accept
                  <Link href="/terms-and-conditions">Terms and Conditions</Link>
                  and
                  <Link href="/privacy-policy">Privacy Policy</Link>
                </span>
              </div>
              {errors.acceptedTerms && (
                <p className="text-red-500 text-xs">
                  Please accept terms and conditions
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex h-auto w-full">
          <button
            className="bg-primary w-full h-full py-4 rounded-md text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
          >
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAccount;
