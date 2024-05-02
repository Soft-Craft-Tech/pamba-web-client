"use client";
import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const FindServices: React.FC = () => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <div>
      <div className="mx-auto w-full max-w-screen-2xl">
        <nav>
          <div className="flex flex-wrap items-center justify-between mx-auto p-4">
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
            <button
              data-collapse-toggle="navbar-solid-bg"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-solid-bg"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
            <div
              className="hidden w-full md:block md:w-auto"
              id="navbar-solid-bg"
            >
              <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                <Link
                  className="py-3 flex h-full items-center text-primary"
                  href="/"
                >
                  Home
                </Link>
                <Link
                  className={`py-3 flex h-full items-center ${
                    pathname === "find-services" ? "text-primary" : undefined
                  }`}
                  href="/about"
                >
                  Services
                </Link>
                <Link
                  className="py-3 flex h-full items-center text-primary"
                  href="/about"
                >
                  Contact Us
                </Link>
                <Link
                  className="bg-primary flex items-center w-max py-2 px-4  text-white font-medium rounded-lg gap-2 sm:py-4 sm:px-8 lg:py-3 lg:px-5"
                  href="/login"
                >
                  Book Appointment
                </Link>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      <section className=" h-auto">
        <div className="grid bg-gradient-to-r from-secondary via-secondary to-transparent  h-[90vh]  mx-auto lg:gap-8 xl:gap-0  lg:grid-cols-2">
          <div className="mr-auto  px-16 place-self-center ">
            <p className="text-lg uppercase text-white">
              Hair Salon, Barber shop, spa, makeup
            </p>
            <h1 className="max-w-lg mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-primary ">
              Find a service close to you
            </h1>
            <p className="max-w-lg mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              There are many variation of passages are Ipsum available, majority
              have suffered alteration in some form.
            </p>
          </div>
          <div
            className="hidden lg:mt-0  lg:flex"
            style={{
              backgroundImage: "url('/findservice.svg')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          ></div>
        </div>
      </section>
    </div>
  );
};

export default FindServices;
