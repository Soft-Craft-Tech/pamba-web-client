"use client";

import React from "react";
import CalendarIcon from "@/ui/icons/calendar-con";
import TimeIcon from "@/ui/icons/time-icon";
import Button from "@/ui/button";
import Image from "next/image";
import dayjs, { Dayjs } from "dayjs";
import FormField from "@/ui/FormField";

type BookingFormProps = {
  register: any;
  errors: any;
  notification: string;
  setNotificationMethod: (val: string) => void;
  selectedDay: Dayjs | null;
  selectedTime: Dayjs | null;
  data: any;
  onCancel: () => void;
  isPendingBookAppointment: boolean;
};

const BookingForm: React.FC<BookingFormProps> = ({
  register,
  errors,
  notification,
  setNotificationMethod,
  selectedDay,
  selectedTime,
  data,
  onCancel,
  isPendingBookAppointment,
}) => (
  <div className="flex flex-col gap-y-6 w-full">
    <h1 className="text-2xl font-semibold">Additional information</h1>
    <p>{data?.service?.business_name}</p>
    <div className="flex flex-row gap-x-2">
      <div className="flex flex-row gap-x-1 items-center">
        <CalendarIcon />
        <p className="text-sm">{selectedDay && dayjs(selectedDay).format("MMM D")}</p>
      </div>
      <div className="flex flex-row gap-x-1 items-center">
        <TimeIcon />
        <p className="text-sm">{selectedTime && selectedTime.format("LT")}</p>
      </div>
    </div>
    <div className="flex flex-col gap-4">
      <FormField
        type="text"
        placeholder="Client name"
        name="name"
        register={register}
        error={errors.name}
      />
      <FormField
        type="tel"
        placeholder="Phone Number"
        name="phone"
        register={register}
        error={errors.phone}
      />
      <FormField
        type="email"
        placeholder="Email"
        name="email"
        register={register}
        error={errors.email}
      />
      <div className="flex flex-col gap-2">
        <textarea
          id="comment"
          {...register("comment")}
          placeholder="Additional information"
          className={`w-full p-3 border rounded-md resize-none ${
            errors.comment ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
          rows={4}
        />
        {errors.comment && (
          <span className="text-red-500 text-sm">{errors.comment.message}</span>
        )}
      </div>
      {/* Notification method (optional, can be uncommented if needed) */}
      {/* <div>
        <p className="text-sm font-medium text-gray-700 mb-1">How do you want to be notified?</p>
        <div className="flex flex-row items-center gap-x-3">
          <div className="flex items-center">
            <input
              id="default-radio-1"
              type="radio"
              value="sms"
              name="notification"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
              checked={notification === "sms"}
              onChange={e => setNotificationMethod(e.target.value)}
            />
            <label className="ms-2 text-sm font-medium text-gray-900">SMS</label>
          </div>
          <div className="flex items-center">
            <input
              id="default-radio-2"
              type="radio"
              value="whatsapp"
              name="notification"
              className="w-4 h-4 text-[#7F56D9] bg-[#7F56D9] border-[#7F56D9]"
              checked={notification === "whatsapp"}
              onChange={e => setNotificationMethod(e.target.value)}
            />
            <label className="ms-2 text-sm font-medium text-gray-900">Whatsapp</label>
          </div>
        </div>
      </div> */}
    </div>
    <div className="flex flex-row gap-x-4 justify-between mt-4">
      <Button
        label="Cancel"
        className="border border-primary rounded-full text-primary py-1 lg:py-0 text-sm lg:text-base lg:px-6 xl:px-8 hover:bg-primary hover:text-white transition-all ease-in-out"
        onClick={onCancel}
        variant="outline"
        type="button"
      />
      <Button
        type="submit"
        label="Book Appointment"
        variant="primary"
        disabled={isPendingBookAppointment}
        className="bg-primary hover:bg-primaryHover rounded-full flex items-center gap-2 py-1 lg:p-3 justify-center text-white text-sm lg:text-base"
      >
        <p className="text-nowrap mr-2">Confirm Appointment</p>
        {isPendingBookAppointment ? (
          <p className="h-6 w-6">Loading...</p>
        ) : (
          <Image
            className="border bg-white ml-3 rounded-full"
            src="/arrow-right.svg"
            alt="arrow-icon"
            width={20}
            height={20}
          />
        )}
      </Button>
    </div>
  </div>
);

export default BookingForm; 