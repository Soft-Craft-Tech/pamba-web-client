"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const FloaterAppoitment = () => {
  const pathname = usePathname();
  if (pathname !== "/") {
    return null;
  }
  return (
    <div className="fixed bottom-[calc(4rem+1.6rem)] z-50 right-0 mr-4 bg-white p-8 rounded-xl border border-[#e5e7eb]">
      <p className="text-[16px] font-bold max-w-[316px]">
        Book your next Salon, Spa, Haircut, Makeup appointment with ease
      </p>
      <Link
        href="/booking/find-services"
        className="bg-primary flex items-center w-max py-2 px-4 mt-5 text-white font-medium rounded-full gap-2 sm:py-4 sm:px-8 lg:py-3 lg:px-5 z-10"
      >
        Book Appointment
        <Image
          className="border bg-white rounded-full"
          src="/arrow-right.svg"
          alt="arrow-icon"
          width={20}
          height={20}
        />
      </Link>
    </div>
  );
};

export default FloaterAppoitment;
