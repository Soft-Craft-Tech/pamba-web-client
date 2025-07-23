"use client";

import Button from "@/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import dayjs, { Dayjs } from "dayjs";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import BookingForm from "./BookingForm";
import DateSelector from "./DateSelector";
import TimeSlotSelector from "./TimeSlotSelector";

const bookingSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z
    .string()
    .min(7, "Phone number is required")
    .max(15, "Phone number is too long"),
  email: z.string().email("Invalid email address"),
  comment: z.string().optional(),
});

type BookingFormType = z.infer<typeof bookingSchema>;

type BookingDialogProps = {
  open: boolean;
  onClose: () => void;
  data: any;
  businessData: any;
  onBook: (payload: any) => Promise<void>;
  isPendingBookAppointment: boolean;
};

const BookingDialog: React.FC<BookingDialogProps> = ({
  open,
  onClose,
  data,
  businessData,
  onBook,
  isPendingBookAppointment,
}) => {
  const [bookingFrame, setBookingFrame] = useState<"start" | "finish">("start");
  const [staff, setStaff] = useState<{ label: string; value: number } | null>(
    null
  );
  const [selectedDay, setSelectedDay] = useState<Dayjs | null>(null);
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(null);
  const [notification, setNotificationMethod] = useState("whatsapp");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateCardsStart, setDateCardsStart] = useState(dayjs());

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingFormType>({
    resolver: zodResolver(bookingSchema),
    mode: "onTouched",
  });

  const businessId = data?.service?.business_id;

  // DateSelector logic
  const handleDateChange = (date: Dayjs | null) => {
    if (date) {
      setSelectedDay(date.startOf("day"));
      setDateCardsStart(date.startOf("week"));
      setSelectedTime(null);
    }
  };
  const handlePrevWeek = () =>
    setDateCardsStart(dateCardsStart.subtract(7, "day"));
  const handleNextWeek = () => setDateCardsStart(dateCardsStart.add(7, "day"));
  const weekDates = Array.from({ length: 7 }, (_, i) =>
    dateCardsStart.add(i, "day")
  );

  // TimeSlotSelector logic
  const getOpeningClosing = (service: any, day: Dayjs) => {
    const isWeekend = day.day() === 0 || day.day() === 6;
    return {
      opening: isWeekend ? service?.weekendOpening : service?.weekdayOpening,
      closing: isWeekend ? service?.weekendClosing : service?.weekdayClosing,
    };
  };
  const { opening, closing } =
    selectedDay && data?.service
      ? getOpeningClosing(data.service, selectedDay)
      : { opening: null, closing: null };
  const generateTimeSlots = (opening: string, closing: string) => {
    if (!opening || !closing) return [];
    const slots = [];
    let start = dayjs(opening, "HH:mm").add(1, "hour");
    const end = dayjs(closing, "HH:mm");
    while (start.isBefore(end)) {
      slots.push(start.format("HH:mm"));
      start = start.add(30, "minute");
    }
    return slots;
  };
  const timeSlots =
    opening && closing ? generateTimeSlots(opening, closing) : [];

  // Step 2: submit form
  const onSubmit = async (formData: BookingFormType) => {
    if (!selectedDay || !selectedTime || !staff) return;
    const payload = {
      ...formData,
      service: Number(data?.service?.id),
      staff: staff.value,
      business: Number(businessId),
      date: dayjs(selectedDay).format("DD-MM-YYYY"),
      time: dayjs(selectedTime).format("HH:mm"),
      notification,
    };
    await onBook(payload);
    handleClose();
  };

  const handleClose = () => {
    onClose();
    setBookingFrame("start");
    reset();
    setStaff(null);
    setSelectedDay(null);
    setSelectedTime(null);
    setDateCardsStart(dayjs());
  };

  const handleNext = () => {
    if (staff && selectedDay && selectedTime) {
      setBookingFrame("finish");
    }
  };

  return (
    <Dialog
      maxWidth="lg"
      open={open}
      onClose={handleClose}
      PaperProps={
        {
          component: "form",
          onSubmit: handleSubmit(onSubmit),
        } as any
      }
    >
      <DialogContent style={{ padding: "20px" }}>
        {bookingFrame === "start" && (
          <div className="w-full flex flex-col gap-y-10">
            <h1 className="text-xl font-semibold">Book Appointment</h1>
            <div className="gap-y-10 flex flex-col">
              {/* Staff select */}
              <div className="flex-col flex max-w-[336px] gap-y-3">
                {data?.staff?.length > 0 && (
                  <select
                    value={staff?.value || ""}
                    onChange={(e) => {
                      const selected = data.staff.find(
                        (s: any) => s.id === Number(e.target.value)
                      );
                      setStaff(
                        selected
                          ? { label: selected.f_name, value: selected.id }
                          : null
                      );
                    }}
                    className="form-select block w-full rounded-lg border px-3 py-2 text-sm bg-[#FAFDFF] border-[#D9D9D9]"
                  >
                    <option value="">Select Service Provider</option>
                    {data.staff.map((s: any) => (
                      <option key={s.id} value={s.id}>
                        {s.f_name}
                      </option>
                    ))}
                  </select>
                )}
                {!staff && (
                  <span className="text-xs text-red-500 mt-1">
                    Please select a service provider
                  </span>
                )}
              </div>
              {/* Date selector */}
              <DateSelector
                weekDates={weekDates}
                selectedDay={selectedDay}
                onSelectDay={setSelectedDay}
                onPrevWeek={handlePrevWeek}
                onNextWeek={handleNextWeek}
                showDatePicker={showDatePicker}
                setShowDatePicker={setShowDatePicker}
                onDateChange={handleDateChange}
              />
              {!selectedDay && (
                <span className="text-xs text-red-500 mt-1">
                  Please select a day
                </span>
              )}
              {/* Time slot selector */}
              <TimeSlotSelector
                timeSlots={timeSlots}
                selectedTime={selectedTime}
                onSelectTime={setSelectedTime}
                opening={opening}
                closing={closing}
                selectedDay={selectedDay}
              />
              <div className="flex flex-col gap-3 lg:flex-row justify-end">
                <Button
                  label="Cancel"
                  className="border border-primary rounded-full text-primary py-1 lg:py-0 text-sm lg:text-base lg:px-6 xl:px-8 hover:bg-primary hover:text-white transition-all ease-in-out"
                  onClick={handleClose}
                />
                <Button
                  label="Next"
                  className="bg-primary hover:bg-primaryHover rounded-full flex items-center gap-2 py-1 lg:p-3 justify-center text-white text-sm lg:text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primaryHover"
                  onClick={handleNext}
                  variant="primary"
                  disabled={!staff || !selectedDay || !selectedTime}
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
        )}
        {bookingFrame === "finish" && (
          <BookingForm
            register={register}
            errors={errors}
            notification={notification}
            setNotificationMethod={setNotificationMethod}
            selectedDay={selectedDay}
            selectedTime={selectedTime}
            data={data}
            onCancel={handleClose}
            isPendingBookAppointment={isPendingBookAppointment}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
