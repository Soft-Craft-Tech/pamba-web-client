import moment from "moment";

export const formatTime = (time: string) => {
  return time ? moment(time, "HH:mm").format("hh:mm A") : "";
};
