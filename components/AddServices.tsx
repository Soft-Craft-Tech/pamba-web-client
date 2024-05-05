/* eslint-disable @next/next/no-img-element */
"use client";
import Button from "@/ui/button";
import PlusIcon from "@/ui/icons/plus-icon";
import * as React from "react";
import AddServices from "./features/profileCompletion/addServices";
import { useGetAllServices } from "@/app/api/requests";
import { DynamicObject } from "./types";

const AddServicesBox = () => {
  const [services, setServices] = React.useState(false);
  const { data } = useGetAllServices();
  console.log(data?.services);
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
        {data?.services.map(
          (
            { service, price, service_image }: DynamicObject,
            index: React.Key | null | undefined
          ) => (
            <div
              key={index}
              className="flex flex-col gap-y-3 rounded-sm border border-stroke bg-white px-5 py-5 pt-7.5  sm:px-7.5"
            >
              <div className="h-[242px]">
                <img
                  className="h-full max-w-full rounded-lg object-cover"
                  src={service_image}
                  alt=""
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <h1 className="text-lg font-bold">{service}</h1>
                <h1 className="text-lg font-bold">Ksh {price}</h1>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AddServicesBox;
