import { Controller, useForm } from "react-hook-form";

import FormField from "@/ui/FormField";
import { serviceSchema } from "@/utils/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CldUploadWidget } from "next-cloudinary";
import React, { useState } from "react";
import * as z from "zod";
import ReactSelectComponent from "@/ui/Select";
import Button from "@/ui/button";

type FormValues = z.infer<typeof serviceSchema>;

interface Service {
  name: string;
  description: string;
  estimatedTime: string;
  price: string;
  category: string;
  imageURL: string;
}

export default function AddProfileServicesForm({ 
  data, 
  onSubmitSuccess 
}: { 
  data: any;
  onSubmitSuccess?: (services: Service[]) => void;
}) {
  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(serviceSchema),
  });

  const [queuedServices, setQueuedServices] = useState<Service[]>([]);
  const [newImage, setImage] = useState(null);

  const onSubmit = (formData: FormValues) => {
    const exists = queuedServices.some(
      (item: { name: any }) => item.name === formData.name
    );
    if (!exists) {
      const newService = {
            ...formData,
            description: formData.description ?? "",
            category: formData.category.value.toString(),
      };
      const updatedServices = [...queuedServices, newService];
      setQueuedServices(updatedServices);
      
      if (onSubmitSuccess) {
        onSubmitSuccess(updatedServices);
      }
    }
    setImage(null);
    reset();
  };

  return (
    <div className="flex flex-col gap-5 w-full p-5 border bg-white shadow-sm lg:p-10 lg:min-w-96">
      <div className="flex justify-between items-center">
        <h3 className="text-[#4F5253] text-lg">What Services do you offer?</h3>
        {queuedServices.length > 0 && (
          <span className="text-sm text-gray-500">
            {queuedServices.length} service(s) added
          </span>
        )}
      </div>
      
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 p-1"
      >
        <Controller
          control={control}
          name="category"
          render={({ field: { onChange, value } }) => (
            <ReactSelectComponent
              onChange={onChange}
              options={
                data &&
                data.categories.map(
                  ({ category, id }: { category: string; id: number }) => ({
                    value: id,
                    label: category,
                  })
                )
              }
              placeholder="Select Category"
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
        />

        <FormField
          type="text"
          placeholder="Description"
          name="description"
          register={register}
          error={errors.description}
        />

        <FormField
          type="text"
          placeholder="Estimated Service Duration (in hrs)"
          name="estimatedTime"
          register={register}
          error={errors.estimatedTime}
        />

        <FormField
          type="text"
          placeholder="Price"
          name="price"
          register={register}
          error={errors.price}
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
                    {newImage ? "Upload Successful" : "Upload service Image"}
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
        
        <Button
          type="submit"
          variant="primary"
          className="py-3 px-10 h-max"
        >
          Add Service
        </Button>
      </form>
      
      {queuedServices.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Added Services:</h4>
          <div className="space-y-2">
            {queuedServices.map((service, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">{service.name}</span>
                <span className="text-xs text-gray-500">${service.price}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
