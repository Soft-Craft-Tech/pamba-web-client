"use client";

import { useSignUpMutation } from "@/app/api/auth";
import { useGetCategories } from "@/app/api/businesses";
import FormField from "@/ui/FormField";
import ReactSelectComponent from "@/ui/Select";
import Button from "@/ui/button";
import { fullSignUpSchema } from "@/utils/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { parsePhoneNumber } from "libphonenumber-js";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import * as z from "zod";
import { AutocompleteCustom } from "../maps/LocationSearch";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type FormValues = z.infer<typeof fullSignUpSchema>;

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(fullSignUpSchema) });

  const {
    mutateAsync,
    isPending,
    isSuccess,
    data: signUpData,
  } = useSignUpMutation();

  const { data } = useGetCategories();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(signUpData?.message);
      toast.warning("Please verify your email to continue", {
        autoClose: false,
        closeButton: true,
        closeOnClick: false,
      });
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    }
  }, [isSuccess, router, signUpData?.message]);

  const onSubmit = async (formData: FormValues) => {
    const { name, category, phone, location, email, password, acceptedTerms } =
      formData;

    const cityArea = location?.addressComponents.find(
      (component) =>
        component.types.includes("administrative_area_level_1") &&
        component.types.includes("political")
    );

    const formattedLocation = {
      formatted_address: location.formattedAddress,
      geometry: {
        location: location.location,
      },
      place_id: location.id,
    };

    const businessData = {
      email,
      password,
      acceptedTerms,
      name,
      category: category.value,
      phone: parsePhoneNumber(phone, "KE").number,
      location: formattedLocation,
      city: cityArea?.longText || "",
    };

    await mutateAsync(businessData);
  };

  const incompatibleVersionLoaded = Boolean(
    globalThis &&
      globalThis.google?.maps?.version &&
      !(
        globalThis.google?.maps?.version.endsWith("-alpha") ||
        globalThis.google?.maps?.version.endsWith("-beta")
      )
  );

  if (incompatibleVersionLoaded) {
    location.reload();
    return;
  }

  return (
    <>
      <div className="w-full flex flex-col items-center gap-8 lg:gap-5 ">
        <h3 className="font-medium w-full text-lg text-center">
          Create Account
        </h3>
        <form
          className="p-3 w-full flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-5 lg:gap-5">
            <FormField
              type="text"
              placeholder="Business Name"
              name="name"
              error={errors.name}
              register={register}
            />
            <FormField
              type="email"
              placeholder="Email"
              name="email"
              error={errors.email}
              register={register}
            />
          </div>

          <div className="flex flex-col gap-5 lg:gap-4">
            <Controller
              name="category"
              control={control}
              render={({ field: { onChange, value } }) => (
                <ReactSelectComponent
                  type="creatable"
                  isClearable
                  onChange={(selectedOption) => {
                    setValue(
                      "category",
                      selectedOption as { value: string; label: string }
                    );
                  }}
                  options={data?.categories?.map(
                    ({
                      category_name,
                      id,
                    }: {
                      category_name: string;
                      id: string;
                    }) => ({ value: String(id), label: category_name })
                  )}
                  placeholder="Business Category"
                  value={value}
                  closeMenuOnSelect={true}
                  error={errors.category}
                />
              )}
            />
            <FormField
              type="phone"
              placeholder="Phone Number"
              name="phone"
              error={errors.phone}
              register={register}
            />

            <Controller
              name="location"
              control={control}
              render={({ field: { onChange } }) => (
                <AutocompleteCustom onPlaceSelect={onChange} />
              )}
            />
            {errors.location && (
              <span className="bg-red-100 text-red-700 p-4 rounded-lg w-full">
                {errors.location.message}
              </span>
            )}

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
                          {showPassword ? (
                            <MdVisibilityOff />
                          ) : (
                            <MdVisibility />
                          )}
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
          </div>

          <div className="flex gap-2 flex-col">
            <div className="flex w-full h-10 items-center gap-x-2">
              <input
                id="termsandconditions"
                type="checkbox"
                {...register("acceptedTerms")}
                //   defaultChecked={acceptedTerms}
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

          <button
            type="submit"
            disabled={isPending}
            className="text-white bg-primary rounded-md py-3 font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed delay-75 duration-75 hover:bg-primaryHover"
          >
            {isPending ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>

      <div className="flex w-full h-6 gap-2 items-center justify-center">
        <p className="text-muted text-sm">Already have an account? </p>
        <Link
          className="text-accent font-bold text-sm hover:underline"
          href="/login"
        >
          Login
        </Link>
      </div>
    </>
  );
}
