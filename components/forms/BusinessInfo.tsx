import React, { useEffect } from "react";
import Image from "next/image";
import { useAppDispatch } from "@/hooks";
import { prevStep } from "@/store/signUpSlice";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useSignUpMutation } from "@/app/api/auth";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import Toast from "../shared/toasts/authToast";
import { setMessage, setShowToast } from "@/store/toastSlice";
import { useGetCategories } from "@/app/api/requests";

interface CustomError extends Error {
  response?: {
    data: {
      message: string;
    };
  };
}

const BusinessInfo = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { control, handleSubmit } = useForm();
  const {
    signUp: { email, password, acceptedTerms },
    toast: { toastMessage },
  } = useSelector((state: RootState) => state);
  const { mutateAsync, isLoading, isSuccess, isError } = useSignUpMutation();

  const { data } = useGetCategories();

  console.log(data);

  const onSubmit = async (formData: any) => {
    const { name, category, phone, city, mapUrl, location } = formData;

    const categories = Array.isArray(category) ? category : [category];

    const businessData = {
      email,
      password,
      acceptedTerms,
      name,
      category: categories,
      phone,
      city,
      mapUrl,
      location,
    };

    try {
      await mutateAsync(businessData);
      dispatch(setShowToast(true));
    } catch (error) {
      const customError = error as CustomError;
      dispatch(setMessage(customError?.response?.data?.message));
      dispatch(setShowToast(true));
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    }
  }, [dispatch, isSuccess, router]);
  return (
    <div className="w-full flex flex-col items-center gap-8 lg:gap-5 ">
      {isError && <Toast message={toastMessage} type="error" />}
      {isSuccess && <Toast message={toastMessage} type="success" />}
      <h3 className="font-medium w-full text-lg text-center">
        Business Information
      </h3>
      <div className="flex gap-2 w-32 h-3 justify-center items-center text-blue-500 font-semibold">
        <p>1</p>
        <div className="w-24 h-[3px] bg-blue-200 flex justify-start items-center text-center">
          <div className={`h-[3px] bg-blue-600 w-full`}></div>
        </div>
        <p>2</p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-3 w-full flex flex-col gap-4"
      >
        <div className="flex flex-col gap-5 lg:gap-4">
          <>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  className="border w-full h-14 py-1 px-2 lg:h-12"
                  type="text"
                  placeholder="Business Name"
                />
              )}
              rules={{ required: true }}
            />

            <Controller
              name="category"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <select
                  {...field}
                  className="text-gray-400 border w-full h-14 py-1 px-2  lg:h-12"
                  name="Business Category"
                >
                  <option value="">Select Category</option>
                  {data?.categories?.map(
                    ({
                      category_name,
                      id,
                    }: {
                      category_name: string;
                      id: number;
                    }) => (
                      <option key={id} value={id}>
                        {category_name}
                      </option>
                    )
                  )}
                </select>
              )}
              rules={{ required: true }}
            />

            <Controller
              name="phone"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  className="border w-full h-14 py-1 px-2  lg:h-12"
                  type="text"
                  placeholder="Phone Number"
                />
              )}
              rules={{ required: true }}
            />

            <Controller
              name="city"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  className="border w-full h-14 py-1 px-2  lg:h-12"
                  type="text"
                  placeholder="City"
                />
              )}
              rules={{ required: true }}
            />

            <Controller
              name="mapUrl"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  className="border w-full h-14 py-1 px-2  lg:h-12"
                  type="url"
                  placeholder="Map URL"
                />
              )}
              rules={{ required: true }}
            />

            <Controller
              name="location"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <textarea
                  {...field}
                  className="border w-full h-14 py-1 px-2 resize-none rows-2  lg:h-12"
                  placeholder="Describe location"
                />
              )}
              rules={{ required: true }}
            />
          </>
        </div>
        <div className="flex h-auto w-full">
          <div
            onClick={() => {
              dispatch(prevStep());
            }}
            className="h-full w-full flex items-center py-2 text-primary gap-1 cursor-pointer"
          >
            <Image src="/arrow-left.svg" alt="" width={20} height={20} />
            <h2 className="text-sm font-semibold">Back</h2>
          </div>
          <button
            type="submit"
            className="bg-primary w-full h-full py-4 rounded-md text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "Submitting" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BusinessInfo;
