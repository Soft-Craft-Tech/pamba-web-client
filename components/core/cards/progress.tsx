"use client";
import { useAppSelector } from "@/hooks";
import { RootState } from "@/store/store";
import { AiOutlineCheckCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { LuCircleDot } from "react-icons/lu";

export default function ProfileProgress() {
  const step = useAppSelector((state: RootState) => state.completeProfile.step);

  const stepDescriptions = [
    "Business Description",
    "Upload Profile Image",
    "Add Services",
    "Create Expense Accounts",
  ];
  return (
    <div className="flex flex-col gap-7 w-full h-auto bg-white p-5 rounded-md shadow-sm ">
      <div className="flex flex-col gap-1">
        <h3 className="text-primary text-3xl font-extrabold">
          Complete your Profile
        </h3>
        <p className="text-muted text-sm">
          Your profile is 60% complete, finish setting up to enjoy all pamba has
          to offer.
        </p>
      </div>
      <div className="">
        <div className="flex flex-col items-center">
          <div className="w-full mb-4">
            <div className="flex gap-5 relative whitespace-nowrap overflow-x-auto pb-5 lg:pb-0">
              {stepDescriptions.map((description, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center relative w-full pb-5 border-b-[2px] ${
                    step === index + 1
                      ? "border-primary"
                      : step < index + 1
                      ? "border-gray-300"
                      : "border-green-500"
                  }`}
                >
                  <div
                    className={`flex items-center justify-center border ${
                      step === index + 1
                        ? "bg-primary border-primary"
                        : step > index + 1
                        ? "bg-green-500 border-green-500"
                        : "bg-[#f89dc8] opacity-50"
                    } w-8 h-8 rounded-full`}
                  >
                    {step === index + 1 ? (
                      <LuCircleDot className="h-5 w-5 text-white" />
                    ) : step > index + 1 ? (
                      <AiOutlineCheckCircle className="h-5 w-5 text-white" />
                    ) : (
                      <AiOutlineMinusCircle className="h-5 w-5 text-[#DB1471]" />
                    )}
                  </div>
                  <span className="text-xs mt-1 text-muted md:text-sm">
                    {description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
