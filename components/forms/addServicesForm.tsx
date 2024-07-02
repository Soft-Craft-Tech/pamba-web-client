import { Controller, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { setQueuedServices, setService } from "@/store/completeProfileSlice";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { CldUploadWidget } from "next-cloudinary";
import React from "react";
import { RootState } from "@/store/store";

export default function AddServicesForm({ data }: { data: any }) {
  const { register, handleSubmit, reset, control } = useForm();
  const dispatch = useAppDispatch();
  const { queuedServices } = useAppSelector(
    (state: RootState) => state.completeProfile
  );

  const [newImage, setImage] = React.useState(null);

  const onSubmit = (formData: any) => {
    console.log("Form is being submitted");
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
        <FormControl fullWidth>
          <Controller
            name="category"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <select
                {...field}
                className="text-gray-400 rounded-md border border-gray-400 w-full h-14 py-1 px-2 lg:h-14"
                name=""
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
        </FormControl>
        <TextField
          {...register("name", { required: true })}
          id="service"
          label="Service Name"
          type="text"
          className="rounded-md"
        />
        <TextField
          {...register("description", { required: true })}
          id="description"
          label="Description"
          type="text"
          className="rounded-md"
        />

        <TextField
          {...register("estimatedTime", { required: true })}
          id="time"
          label="Estimated Service Duration (in hrs)"
          type="number"
          className="rounded-md"
        />
        <TextField
          {...register("price", { required: true })}
          id="price"
          label="Price"
          type="number"
          className="rounded-md"
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
        <p className="font-semibold text-sm text-primary">
          ** Service image is required**
        </p>
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
