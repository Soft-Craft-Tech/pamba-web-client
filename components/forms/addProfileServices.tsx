import { Controller, useForm } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { setQueuedServices, setService } from "@/store/completeProfileSlice";
import { RootState } from "@/store/store";
import LabelledFormField from "@/ui/LabelledFormField";
import { serviceSchema } from "@/utils/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CldUploadWidget } from "next-cloudinary";
import React from "react";
import * as z from "zod";

type FormValues = z.infer<typeof serviceSchema>;

export default function AddProfileServicesForm({ data }: { data: any }) {
  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(serviceSchema),
  });
  const dispatch = useAppDispatch();
  const { queuedServices } = useAppSelector(
    (state: RootState) => state.completeProfile
  );

  const [newImage, setImage] = React.useState(null);

  const onSubmit = (formData: any) => {
    const exists = queuedServices.some(
      (item: { name: any }) => item.name === formData.name
    );
    if (!exists) {
      dispatch(setQueuedServices([...queuedServices, formData]));
    }
    dispatch(
      setService({
        category: "",
        price: "",
        description: "",
        estimatedTime: "",
        name: "",
        imageURL: "",
      })
    );
    setImage(null);
    reset();
  };

  return (
    <div className="flex flex-col gap-5 w-full p-5 border bg-white shadow-sm lg:p-10 lg:min-w-96">
      <h3>What Services do you offer?</h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 p-1"
      >
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <select
              {...field}
              className="text-gray-400 rounded-md border border-gray-400 w-full h-14 py-1 px-2 lg:h-14"
            >
              <option value="1">Select Category</option>
              {data?.categories?.map(
                ({ category, id }: { category: string; id: number }) => (
                  <option key={id} value={id}>
                    {category}
                  </option>
                )
              )}
            </select>
          )}
          rules={{ required: true }}
        />

        <LabelledFormField
          type="text"
          placeholder="Service Name"
          name="name"
          register={register}
          error={errors.name}
        />

        <LabelledFormField
          type="text"
          placeholder="Description"
          name="description"
          register={register}
          error={errors.description}
        />

        <LabelledFormField
          type="text"
          placeholder="Estimated Service Duration (in hrs)"
          name="estimatedTime"
          register={register}
          error={errors.estimatedTime}
        />

        <LabelledFormField
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
        <button
          className="py-3 px-10 bg-secondary hover:scale-105 transition-all ease-in-out text-white h-max rounded-md"
          type="submit"
        >
          Add
        </button>
      </form>
    </div>
  );
}
