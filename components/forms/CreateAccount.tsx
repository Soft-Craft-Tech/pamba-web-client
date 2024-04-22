import React from "react";
import Image from "next/image";
import Link from "next/link";

const CreateAccount = () => {
  const showPassword = true;
  return (
    <div className="w-full flex flex-col items-center gap-8 lg:gap-5 ">
      <h3 className="font-medium w-full text-lg text-center">Create Account</h3>
      <div className="flex gap-2 w-32 h-3 justify-center items-center text-blue-500 font-semibold">
        <p>1</p>
        <div className="w-24 h-[3px] bg-blue-200 flex justify-start items-center text-center">
          <div className={`h-[3px] bg-blue-600  "w-1/2"}`}></div>
        </div>
        <p>2</p>
      </div>
      <form className="p-3 w-full flex flex-col gap-4">
        <div className="flex flex-col gap-5 lg:gap-4">
          <>
            <input
              className="border w-full h-14 py-1 px-2  lg:h-12"
              type="email"
              name="email"
              required
              placeholder="Email"
            />
            <div className="border w-full h-14 flex relative  lg:h-12">
              <div className="absolute flex items-center  h-full w-max right-0 px-2 hover:text-gray-300">
                {!showPassword ? (
                  <Image
                    className="w-[20px] cursor-pointer"
                    src="/eye-open.png"
                    alt="hide password"
                    width={24}
                    height={24}
                  />
                ) : (
                  <Image
                    className="w-[20px] cursor-pointer"
                    src="/eye-closed.png"
                    alt="show password"
                    width={24}
                    height={24}
                  />
                )}
              </div>
              <input
                className="h-full w-full  py-1 px-2"
                name="password"
                required
                placeholder="Password"
              />
            </div>
            <div className="flex gap-4 w-full h-10 items-center">
              <input
                className="w-6 h-6 form-checkbox"
                type="checkbox"
                name="acceptedTerms"
                required
              />
              <span className="text-sm">
                Accept
                <Link className="text-blue-500" href="/privacy-policy">
                  {" "}
                  Terms and Conditions{" "}
                </Link>
                and
                <Link className="text-blue-500" href="/privacy-policy">
                  {" "}
                  Privacy Policy
                </Link>
              </span>
            </div>
          </>
          ,
        </div>
        <div className="flex h-auto w-full">
          <button
            type="submit"
            className="bg-primary w-full h-full py-4 rounded-md text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAccount;
