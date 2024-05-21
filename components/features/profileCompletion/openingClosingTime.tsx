import ProfileProgress from "@/components/core/cards/progress";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Dayjs } from "dayjs";
import InputLabel from "@mui/material/InputLabel";

// Define the types for the form inputs
interface IFormInput {
  weekdayOpening: Dayjs | null;
  weekdayClosing: Dayjs | null;
  weekendOpening: Dayjs | null;
  weekendClosing: Dayjs | null;
}

const OpenCloseTimes = () => {
  const { control, handleSubmit, reset } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    reset();
    console.log(data);
  };

  return (
    <div className="w-full h-auto flex flex-col gap-5 px-5 py-10 sm:px-10 lg:px-20">
      <ProfileProgress />
      <div className="flex flex-col gap-5 w-full max-h-96 p-5 border bg-white lg:p-10 lg:min-w-96">
        <h3>What time do you Open and close your Business?</h3>
        <div>
          <div className="flex-col flex max-w-[336px] gap-y-3">
            <InputLabel
              className="text-[#0F1C35] text-lg font-bold"
              id="demo-simple-select-label"
            >
              Select Time
            </InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="Weekday Opening"
                //   value={selectedTime}
                //   onChange={handleTimeChange}
                //   shouldDisableTime={shouldDisableTime}
              />
              <TimePicker
                label="Weekday Closing"
                //   value={selectedTime}
                //   onChange={handleTimeChange}
                //   shouldDisableTime={shouldDisableTime}
              />
              <TimePicker
                label="Weekend Opening"
                //   value={selectedTime}
                //   onChange={handleTimeChange}
                //   shouldDisableTime={shouldDisableTime}
              />
              <TimePicker
                label="Weekend Closing"
                //   value={selectedTime}
                //   onChange={handleTimeChange}
                //   shouldDisableTime={shouldDisableTime}
              />
            </LocalizationProvider>
          </div>
        </div>
      </div>
      <div className="w-full h-10 flex justify-end">
        <button
          type="button"
          className="w-max px-7 py-2 rounded-full bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Finish
        </button>
      </div>
    </div>
  );
};

export default OpenCloseTimes;
