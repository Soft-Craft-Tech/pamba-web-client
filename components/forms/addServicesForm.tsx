import { useAssignService } from "@/app/api/businesses";
import { useGetServiceCategories } from "@/app/api/services";
import Button from "@/ui/button";
import LabelledFormField from "@/ui/LabelledFormField";
import SelectField from "@/ui/SelectField";
import { serviceSchema } from "@/utils/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { IoClose } from "react-icons/io5";

type FormValues = z.infer<typeof serviceSchema>;

export default function AddServicesForm({
  onSubmitSuccess,
}: {
  onSubmitSuccess: () => void;
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
  const { data } = useGetServiceCategories();
  const { mutateAsync, isPending } = useAssignService();

  const [newImage, setImage] = useState(null);

  const onSubmit = async (formData: FormValues) => {
    const data = [formData];
    await mutateAsync(data);

    setImage(null);
    reset();
    onSubmitSuccess();
  };

  return (
    <div className="flex flex-col gap-5 w-1/2 p-5 border bg-white shadow-sm lg:p-10 lg:min-w-96">
      <div className="flex justify-between">
        <h3 className="text-[#4F5253] text-lg" id="service-modal-title">
          What Services do you offer?
        </h3>
        <Button onClick={onSubmitSuccess}>
          <IoClose className="size-8" />
        </Button>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 p-1"
      >
        <SelectField
          placeholder="Select Category"
          name="category"
          error={errors.category}
          control={control}
          options={
            <>
              <option value="1">Select Category</option>
              {data?.categories?.map(
                ({ category, id }: { category: string; id: number }) => (
                  <option key={id} value={id}>
                    {category}
                  </option>
                )
              )}
            </>
          }
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
        <div className="flex gap-8 ml-auto">
          <Button
            variant="outline"
            onClick={() => {
              reset();
              setImage(null);
              onSubmitSuccess();
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
  );
}
