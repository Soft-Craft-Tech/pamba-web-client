/* eslint-disable @next/next/no-img-element */
import {
  useDeleteService,
  useGetServiceCategories,
  useUpdateService,
} from "@/app/api/services";
import Button from "@/ui/button";
import FormField from "@/ui/FormField";
import ReactSelectComponent from "@/ui/Select";
import { serviceSchema } from "@/utils/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "@mui/material/Modal";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
import * as z from "zod";

type FormValues = z.infer<typeof serviceSchema>;

const AddServiceCard = ({
  service,
  price,
  serviceImage,
  description,
  serviceCategory,
  estimatedTime,
  serviceId,
  serviceCategoryId,
}: {
  service: string;
  price: number;
  serviceImage: string;
  description: string;
  serviceCategory: string;
  serviceCategoryId: number;
  estimatedTime: number;
  serviceId: number;
}) => {
  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(serviceSchema),
  });

  const [openEditModal, setOpenEditModal] = useState(false);
  const handleOpenEditModal = () => setOpenEditModal(true);
  const handleCloseEditModal = () => setOpenEditModal(false);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const { data } = useGetServiceCategories();
  const { mutateAsync, isPending } = useUpdateService();
  const { mutateAsync: deleteService, isPending: deleteLoading } =
    useDeleteService();

  const [newImage, setImage] = useState<string | null>(null);

  const onSubmit = async (formData: FormValues) => {
    const { category, name, description, estimatedTime, price, imageURL } =
      formData;

    const data = {
      serviceId,
      name,
      description,
      category: category.value,
      price: Number(price),
      imageURL,
      estimatedTime,
    };
    await mutateAsync(data);

    setImage(null);
    reset();
    handleCloseEditModal();
  };

  return (
    <div className="flex flex-col gap-4 mx-auto rounded-xl overflow-hidden shadow-md border border-stroke bg-white w-[346px] p-6">
      <div className="h-auto w-full overflow-hidden">
        <img
          className="h-[242px] w-full object-cover rounded-lg"
          src={serviceImage}
          alt={service}
        />
      </div>
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-y-4 font-bold">
          <p>{service}</p>
          <p className="text-lg">Ksh {price}</p>
        </div>
        <div className="flex justify-end gap-1">
          <button type="button" className="" onClick={handleOpenEditModal}>
            <FaEdit className="text-secondary text-2xl" />
          </button>
          <button type="button" className="" onClick={handleOpenDeleteModal}>
            <RiDeleteBin5Line className="text-red-500 text-2xl" />
          </button>
        </div>
      </div>

      {/* Edit modal */}
      <Modal
        open={openEditModal}
        onClose={handleCloseEditModal}
        aria-labelledby="service-modal-title"
        aria-describedby="service-modal-description"
      >
        <div className="flex items-center justify-center h-full">
          <div className="flex items-center rounded-xl justify-center w-fit p-5 border bg-white shadow-sm lg:p-10 lg:min-w-96">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between w-full">
                <h3
                  className="text-[#4F5253] text-lg font-medium"
                  id="service-modal-title"
                >
                  Edit Service
                </h3>
                <Button onClick={handleCloseEditModal}>
                  <IoClose className="size-8" />
                </Button>
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-3 p-1 w-full"
              >
                <Controller
                  control={control}
                  name="category"
                  defaultValue={{
                    value: serviceCategoryId,
                    label: serviceCategory,
                  }}
                  render={({ field: { onChange, value } }) => (
                    <ReactSelectComponent
                      onChange={onChange}
                      options={
                        data &&
                        data.categories.map(
                          ({
                            category,
                            id,
                          }: {
                            category: string;
                            id: number;
                          }) => ({
                            value: id,
                            label: category,
                          })
                        )
                      }
                      placeholder="Select Service Category"
                      value={value}
                      closeMenuOnSelect={true}
                      error={errors.category}
                    />
                  )}
                />

                <FormField
                  type="text"
                  placeholder="Service Name"
                  name="name"
                  register={register}
                  error={errors.name}
                  defaultValue={service}
                />

                <FormField
                  type="text"
                  placeholder="Description"
                  name="description"
                  register={register}
                  error={errors.description}
                  defaultValue={description}
                />

                <FormField
                  type="text"
                  placeholder="Estimated Service Duration (in hrs)"
                  name="estimatedTime"
                  register={register}
                  error={errors.estimatedTime}
                  defaultValue={estimatedTime.toString()}
                />

                <FormField
                  type="text"
                  placeholder="Price"
                  name="price"
                  register={register}
                  error={errors.price}
                  defaultValue={price.toString()}
                />

                <div
                  className={`w-full h-16 flex items-center overflow-hidden p-1 rounded-md border border-dashed ${
                    newImage
                      ? "text-green-500 border-green-500"
                      : "text-primary border-primary"
                  }`}
                >
                  <Controller
                    name="imageURL"
                    control={control}
                    defaultValue={serviceImage}
                    render={({ field }) => (
                      <CldUploadWidget
                        onSuccess={(results: any) => {
                          setImage(results?.info?.secure_url);
                          field.onChange(results?.info?.secure_url);
                        }}
                        options={{
                          sources: [
                            "local",
                            "url",
                            "google_drive",
                            "dropbox",
                            "unsplash",
                          ],
                          multiple: false,
                          folder: "pamba-web",
                        }}
                        uploadPreset="pamba-africa-images"
                      >
                        {({ open }) => (
                          <button
                            type="button"
                            className={`font-light text-lg px-5 py-2 bg-white w-full h-full `}
                            onClick={() => open()}
                          >
                            {newImage
                              ? "Upload Successful"
                              : "Upload New Service Image"}
                          </button>
                        )}
                      </CldUploadWidget>
                    )}
                  />
                </div>
                {errors.imageURL && (
                  <span className="bg-red-100 text-red-700 p-4 rounded-lg">
                    {errors.imageURL.message}
                  </span>
                )}

                <div className="flex gap-8 ml-auto">
                  <Button
                    variant="outline"
                    onClick={() => {
                      reset();
                      setImage(null);
                      handleCloseEditModal();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" disabled={isPending}>
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>

      {/* Delete modal */}
      <Modal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        aria-labelledby="delete-service-modal-title"
        aria-describedby="delete-service-modal-description"
      >
        <div className="flex items-center justify-center h-full">
          <div className="flex items-center rounded-xl justify-center w-fit p-5 border bg-white shadow-sm lg:p-10 lg:min-w-96">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between w-full">
                <h3
                  className="text-[#4F5253] text-lg font-medium"
                  id="service-modal-title"
                >
                  Delete Service
                </h3>
                <Button onClick={handleCloseDeleteModal}>
                  <IoClose className="size-8" />
                </Button>
              </div>
              <form>
                <p>
                  Are you sure you want to delete <b>{service}</b>?
                </p>
                <div className="flex gap-4 mt-4 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => {
                      reset();
                      setImage(null);
                      handleCloseDeleteModal();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={deleteLoading}
                    onClick={() => deleteService(serviceId)}
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddServiceCard;
