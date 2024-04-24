"use client";
import ProfileProgress from "../../core/cards/progress";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { RootState } from "@/store/store";
import { useUpdateDescription } from "@/app/api/auth";
import Toast from "@/components/shared/toasts/authToast";

export default function BusinessDescription() {
  const [businessDescription, setBusinessDescription] = useState({
    description: "",
  });
  const {
    completeProfile: { step },
  } = useAppSelector((state: RootState) => state);
  const dispatch = useAppDispatch();

  const { mutateAsync, isLoading, error } = useUpdateDescription(step);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setBusinessDescription({ ...businessDescription, [name]: value });
  };

  const submitDescription = () => {
    if (businessDescription.description) {
      mutateAsync(businessDescription.description);
    }
  };
  return (
    <div className="w-full h-auto flex flex-col gap-5 px-5 py-10 sm:px-10 lg:px-20 overflow-x-hidden">
      Hello
      {error && <Toast message={"Something went wrong"} type="error" />}
      <ProfileProgress />
      <div className="flex flex-col gap-5 w-full max-h-96 p-10 border bg-white lg:w-96">
        <h3>Tell us about your Business</h3>
        <form className="flex flex-col gap-3">
          <TextField
            required
            id="outlined-required"
            label="Business Description"
            type="text"
            name="description"
            value={businessDescription.description}
            onChange={handleChange}
            multiline
            rows={3}
          />
        </form>
      </div>
      <div className="w-full h-10 flex justify-end">
        <button
          disabled={isLoading || !businessDescription.description}
          type="button"
          onClick={submitDescription}
          className="w-max px-7 py-2 rounded-full bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? <>Loading</> : <>Next</>}
        </button>
      </div>
    </div>
  );
}
