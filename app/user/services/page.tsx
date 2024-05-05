/* eslint-disable @next/next/no-img-element */
import ServicesCharts from "@/components/charts/services-card";
import Button from "@/ui/button";
import PlusIcon from "@/ui/icons/plus-icon";
import React from "react";

const Page = () => {
  return (
    <div>
      <ServicesCharts />
      <div className="flex justify-end w-full mt-6">
        <Button variant="primary">
          <PlusIcon />
          <p className="ml-3S">Add Sercices</p>
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        <div className="flex flex-col gap-y-3 rounded-sm border border-stroke bg-white px-5 py-5 pt-7.5  sm:px-7.5">
          <img
            className="h-auto max-w-full rounded-lg"
            src="/braidsImage.svg"
            alt=""
          />
          <div className="flex flex-col gap-y-2">
            <h1 className="text-lg font-bold">Braids</h1>
            <h1 className="text-lg font-bold">Ksh 1500</h1>
          </div>
        </div>
        <div className="flex flex-col gap-y-3 rounded-sm border border-stroke bg-white px-5 py-5 pt-7.5  sm:px-7.5">
          <img
            className="h-auto max-w-full rounded-lg"
            src="/braidsImage.svg"
            alt=""
          />
          <div className="flex flex-col gap-y-2">
            <h1 className="text-lg font-bold">Braids</h1>
            <h1 className="text-lg font-bold">Ksh 1500</h1>
          </div>
        </div>
        <div className="flex flex-col gap-y-3 rounded-sm border border-stroke bg-white px-5 py-5 pt-7.5  sm:px-7.5">
          <img
            className="h-auto max-w-full rounded-lg"
            src="/braidsImage.svg"
            alt=""
          />
          <div className="flex flex-col gap-y-2">
            <h1 className="text-lg font-bold">Braids</h1>
            <h1 className="text-lg font-bold">Ksh 1500</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
