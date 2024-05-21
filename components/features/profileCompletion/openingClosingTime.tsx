"use client";
import ProfileProgress from "@/components/core/cards/progress";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
// dayjs.tz.setDefault('Africa/Nairobi');

// Define the types for the form inputs
interface IFormInput {
  weekdayOpening: Dayjs | null;
  weekdayClosing: Dayjs | null;
  weekendOpening: Dayjs | null;
  weekendClosing: Dayjs | null;
}

const OpenCloseTimes = () => {
  const [timeData, setTimeData] = React.useState<IFormInput>({
    weekdayOpening: null,
    weekdayClosing: null,
    weekendOpening: null,
    weekendClosing: null
  });

  const handleTimeChange = (name: keyof IFormInput) => (value: Dayjs | null) => {
    setTimeData(prev => {return {...prev, [name]: value}});
    console.log(dayjs(timeData?.[name]).format("HH:mm"));
    console.log(`${name}: ${value}`);
  };

  return (
    <div className="w-full h-auto flex flex-col gap-5 px-5 py-10 sm:px-10 lg:px-20">
      <ProfileProgress />
      <div className="flex flex-col gap-5 w-full h-auto p-5 border bg-white lg:p-10">
        <h3>What time do you Open and close your Business?</h3>
        <div>
          <div className="flex-col flex w-full gap-y-3">
            <form>
                {/* <LocalizationProvider  dateAdapter={AdapterDayjs}> */}
                    <div className="flex flex-col gap-4">
                        <TimePicker
                            label="Weekday Opening"
                            value={timeData?.weekdayOpening}
                            onChange={handleTimeChange('weekdayOpening')}
                            className="w-full"
                            timezone="Africa/Nairobi"
                        />
                        <TimePicker
                            label="Weekday Closing"
                            value={timeData?.weekdayClosing}
                            onChange={handleTimeChange('weekdayClosing')}
                            className="w-full"
                        />
                        <TimePicker
                            label="Weekend Opening"
                            value={timeData?.weekendOpening}
                            onChange={handleTimeChange('weekendOpening')}
                            className="w-full"
                        />
                        <TimePicker
                            label="Weekend Closing"
                            value={timeData?.weekendClosing}
                            onChange={handleTimeChange('weekendClosing')}
                            className="w-full"
                        />
                    </div>
                {/* </LocalizationProvider> */}
            </form>
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
