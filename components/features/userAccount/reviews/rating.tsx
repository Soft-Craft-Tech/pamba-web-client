"use client";
import { useContext, useEffect } from "react";
import Image from "next/image";

export default function Rating() {
  //   const { setActivePage } = useContext(UserContext);

  //   useEffect(() => {
  //     setActivePage("Reviews");
  //   }, []);

  return (
    <div className="">
      <div className="flex flex-col gap-1">
        <div className="flex gap-5 h-auto items-center">
          <h1 className="font-extrabold text-5xl text-primary">4.5</h1>
          <Image
            src="/user-icons/star.svg"
            alt="Pamba"
            width={40}
            height={40}
          />
        </div>
        <h3 className="text-gray-400 text-sm">6 Reviews</h3>
      </div>
    </div>
  );
}
