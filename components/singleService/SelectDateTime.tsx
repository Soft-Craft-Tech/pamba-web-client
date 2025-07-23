"use client";
import { useGetSingleBusiness } from "@/app/api/businesses";
import { useGetSingleService } from "@/app/api/services";
import BookingCartSidebar from "@/components/singleService/BookingCartSidebar";
import CalendarIcon from "@/ui/icons/calendar-con";
import { useBookingCart } from "@/utils/providers/BookingCartProvider";
import IconButton from "@mui/material/IconButton";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const SelectDateTime = ({ businessSlug }: { businessSlug: string }) => {
  const { cartInfo, cartServices, updateCartDateTime, updateCartBusiness } =
    useBookingCart();
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<string>(
    dayjs().format("YYYY-MM-DD")
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [dateCardsStart, setDateCardsStart] = useState(dayjs());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const { data: businessData } = useGetSingleBusiness(businessSlug);
  const { data: serviceData } = useGetSingleService(
    cartServices[0]?.id.toString() || ""
  );

  useEffect(() => {
    if (serviceData?.service && businessData?.business) {
      updateCartBusiness(
        businessData.business.id,
        businessData.business.business_name,
        businessSlug,
        serviceData.service.weekdayClosing,
        serviceData.service.weekdayOpening,
        serviceData.service.weekendClosing,
        serviceData.service.weekendOpening
      );
    }
    if (cartInfo.date) {
      setSelectedDate(cartInfo.date);
      setDateCardsStart(dayjs(cartInfo.date).startOf("week"));
    }
    if (cartInfo.time) {
      setSelectedTime(cartInfo.time);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceData]);

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      updateCartDateTime(selectedDate, selectedTime);
      router.push("/booking/client-info");
    }
  };

  const weekDates = Array.from({ length: 7 }, (_, i) =>
    dateCardsStart.add(i, "day")
  );

  const generateTimeSlots = () => {
    const selectedDay = dayjs(selectedDate);
    const isWeekend = selectedDay.day() === 0 || selectedDay.day() === 6;

    const openingTime = isWeekend
      ? cartInfo.weekendOpening
      : cartInfo.weekdayOpening;
    const closingTime = isWeekend
      ? cartInfo.weekendClosing
      : cartInfo.weekdayClosing;

    if (!openingTime || !closingTime) return [];

    const slots = [];
    const slotInterval = 15;
    const startTime = dayjs(`2000-01-01 ${openingTime}`).add(1, "hour");
    const endTime = dayjs(`2000-01-01 ${closingTime}`).subtract(1, "hour");

    let currentTime = startTime;

    while (currentTime.isBefore(endTime)) {
      slots.push(currentTime.format("HH:mm"));
      currentTime = currentTime.add(slotInterval, "minute");
    }

    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handleDateSelect = (date: Dayjs) => {
    setSelectedDate(date.format("YYYY-MM-DD"));
  };

  const handleDateChange = (date: Dayjs | null) => {
    if (date) {
      setSelectedDate(date.format("YYYY-MM-DD"));
      setDateCardsStart(date.startOf("week"));
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handlePrevWeek = () =>
    setDateCardsStart(dateCardsStart.subtract(7, "day"));
  const handleNextWeek = () => setDateCardsStart(dateCardsStart.add(7, "day"));

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Select Time</h2>
      <div className="flex flex-col lg:flex-row gap-8 w-full mb-6">
        <div className="flex flex-col w-full h-auto gap-5">
          <div className="flex flex-col gap-8">
            <div className="bg-white rounded-xl border p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <IconButton onClick={() => setShowDatePicker(true)}>
                    <CalendarIcon />
                  </IconButton>

                  {showDatePicker && (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        open
                        value={selectedDate ? dayjs(selectedDate) : null}
                        onClose={() => setShowDatePicker(false)}
                        onChange={(date) => {
                          handleDateChange(date);
                          setShowDatePicker(false);
                        }}
                        disablePast
                        slotProps={{
                          textField: {
                            style: { visibility: "hidden" },
                          },
                        }}
                      />
                    </LocalizationProvider>
                  )}
                </div>
              </div>
              <h3 className="font-semibold text-gray-600 text-xl mb-3">
                {dateCardsStart.format("MMMM YYYY")}
              </h3>

              {/* Date Navigation */}
              <div className="flex flex-row items-center gap-x-2">
                <IconButton
                  onClick={handlePrevWeek}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <IoChevronBack className="w-4 h-4" />
                </IconButton>

                <div className="flex flex-row gap-x-2 overflow-x-auto scrollbar-hide flex-1 justify-center">
                  {weekDates.map((date, index) => {
                    const isSelected =
                      selectedDate === date.format("YYYY-MM-DD");
                    const isToday = date.isSame(dayjs(), "day");
                    const isPast = date.isBefore(dayjs(), "day");
                    const isWeekend = date.day() === 0 || date.day() === 6;

                    return (
                      <div
                        key={index}
                        className={`px-4 py-2 flex flex-col gap-y-1 items-center justify-center cursor-pointer border-2 rounded-lg min-w-[120px] transition-all duration-200 ${
                          isSelected
                            ? "border-primary bg-primary/10 text-primary"
                            : isPast
                            ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                            : isWeekend
                            ? "border-gray-200 bg-gray-50 text-gray-500"
                            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                        }`}
                        onClick={() =>
                          !isPast && handleDateSelect(date.startOf("day"))
                        }
                      >
                        <p className="text-[14px] font-normal">
                          {date.format("ddd")}
                        </p>
                        <p className="text-[14px] font-normal">
                          {date.format("D")}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <IconButton
                  onClick={handleNextWeek}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <IoChevronForward className="w-4 h-4" />
                </IconButton>
              </div>

              <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto mt-6 px-3">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => handleTimeSelect(time)}
                    className={`p-3 rounded-lg border text-sm font-medium transition-all duration-200 ${
                      selectedTime === time
                        ? "bg-primary/10 text-primary border-primary"
                        : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Booking Cart Sidebar */}
        <div className="w-full max-w-md">
          <BookingCartSidebar
            businessData={businessData}
            currentStep="datetime"
            onContinue={handleContinue}
            canContinue={selectedDate !== "" && selectedTime !== null}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectDateTime;
