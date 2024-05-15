import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { useUpdateProfile } from "@/app/api/auth";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setMessage, setShowToast } from "@/store/toastSlice";
import Toast from "@/components/shared/toasts/authToast";
import { RootState } from "@/store/store";

interface CustomError extends Error {
  response?: {
    data: {
      message: string;
    };
  };
}

export default function ProfileUpdateForm({ client }: any) {
  const {
    toast: { toastMessage },
  } = useAppSelector((state: RootState) => state);

  const { mutateAsync, isLoading, isSuccess, isError } = useUpdateProfile();

  const dispatch = useAppDispatch();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    try {
      await mutateAsync(data);
      dispatch(setShowToast(true));
    } catch (error) {
      const customError = error as CustomError;
      dispatch(setMessage(customError?.response?.data?.message));
      dispatch(setShowToast(true));
    }
  };

  return (
    <div className="w-full h-auto">
      {isError && <Toast message={toastMessage} type="error" />}
      {isSuccess && <Toast message={toastMessage} type="success" />}
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          required
          id="business_name"
          label="Business Name"
          type="text"
          {...register("name", { required: true })}
          defaultValue={client?.business_name}
        />
        <TextField
          required
          id="email"
          label="Email"
          type="text"
          {...register("email", { required: true })}
          defaultValue={client?.email}
        />
        <TextField
          required
          id="phone"
          label="Phone Number"
          type="text"
          {...register("phone", { required: true })}
          defaultValue={client?.phone}
        />
        <TextField
          required
          id="city"
          label="City"
          type="text"
          {...register("city", { required: true })}
          defaultValue={client?.city}
        />
        <TextField
          required
          id="location"
          label="Location"
          type="text"
          {...register("location", { required: true })}
          defaultValue={client?.location}
        />
        <TextField
          required
          id="mapUrl"
          label="Map Url"
          type="text"
          {...register("mapUrl", { required: true })}
          defaultValue={client?.google_map}
        />
        <TextField
          required
          id="description"
          label="Business Description"
          type="text"
          {...register("description", { required: true })}
          defaultValue={client?.description}
          multiline
          rows={3}
        />
        <TextField
          required
          id="password"
          label="Enter your Password"
          type="password"
          {...register("password", { required: true })}
        />
        <p>Enter password to confirm you are the one updating details here</p>
        <button
          type="submit"
          disabled={isLoading}
          className="w-max py-2 px-5 bg-primary text-white font-semibold rounded-md"
        >
          {isLoading ? "Saving" : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
