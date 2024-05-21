"use client";
import ProfileProgress from "@/components/core/cards/progress";
import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { Controller, useForm } from "react-hook-form";
import Button from "@/ui/button";

// dayjs.extend(utc);
// dayjs.extend(timezone);
// dayjs.tz.setDefault('Africa/Nairobi');

// Define the types for the form inputs
// interface IFormInput {
//   weekdayOpening: Dayjs | null;
//   weekdayClosing: Dayjs | null;
//   weekendOpening: Dayjs | null;
//   weekendClosing: Dayjs | null;
// }

const OpenCloseTimes = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      weekdayOpening: "",
      weekdayClosing: "",
      weekendOpening: "",
      weekendClosing: "",
    },
  });

  const onSubmit = (data: any) =>
    console.log(
      "weekdayOpening",
      dayjs(new Date(data?.weekdayOpening)).format("HH:mm")
    );

  return (
    <div className="w-full h-auto flex flex-col gap-5 px-5 py-10 sm:px-10 lg:px-20">
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
                    // defaultValue={dayjs().startOf("D")}
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
        {/* <button
          type="button"
          className="w-max px-7 py-2 rounded-full bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Finish
        </button> */}
        <Button
          // title="Submit"
          variant="primary"
          onClick={handleSubmit(onSubmit)}
        >
          Finish
        </Button>
      </div>
    </div>
  );
};

export default OpenCloseTimes;
