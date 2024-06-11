"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { RxCaretDown, RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import { isAuthenticated, logoutUser } from "@/utils/auth";

export default function Header({ page }: { page: string }) {
  const [toggleServices, setToggleServices] = useState(false);
  const [navExpanded, setNavExpanded] = useState(false);
  const router = useRouter();

  const logOut = () => {
    logoutUser();
    router.refresh();
  };

  return (
    <header className="fixed top-0 left-0 w-full h-20 flex items-center justify-center border-b-[0.5px] border-borders z-20">
      <div className="relative border shadow-sm w-full h-full flex justify-between items-center font-medium text-gray-800 text-base bg-white z-30 px-5 sm:px-10 lg:px-20">
        <Link className="h-full w-auto duration-200 delay-100 hover:scale-105" href="/">
          <Image
            className="h-full w-28 lg:w-40"
            src="/logo.svg"
            alt="pamba-logo"
            width={64}
            height={32}
            priority={true}
          />
        </Link>
        <div
          className={`gap-16 lg:gap-0 flex-col flex bg-white lg:p-0 lg:flex-row lg:right-0 lg:top-0 lg:h-full lg:bg-dark-blue justify-between lg:w-2/3   ${
            navExpanded
              ? "absolute  h-auto py-10 px-5 sm:p-10 top-full -right-0 w-full"
              : "hidden lg:flex"
          }`}
        >
          <div className="h-full flex flex-col text-2xl gap-5  lg:flex-row lg:items-center lg:gap-12 lg:text-base font-semibold tracking-wide ">
            <Link
              className={`flex h-full items-center hover:border-b-2 ${
                page === "home" ? "text-primary hover:border-primary" : "hover:text-gray-700 hover:border-secondary"
              }`}
              href="/"
            >
              Home
            </Link>
            <Link
              className={`flex h-full items-center hover:border-b-2  ${
                page === "about" ? "text-primary hover:border-primary" : "hover:text-gray-700 hover:border-secondary"
              }`}
              href="/about"
            >
              About Us
            </Link>
            <div
              onClick={() => {
                setToggleServices((prev) => !prev);
              }}
              className={`relative flex justify-between h-full items-center lg:gap-1 lg:justify-normal ${
                ["reporting", "scheduling", "business"].includes(page)
                  ? "text-primary"
                  : "hover:text-gray-700"
              }`}
            >
              <p className={
                `flex h-full items-center cursor-pointer hover:border-b-2 ${["reporting", "scheduling", "business"].includes(page) ? "text-primary hover:border-primary" : "hover:border-secondary hover:text-gray-700"}`}>
                  Services
              </p>
              <RxCaretDown size={22} />
              {toggleServices && (
                <div className="dropdown-nav absolute flex flex-col items-center px-2 py-4 gap-1 top-full left-0 w-full rounded-sm h-auto bg-white z-20 lg:w-48">
                  <Link
                    className={`text-sm font-light border-b w-full text-center py-2 delay-75 duration-75 hover:scale-105 lg:py-[5px] ${
                      page === "business" ? "text-primary" : "text-secondary"
                    }`}
                    href="/services/business-management"
                  >
                    Business Management
                  </Link>
                  <Link
                    className={`text-sm font-light border-b w-full text-center py-2 delay-75 duration-75 hover:scale-105 lg:py-[5px] ${
                      page === "scheduling" ? "text-primary" : "text-secondary"
                    }`}
                    href="/services/scheduling"
                  >
                    Appointment Scheduling
                  </Link>
                  <Link
                    className={`text-sm font-light border-b w-full text-center py-2 delay-75 duration-75 hover:scale-105 lg:py-[5px] ${
                      page === "reporting" ? "text-primary" : "text-secondary"
                    }`}
                    href="/services/reporting"
                  >
                    Reporting and Analytics
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="h-full items-center justify-between flex font-semibold sm:px-0 lg:gap-10 lg:justify-normal">
            {!isAuthenticated() ? (
              <>
                <Link
                  className="border-[0.1px] border-primary text-primary px-5 py-2 rounded-lg lg:border-none lg:text-secondary hover:underline"
                  href="/login"
                >
                  Login
                </Link>
                <Link
                  className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-primaryHover delay-75 duration-75"
                  href="/signup"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <button
                  className="border-[0.1px] border-primary text-primary px-5 py-2 rounded-lg lg:border-none lg:text-secondary"
                  type="button"
                  onClick={logOut}
                >
                  Logout
                </button>
                <Link
                  className="bg-primary text-white px-5 py-2 rounded-lg"
                  href={`/user/dashboard`}
                >
                  Dashboard
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="h-full flex items-center text-secondary lg:hidden">
          {navExpanded ? (
            <AiOutlineClose
              size={30}
              onClick={() => {
                setNavExpanded(false);
              }}
            />
          ) : (
            <RxHamburgerMenu
              size={30}
              onClick={() => {
                setNavExpanded(true);
              }}
            />
          )}
        </div>
      </div>
    </header>
  );
}
