/* eslint-disable @next/next/no-img-element */
"use client";
import { useGetAllServices } from "@/app/api/businesses";
import Button from "@/ui/button";
import PlusIcon from "@/ui/icons/plus-icon";
import { getUser } from "@/utils/auth";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import AddServicesForm from "../../forms/addServicesForm";
import Loader from "../../loader";
import { DynamicObject } from "../../types";

const AddServicesBox = () => {
  const { client } = getUser();
  const { data, isPending } = useGetAllServices(client?.slug);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (isPending) return <Loader />;

  return (
    <>
      <div className="flex justify-end w-full mt-0 sm:mt-6">
        <Button onClick={handleOpen} variant="primary">
          <PlusIcon />
          Add Services
        </Button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="service-modal-title"
        aria-describedby="service-modal-description"
      >
        <div className="flex items-center justify-center h-full">
          <AddServicesForm onSubmitSuccess={handleClose} />
        </div>
      </Modal>
      <div className="flex flex-col w-full h-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-4 gap-8 mt-6 w-full h-auto mx-auto lg:max-w-6xl">
          {data?.services?.map(
            (
              { service, price, service_image }: DynamicObject,
              index: number
            ) => (
              <div
                key={index}
                className="flex flex-col gap-4 mx-auto rounded-xl overflow-hidden shadow-md border border-stroke bg-white w-[346px] p-6"
              >
                <div className="h-auto w-full overflow-hidden">
                  <img
                    className="h-[242px] w-full object-cover rounded-lg"
                    src={service_image}
                    alt={service}
                  />
                </div>
                <div className="flex flex-col gap-y-3 font-bold">
                  <p>{service}</p>
                  <p className="text-lg">Ksh {price}</p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default AddServicesBox;
