"use client";
import ArrowBack from "@/ui/icons/arrow-back";
import { useRouter } from "next/navigation";
import React from "react";

const BackArrow = () => {
  const router = useRouter();
  return (
    <div
      className="flex flex-row gap-x-3 cursor-pointer mb-4 px-4"
      onClick={() => router.back()}
    >
      <div>
        <ArrowBack />
      </div>
      <p>Back</p>
    </div>
  );
};

export default BackArrow;
