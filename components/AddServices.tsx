/* eslint-disable @next/next/no-img-element */
"use client";
import Button from "@/ui/button";
import PlusIcon from "@/ui/icons/plus-icon";
import * as React from "react";
import AddServices from "./features/profileCompletion/addServices";

const AddServicesBox = () => {
  const [services, setServices] = React.useState(false);
  return (
    <div>
      <div className="flex justify-end w-full mt-6">
        <Button
          onClick={() => {
            setServices(!services);
          }}
          variant="primary"
        >
          {!services && <PlusIcon />}
          <p className="ml-3S">{services ? "Close" : "Add Sercices"}</p>
        </Button>
      </div>
      {services && <AddServices />}
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

export default AddServicesBox;
