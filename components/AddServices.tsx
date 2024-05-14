/* eslint-disable @next/next/no-img-element */
"use client";
import Button from "@/ui/button";
import PlusIcon from "@/ui/icons/plus-icon";
import * as React from "react";
import AddServices from "./features/profileCompletion/addServices";
import { useGetAllServices } from "@/app/api/requests";
import { DynamicObject } from "./types";
import Loader from "./loader";

const AddServicesBox = () => {
  const [services, setServices] = React.useState(false);
  const { data, isLoading } = useGetAllServices();

  if (isLoading) return <Loader />;
  return (
    <div className="flex flex-col gap-5 w-full h-auto">
      <div className="flex justify-end w-full mt-6">
        <Button
          onClick={() => {
            setServices(!services);
          }}
          variant="primary"
        >
          {!services && <PlusIcon />}
          <p className="ml-3S">{services ? "Close" : "Add Services"}</p>
        </Button>
      </div>
      {services && <AddServices />}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 w-full h-auto">
        {data?.services?.map(
          (
            { service, price, service_image }: DynamicObject,
            index: React.Key | null | undefined
          ) => (
            <div
              key={index}
              className="flex flex-col gap-y-3 rounded-lg overflow-hidden shadow-md border  border-stroke bg-white w-72 h-72 "
            >
              <div className="h-2/3 w-full overflow-hidden">
                <img
                  className="h-full w-full object-cover"
                  src={service_image}
                  alt=""
                />
              </div>
              <div className="flex flex-col gap-y-1 px-3 py-1 h-1/3">
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
