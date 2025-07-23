"use client";

import React from "react";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CalendarIcon from "@/ui/icons/calendar-con";
import dayjs, { Dayjs } from "dayjs";

type DateSelectorProps = {
  weekDates: Dayjs[];
  selectedDay: Dayjs | null;
  onSelectDay: (day: Dayjs) => void;
  onPrevWeek: () => void;
  onNextWeek: () => void;
  showDatePicker: boolean;
  setShowDatePicker: (show: boolean) => void;
  onDateChange: (date: Dayjs | null) => void;
};

const DateSelector: React.FC<DateSelectorProps> = ({
  weekDates,
  selectedDay,
  onSelectDay,
  onPrevWeek,
  onNextWeek,
  showDatePicker,
  setShowDatePicker,
  onDateChange,
}) => (
  <div>
    <IconButton onClick={() => setShowDatePicker(true)}>
      <CalendarIcon />
    </IconButton>
    {showDatePicker && (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          open
          value={selectedDay}
          onClose={() => setShowDatePicker(false)}
          onChange={(date) => {
            onDateChange(date);
            setShowDatePicker(false);
          }}
          disablePast
        />
      </LocalizationProvider>
    )}

    <div className="flex flex-row items-center gap-x-2">
      <IconButton onClick={onPrevWeek}>
        <ArrowBackIosNewIcon fontSize="small" />
      </IconButton>
      <div className="flex flex-row gap-x-2 overflow-x-auto scrollbar-hide">
        {weekDates.map((date, index) => (
          <div
            key={index}
            className={`px-4 py-2 flex flex-col gap-y-1 items-center justify-center cursor-pointer border-2 rounded-lg min-w-[60px] ${
              selectedDay && date.isSame(selectedDay, "day")
                ? "border-[#7F56D9] bg-[#F4F3FF]"
                : "border-[#F2F2F2] hover:bg-background hover:scale-[1.02]"
            }`}
            onClick={() => onSelectDay(date.startOf("day"))}
          >
            <p className="text-[14px] text-[#1C1C1C] font-normal">
              {date.format("ddd")}
            </p>
            <p className="text-[14px] text-[#1C1C1C] font-normal">
              {date.format("D")}
            </p>
          </div>
        ))}
      </div>
      <IconButton onClick={onNextWeek}>
        <ArrowForwardIosIcon fontSize="small" />
      </IconButton>
    </div>
  </div>
);

export default DateSelector;
