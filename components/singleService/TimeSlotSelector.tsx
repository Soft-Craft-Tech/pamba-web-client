"use client";

import React from "react";
import dayjs, { Dayjs } from "dayjs";
import { formatTime } from "@/utils/formatTime";

type TimeSlotSelectorProps = {
  timeSlots: string[];
  selectedTime: Dayjs | null;
  onSelectTime: (time: Dayjs) => void;
  opening: string | null;
  closing: string | null;
  selectedDay: Dayjs | null;
};

const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({
  timeSlots,
  selectedTime,
  onSelectTime,
  opening,
  closing,
  selectedDay,
}) => (
  <div className="flex-col flex max-w-[336px] gap-y-3">
    <label className="text-[#0F1C35] text-lg font-bold">Select Time</label>
    <div className="flex flex-wrap gap-3 mt-2">
      {timeSlots.length > 0 ? (
        timeSlots.map((slot) => (
          <button
            key={slot}
            type="button"
            className={`px-4 py-2 rounded-lg border text-sm min-w-[80px] ${
              selectedTime && selectedTime.format("HH:mm") === slot
                ? "bg-primary text-white border-primary"
                : "bg-white border-[#D9D9D9] text-[#0F1C35] hover:bg-primary/10"
            }`}
            onClick={() => onSelectTime(dayjs(slot, "HH:mm"))}
          >
            {formatTime(slot)}
          </button>
        ))
      ) : (
        <span className="text-xs text-gray-500">No available slots for this day</span>
      )}
    </div>
    {(!selectedTime || !selectedDay) && (
      <span className="bg-red-100 text-red-700 p-2 rounded-lg text-xs mt-2">
        Please select a valid time between {opening && closing ? `${formatTime(opening)} and ${formatTime(closing)}` : "-"}
      </span>
    )}
  </div>
);

export default TimeSlotSelector; 