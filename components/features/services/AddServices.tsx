"use client";
import { useGetAllServices } from "@/app/api/businesses";
import AddServiceCard from "@/components/core/cards/addServiceCard";
import Button from "@/ui/button";
import PlusIcon from "@/ui/icons/plus-icon";
import { getUser } from "@/utils/auth";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import AddServicesForm from "../../forms/addServicesForm";
import Loader from "../../loader";

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
            ({
              id,
              service,
              description,
              service_category,
              category_name,
              estimated_service_time,
              price,
              service_image,
            }) => (
              <AddServiceCard
                key={id}
                serviceId={id}
                price={price}
                service={service}
                serviceImage={service_image}
                description={description}
                serviceCategory={category_name}
                serviceCategoryId={service_category}
                estimatedTime={estimated_service_time}
              />
            )
          )}
        </div>
      </div>
    </>
  );
};

export default AddServicesBox;
