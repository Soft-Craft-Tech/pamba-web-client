"use client";
import Link from "next/link";
import Image from "next/image";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RxCaretDown, RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";

export default function Header({ page }: { page: string }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [toggleServices, setToggleServices] = useState(false);
  const [navExpanded, setNavExpanded] = useState(false);
  const router = useRouter();
  const cookies = new Cookies();
  const token = cookies.get("token");
  const username = cookies.get("username");

  // LogOut User
  const logOut = () => {
    setIsLoggedIn(false);
    cookies.remove("token", { path: "/", sameSite: "none", secure: true });
    cookies.remove("username", { path: "/", sameSite: "none", secure: true });
    router.push("/");
  };

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn, token]);

  return (
    <header className="fixed top-0 left-0 w-full h-20 flex items-center justify-center border-b-[0.5px] border-borders z-20">
      <div className="relative border shadow-sm w-full h-full flex justify-between items-center font-medium text-gray-800 text-base bg-white z-30 px-5 sm:px-10 lg:px-20">
        <Link className="h-full w-auto" href="/">
          <Image
            className="h-full w-28 lg:w-40"
            src="/logo.svg"
            alt="pamba-logo"
            width={64}
            height={32}
            priority
          />
        </Link>
        <div
          className={`gap-16 lg:gap-0 flex-col flex bg-white lg:p-0 lg:flex-row lg:right-0 lg:top-0 lg:h-full lg:bg-dark-blue justify-between lg:w-2/3   ${
            navExpanded
              ? "absolute  h-auto py-10 px-5 sm:p-10 top-full -right-0 w-full"
              : "hidden lg:flex"
          }`}
        >
          <div className="h-full flex flex-col text-2xl gap-5  lg:flex-row lg:items-center lg:gap-10 lg:text-base font-semibold tracking-wide ">
            <Link
              className={`py-3 flex h-full items-center ${
                page === "home" ? "text-primary" : undefined
              }`}
              href="/"
            >
              Home
            </Link>
            <Link
              className={`py-3 flex h-full items-center ${
                page === "about" ? "text-primary" : undefined
              }`}
              href="/about"
            >
              About Us
            </Link>
            <div
              onClick={() => {
                setToggleServices((prev) => !prev);
              }}
              className={`relative py-3 flex justify-between h-full items-center lg:gap-1 lg:justify-normal ${
                ["reporting", "scheduling", "business"].includes(page)
                  ? "text-primary"
                  : undefined
              }`}
            >
              <p className="cursor-pointer">Services</p>
              <RxCaretDown size={22} />
              {toggleServices && (
                <div className="dropdown-nav absolute flex flex-col items-center px-2 py-4 gap-1 top-full left-0 w-full rounded-sm h-auto bg-white z-20 lg:w-48">
                  <Link
                    className={`text-sm font-light border-b w-full text-center py-2 lg:py-[5px] ${
                      page === "business" ? "text-primary" : "text-secondary"
                    }`}
                    href="/services/business-management"
                  >
                    Business Management
                  </Link>
                  <Link
                    className={`text-sm font-light border-b w-full text-center py-2 lg:py-[5px] ${
                      page === "scheduling" ? "text-primary" : "text-secondary"
                    }`}
                    href="/services/scheduling"
                  >
                    Appointment Scheduling
                  </Link>
                  <Link
                    className={`text-sm font-light border-b w-full text-center py-2 lg:py-[5px] ${
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
            {!isLoggedIn ? (
              <>
                <Link
                  className="border-[0.1px] border-primary text-primary px-5 py-2 rounded-lg lg:border-none lg:text-secondary"
                  href="/login"
                >
                  Login
                </Link>
                <Link
                  className="bg-primary text-white px-5 py-2 rounded-lg"
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
                  href={`/user/${username}/dashboard`}
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
