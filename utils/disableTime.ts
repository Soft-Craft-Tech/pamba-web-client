import { TimeView } from "@mui/x-date-pickers";
import dayjs from "dayjs";

interface BusinessHours {
  weekdayOpening?: string;
  weekday_opening?: string;
  weekdayClosing?: string;
  weekday_closing?: string;
  weekendOpening?: string;
  weekend_opening?: string;
  weekendClosing?: string;
  weekend_closing?: string;
}

export const shouldDisableTime = (
  timeValue: dayjs.Dayjs,
  clockType: TimeView,
  selectedDate: dayjs.Dayjs | null,
  service: BusinessHours
): boolean => {
  if (!selectedDate || !service) return false;

  // Determine if the selected date is a weekend (Saturday or Sunday)
  const dayOfWeek = selectedDate.day(); // 0 is Sunday, 6 is Saturday
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

  // Get the opening and closing times in HH:mm format
  const openingTimeStr = isWeekend
    ? service.weekend_opening ?? service.weekendOpening
    : service.weekday_opening ?? service.weekdayOpening;

  const closingTimeStr = isWeekend
    ? service.weekend_closing ?? service.weekendClosing
    : service.weekday_closing ?? service.weekdayClosing;

  // Parse the times using dayjs with the correct format (HH:mm)
  const openingTime = dayjs(openingTimeStr, "HH:mm");
  const closingTime = dayjs(closingTimeStr, "HH:mm");

  // If parsing failed (invalid times), don't disable anything
  if (!openingTime.isValid() || !closingTime.isValid()) return false;

  // Get current time components
  const currentHour = timeValue.hour();
  const currentMinute = timeValue.minute();

  // Get opening/closing time components
  const openingHour = openingTime.hour();
  const openingMinute = openingTime.minute();
  const closingHour = closingTime.hour();
  const closingMinute = closingTime.minute();

  // Convert all times to minutes for easier comparison
  const currentInMinutes = currentHour * 60 + currentMinute;
  const openingInMinutes = openingHour * 60 + openingMinute;
  const closingInMinutes = closingHour * 60 + closingMinute;

  // Handle hours selection
  if (clockType === "hours") {
    // Disable hours before opening
    if (currentHour < openingHour) return true;

    // Disable hours after closing (except when closing is midnight)
    if (closingHour !== 0 && currentHour > closingHour) return true;

    // Special case: if closing hour is midnight (0), it means next day
    if (closingHour === 0 && currentHour === 0) return false;

    // Disable the closing hour itself (since it's the end time)
    if (currentHour === closingHour) return true;

    return false;
  }

  // Handle minutes selection
  if (clockType === "minutes") {
    // If current hour is before opening, disable all minutes
    if (currentHour < openingHour) return true;

    // If current hour is after closing, disable all minutes
    if (currentHour > closingHour) return true;

    // If current hour is opening hour, disable minutes before opening time
    if (currentHour === openingHour && currentMinute < openingMinute)
      return true;

    // If current hour is closing hour, disable minutes after closing time
    if (currentHour === closingHour && currentMinute >= closingMinute)
      return true;

    return false;
  }

  return false;
};
