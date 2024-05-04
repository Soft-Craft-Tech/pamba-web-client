import { Controller, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { setQueuedServices, setService } from "@/store/completeProfileSlice";
import { useAppSelector } from "@/hooks";
import { CldUploadWidget } from "next-cloudinary";
import React from "react";

export default function AddServicesForm({ data }: { data: any }) {
  const { register, handleSubmit, reset, control } = useForm();
  const dispatch = useDispatch();
  const service = useAppSelector((state: any) => state.completeProfile.service);
  const queuedServices = useSelector(
    (state: any) => state.completeProfile.queuedServices
  );

  const [newImage, setImage] = React.useState("");

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
    reset();
  };

  return (
    <div className="flex flex-col gap-5 w-full  p-5 border bg-white shadow-sm lg:p-10 lg:min-w-96">
      <h3>What Services do you offer?</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <FormControl fullWidth>
          <InputLabel id="service">Service Category</InputLabel>
          <Select
            {...register("category")}
            labelId="service"
            id="category"
            value={service.id}
            label="Service Category"
          >
            {data?.categories?.map((item: { id: number; category: string }) => (
              <MenuItem key={item.id} value={item.id}>
                {item.category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          {...register("name", { required: true })}
          id="service"
          label="Service Name"
          type="text"
        />
        <TextField
          {...register("description", { required: true })}
          id="description"
          label="Description"
          type="text"
        />

        <TextField
          {...register("estimatedTime", { required: true })}
          id="time"
          label="Estimated Service Duration (in hrs)"
          type="number"
        />
        <TextField
          {...register("price", { required: true })}
          id="price"
          label="Price"
          type="number"
        />
        <div className="w-full">
          <Controller
            name="imageURL"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <CldUploadWidget
                onSuccess={(results: any) => {
                  setImage(results?.info?.secure_url);
                  field.onChange(newImage);
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
                    className={`font-light text-lg px-5 py-2 rounded-md bg-white w-full h-40 border border-dashed ${
                      newImage
                        ? "text-green-500 border-green-500"
                        : "text-primary border-primary"
                    }`}
                    onClick={() => open()}
                  >
                    {newImage ? "Upload Successful" : "Upload service Image"}
                  </button>
                )}
              </CldUploadWidget>
            )}
          />
        </div>
        <button
          className="py-3 px-10 bg-secondary text-white h-max rounded-md"
          type="submit"
        >
          Add
        </button>
      </form>
    </div>
  );
}
