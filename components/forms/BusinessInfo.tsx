import React from "react";
import Image from "next/image";
import { useAppDispatch } from "@/hooks";
import { prevStep } from "@/store/signUpSlice";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useSignUpMutation } from "@/app/api/auth";
import { useRouter } from "next/navigation";

const BusinessInfo = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    signUp: { email, password, acceptedTerms },
  } = useSelector((state: RootState) => state);
  const { mutateAsync, isLoading, isSuccess } = useSignUpMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const businessData = {
      email,
      password,
      acceptedTerms,
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      phone: formData.get("phone") as string,
      city: formData.get("city") as string,
      mapUrl: formData.get("mapUrl") as string,
      location: formData.get("location") as string,
    };
    try {
      await mutateAsync(businessData);
    } catch (error) {}
  };

  if (isSuccess) {
    setTimeout(() => {
      router.push("/login");
    }, 1000);
  }

  return (
    <div className="w-full flex flex-col items-center gap-8 lg:gap-5 ">
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
      <form onSubmit={handleSubmit} className="p-3 w-full flex flex-col gap-4">
        <div className="flex flex-col gap-5 lg:gap-4">
          <>
            <input
              className="border w-full h-14 py-1 px-2 lg:h-12"
              type="text"
              name="name"
              required
              placeholder="Business Name"
            />
            <select
              className="text-gray-400 border w-full h-14 py-1 px-2  lg:h-12"
              name="category"
              required
            >
              <option value="">Business Category</option>
              <option value="Salon">Salon</option>
              <option value="SPA">Spa</option>
              <option value="Barbershop">Barbershop</option>
            </select>
            <input
              className="border w-full h-14 py-1 px-2  lg:h-12"
              type="text"
              name="phone"
              required
              placeholder="Phone Number"
            />
            <input
              className="border w-full h-14 py-1 px-2  lg:h-12"
              type="text"
              name="city"
              required
              placeholder="City"
            />
            <input
              className="border w-full h-14 py-1 px-2  lg:h-12"
              type="url"
              name="mapUrl"
              required
              placeholder="Map URL"
            />
            <textarea
              className="border w-full h-14 py-1 px-2 resize-none rows-2  lg:h-12"
              name="location"
              required
              placeholder="Describe location"
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
          >
            {isLoading ? "Submitting" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BusinessInfo;
