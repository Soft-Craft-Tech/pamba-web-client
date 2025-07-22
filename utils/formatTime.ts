import moment from "moment";

export const formatTime = (time: string) => {
  return time ? moment(time, "HH:mm").format("hh:mm A") : "";
};

// Format date as "Saturday, 19 July"
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });
};

// Calculate duration between two times and format as "08:20-11:35 (3 hrs, 15 mins duration)"
export const formatTimeRange = (startTime: string, endTime?: string): string => {
  if (!endTime) {
    return startTime;
  }

  // Parse times (assuming 24-hour format)
  const [startHour, startMin] = startTime.split(':').map(Number);
  const [endHour, endMin] = endTime.split(':').map(Number);

  // Calculate duration
  let durationMinutes = (endHour * 60 + endMin) - (startHour * 60 + startMin);
  
  // Handle overnight bookings
  if (durationMinutes < 0) {
    durationMinutes += 24 * 60;
  }

  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;

  const durationText = hours > 0 
    ? `${hours} hr${hours > 1 ? 's' : ''}${minutes > 0 ? `, ${minutes} min${minutes > 1 ? 's' : ''}` : ''}`
    : `${minutes} min${minutes > 1 ? 's' : ''}`;

  return `${startTime}-${endTime} (${durationText} duration)`;
};

// Calculate end time based on start time and service duration
export const calculateEndTime = (startTime: string, durationHours: number): string => {
  const [hour, min] = startTime.split(':').map(Number);
  const totalMinutes = hour * 60 + min + (durationHours * 60);
  
  const endHour = Math.floor(totalMinutes / 60) % 24;
  const endMin = totalMinutes % 60;
  
  return `${endHour.toString().padStart(2, '0')}:${endMin.toString().padStart(2, '0')}`;
};

// Format date for API submission in DD-MM-YYYY format
export const formatDateForAPI = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  
  return `${day}-${month}-${year}`;
};
