"use client";
import ProfileProgress from "@/components/core/cards/progress";
import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { Controller, useForm } from "react-hook-form";
import { useAddOpeningClosingHours } from "@/app/api/businesses";
import Toast from "@/components/shared/toasts/authToast";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { RootState } from "@/store/store";
import { setMessage, setShowToast } from "@/store/toastSlice";

interface CustomError extends Error {
  response?: {
    data: {
      message: string;
    };
  };
}

const OpenCloseTimes = () => {
  const dispatch = useAppDispatch();
  const {
    toast: { toastMessage },
  } = useAppSelector((state: RootState) => state);
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      weekdayOpening: "",
      weekdayClosing: "",
      weekendOpening: "",
      weekendClosing: "",
    },
  });

  const { mutate, isPending, error, isSuccess } = useAddOpeningClosingHours(4);

  const onSubmit = (data: any) => {
    const timeData = {
      weekdayOpening: dayjs(new Date(data?.weekdayOpening)).format("HH:mm"),
      weekdayClosing: dayjs(new Date(data?.weekdayClosing)).format("HH:mm"),
      weekendOpening: dayjs(new Date(data?.weekendOpening)).format("HH:mm"),
      weekendClosing: dayjs(new Date(data?.weekendClosing)).format("HH:mm"),
    };
    try {
      mutate({ ...timeData });
      dispatch(setShowToast(true));
      reset();
    } catch (error) {
      const customError = error as CustomError;
      dispatch(setMessage(customError?.response?.data?.message));
      dispatch(setShowToast(true));
    }
  };

  return (
    <div className="w-full h-auto flex flex-col gap-5 px-5 py-10 sm:px-10 lg:px-20">
      {isSuccess && <Toast message={toastMessage} type="success" />}
      {error && <Toast message={toastMessage} type="error" />}
      <ProfileProgress />
      <div className="flex flex-col gap-5 w-full h-auto p-5 border bg-white lg:p-10">
        <h3>What time do you Open and close your Business?</h3>
        <div>
          <div className="flex-col flex w-full gap-y-3">
            <form>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="flex flex-col gap-4">
                  <Controller
                    control={control}
                    name="weekdayOpening"
                    rules={{
                      required: {
                        value: true,
                        message: "Start date is required",
                      },
                    }}
                    render={({ field: { onChange, value, ref } }) => (
                      <TimePicker
                        label="Weekday Opening"
                        disableFuture
                        onChange={onChange}
                        onAccept={onChange}
                        value={value}
                        inputRef={ref}
                        className="w-full"
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    // defaultValue={dayjs().startOf("D")}
                    name="weekdayClosing"
                    rules={{
                      required: {
                        value: true,
                        message: "Start date is required",
                      },
                    }}
                    render={({ field: { onChange, value, ref } }) => (
                      <TimePicker
                        label="Weekday Closing"
                        disableFuture
                        onChange={onChange}
                        onAccept={onChange}
                        value={value}
                        inputRef={ref}
                        className="w-full"
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    // defaultValue={dayjs().startOf("D")}
                    name="weekendOpening"
                    rules={{
                      required: {
                        value: true,
                        message: "Start date is required",
                      },
                    }}
                    render={({ field: { onChange, value, ref } }) => (
                      <TimePicker
                        label="Weekend Opening"
                        disableFuture
                        onChange={onChange}
                        onAccept={onChange}
                        value={value}
                        inputRef={ref}
                        className="w-full"
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    // defaultValue={dayjs().startOf("D")}
                    name="weekendClosing"
                    rules={{
                      required: {
                        value: true,
                        message: "Start date is required",
                      },
                    }}
                    render={({ field: { onChange, value, ref } }) => (
                      <TimePicker
                        label="Weekend Closing"
                        disableFuture
                        onChange={onChange}
                        onAccept={onChange}
                        value={value}
                        inputRef={ref}
                        className="w-full"
                      />
                    )}
                  />
                </div>
              </LocalizationProvider>
            </form>
          </div>
        </div>
      </div>
      <div className="w-full h-10 flex justify-end">
        <button
          disabled={isPending}
          type="button"
          className="w-max px-7 py-2 rounded-full bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleSubmit(onSubmit)}
        >
          {isPending ? "Loading..." : "Finish"}
        </button>
      </div>
    </div>
  );
};

export default OpenCloseTimes;
