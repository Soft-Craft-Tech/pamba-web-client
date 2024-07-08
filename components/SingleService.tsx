/* eslint-disable @next/next/no-img-element */
"use client";
import { useBookAppointments } from "@/app/api/appointment";
import { useGetSingleService } from "@/app/api/services";
import Explorer from "@/components/Explorer";
import ShopSepartor from "@/components/shared/sectionSeparators/shopsSeparator";
import { DynamicObject } from "@/components/types";
import { daysData } from "@/data";
import { useAppSelector } from "@/hooks";
import { RootState } from "@/store/store";
import Button from "@/ui/button";
import CalendarIcon from "@/ui/icons/calendar-con";
import TimeIcon from "@/ui/icons/time-icon";
import { FormControl } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import Image from "next/image";
import * as React from "react";
import Toast from "./shared/toasts/authToast";
import { useForm } from "react-hook-form";
import Loader from "./loader";

dayjs.extend(isBetween);

const SingleService: React.FC<{ serviceId: string }> = ({ serviceId }) => {
  const {
    filteredServices: { filteredServices },
    toast: { toastMessage },
  } = useAppSelector((state: RootState) => state);
  const { data } = useGetSingleService(serviceId);

  const {
    mutateAsync,
    isSuccess,
    isError,
    isPending: isPendingBookAppointment,
  } = useBookAppointments();
  const [bookingFrame, setBookingFrame] = React.useState("start");
  const [activeSelect, setActiveSelect] = React.useState<string | any>(null);
  const [staff, setAge] = React.useState<any>(0);
  const [selectedDay, setSelectedDay] = React.useState<any>(null);
  const [selectedTime, setSelectedTime] = React.useState<any>(null);
  const [notification, setNotificationMethod] = React.useState("whatsapp");

  const handleChange = (event: SelectChangeEvent<number>) => {
    setAge(event.target.value);
  };

  const handleDaySelect = (index: number, day: dayjs.Dayjs) => {
    setActiveSelect(index);
    setSelectedDay(day);
  };

  const businessId = data?.service?.business_id;

  const handleTimeChange = (newValue: Dayjs | null) => {
    setSelectedTime(newValue);
  };

  const handleNotificationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNotificationMethod(event.target.value);
  };

  // TODO: Implement form validation
  // TODO: Client Name
  // TODO: Make Book appointment card clickable

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append("service", serviceId.toString());
    formData.append("staff", staff.toString());
    formData.append("business", businessId?.toString());
    formData.append("date", dayjs(selectedDay).format("DD-MM-YYYY"));
    formData.append("time", dayjs(selectedTime).format("HH:mm"));
    formData.append("notification", notification);
    // //@ts-expect-error:Type error
    // formData.append("name", name);

    const formJson = Object.fromEntries(formData.entries());

    const data = {
      ...formJson,
      service: Number(formJson.service),
      staff: Number(formJson.staff),
      business: Number(formJson.business),
      name: formJson.name,
    };

    console.log("Apppointments", data);
    await mutateAsync(data);

    handleClose();
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setBookingFrame("start");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {isError && <Toast message={toastMessage} type="error" />}
      {isSuccess && <Toast message={toastMessage} type="success" />}
      <div className="flex flex-col w-full h-auto gap-5">
        <div className="parent h-auto">
          <div className="w-full h-72">
            <img
              className="h-full w-full rounded-lg object-cover"
              src={data?.service?.service_image}
              alt=""
            />
          </div>
        </div>
        <div className="flex flex-col mb-10 gap-y-2 md:gap-y-1">
          <h1 className="text-2xl font-medium">{data?.service?.service}</h1>
          <p className="font-light text-[#323232]">
            {data?.service?.estimated_time_string}
          </p>
          <p className="text-xl text-[#323232]">Ksh {data?.service?.price}</p>
          <button
            onClick={() => {
              handleClickOpen();
            }}
            className="bg-primary flex items-center w-max py-2 px-4 mt-2 text-white font-medium rounded-full gap-2 hover:bg-primaryHover hover:scale-[1.02] duration-100 delay-75 sm:px-8 lg:px-5"
          >
            Book Appointment
            <Image
              className="border bg-white rounded-full"
              src="/arrow-right.svg"
              alt="arrow-icon"
              width={20}
              height={20}
            />
          </button>
        </div>
      </div>
      {filteredServices.length > 0 && (
        <>
          <div className="mx-auto max-w-screen-2xl w-full mt-10 relative">
            <ShopSepartor header="You might also like" />
          </div>

          <section className="mx-auto max-w-screen-2xl w-full my-10 relative">
            <div className="w-full flex flex-wrap gap-12">
              {filteredServices?.map(
                ({
                  service_image,
                  service,
                  id,
                  location,
                  price,
                }: DynamicObject) => (
                  <Explorer
                    key={id}
                    imageUrl={service_image}
                    shopName={service}
                    location={location}
                    href={id}
                    booking={true}
                    btnText="Book Appointment"
                    price={price}
                    rating={data?.business?.rating}
                  />
                )
              )}
            </div>
          </section>
        </>
      )}
      <Dialog
        maxWidth="lg"
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogContent style={{ padding: "20px" }}>
          {bookingFrame === "start" && (
            <div className="w-full flex flex-col gap-y-10">
              <h1 className="text-xl font-semibold">Book Appointment</h1>
              <div className="gap-y-10 flex flex-col">
                <div className="flex-col flex max-w-[336px] gap-y-3">
                  {data?.staff?.length === 0 && (
                    <p className="text-lg text-red-300">
                      Staff for this shop not available
                    </p>
                  )}
                  <FormControl>
                    <InputLabel
                      className="text-[#0F1C35] text-lg font-bold"
                      id="demo-simple-select-label"
                    >
                      Select Service Provider
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={staff}
                      label="Select Service Provider"
                      onChange={handleChange}
                    >
                      {data?.staff?.map(({ f_name, id }: DynamicObject) => (
                        <MenuItem key={id} value={id}>
                          {f_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="flex flex-row gap-x-5">
                  {daysData.map(({ day, date, slots, dateObj }, index) => (
                    <div
                      key={index}
                      className={`px-4 py-2 flex flex-col gap-y-4 items-center justify-center cursor-pointer border-2 rounded-lg ${
                        activeSelect === index
                          ? "border-[#DB1471]"
                          : "border-[#F2F2F2] hover:bg-background hover:scale-[1.02]"
                      }`}
                      onClick={() => handleDaySelect(index, dateObj)}
                    >
                      <p className="text-[14px] text-[#1C1C1C] font-normal">
                        {day}
                      </p>
                      <p className="text-[14px] text-[#1C1C1C] font-normal">
                        {date}
                      </p>
                      <p
                        className={`text-[11px] hidden text-center max-w-[80px] ${
                          slots > 10
                            ? "text-[#14B339]"
                            : slots >= 5
                            ? "text-[#FF9F0A]"
                            : "text-[#E5352B]"
                        } font-medium`}
                      >
                        {slots} available slots
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex-col flex max-w-[336px] gap-y-3">
                  <InputLabel
                    className="text-[#0F1C35] text-lg font-bold"
                    id="demo-simple-select-label"
                  >
                    Select Time
                  </InputLabel>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      label="Select Time"
                      value={selectedTime}
                      onChange={handleTimeChange}
                      // shouldDisableTime={shouldDisableTime}
                    />
                  </LocalizationProvider>
                </div>
                <div className="flex flex-col gap-3 lg:flex-row justify-end">
                  <Button
                    label="Cancel"
                    className=" border border-primary rounded-sm py-1 lg:py-0 text-sm lg:text-base lg:px-6 xl:px-8 hover:bg-primary hover:text-white transition-all ease-in-out"
                    onClick={() => {
                      handleClose();
                    }}
                  />
                  <Button
                    label="Book Appointment"
                    className=" bg-primary rounded-sm flex items-center gap-2 py-2 lg:p-4 justify-center text-white text-sm lg:text-base"
                    onClick={() => {
                      setBookingFrame("finish");
                    }}
                    disabled={data?.staff?.length === 0}
                    variant="primary"
                  >
                    <p>Confirm Appointment</p>
                    <Image
                      className="border bg-white ml-3 rounded-full"
                      src="/arrow-right.svg"
                      alt="arrow-icon"
                      width={20}
                      height={20}
                    />
                  </Button>
                </div>
              </div>
            </div>
          )}
          {bookingFrame === "finish" && (
            <div className="flex flex-col gap-y-6">
              <h1 className="text-2xl font-semibold">Additional information</h1>
              <p>Haircut appointment</p>
              <div className="flex flex-row gap-x-2">
                <div className="flex flex-row gap-x-1 items-center">
                  <CalendarIcon />
                  <p className="text-sm">
                    {dayjs(new Date(selectedDay)).format("MMM D")}
                  </p>
                </div>
                <div className="flex flex-row gap-x-1 items-center">
                  <TimeIcon />
                  <p className="text-sm">
                    {dayjs(new Date(selectedTime)).format("LT")}
                  </p>
                </div>
              </div>
              <input
                type="name"
                id="name"
                name="name"
                className="border-[#D9D9D9] border bg-[#FAFDFF] text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Client name"
                required
              />
              <input
                type="tel"
                id="phone"
                name="phone"
                className="border-[#D9D9D9] border bg-[#FAFDFF] text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Phone Number"
                required
              />
              <input
                type="email"
                id="email"
                name="email"
                className="border-[#D9D9D9] border bg-[#FAFDFF] text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="example@example.com"
                required
              />
              <input
                type="text"
                id="additional_info"
                name="comment"
                className="border-[#D9D9D9] border bg-[#FAFDFF] text-gray-900 text-sm rounded-lg h-[96px] block w-full p-2"
                placeholder="Additional information"
                required
              />
              {/* <p>How do you want to be notified?</p>
              <div className="flex flex-row items-center gap-x-3">
                <div className="flex items-center">
                  <input
                    id="default-radio-1"
                    type="radio"
                    value="sms"
                    name="notification"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    checked={notification === "sms"}
                    onChange={handleNotificationChange}
                  />
                  <label className="ms-2 text-sm font-medium text-gray-900">
                    SMS
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="default-radio-2"
                    type="radio"
                    value="whatsapp"
                    name="notification"
                    className="w-4 h-4 text-[#7F56D9] bg-[#7F56D9] border-[#7F56D9]"
                    checked={notification === "whatsapp"}
                    onChange={handleNotificationChange}
                  />
                  <label className="ms-2 text-sm font-medium text-gray-900">
                    Whatsapp
                  </label>
                </div>
              </div> */}
              <div className="flex flex-row gap-x-4 justify-between">
                <Button
                  label="Cancel"
                  onClick={() => {
                    handleClose();
                    setBookingFrame("start");
                  }}
                  variant="outline"
                />
                <Button
                  type="submit"
                  label="Book Appointment"
                  variant="primary"
                  disabled={isPendingBookAppointment}
                >
                  <p>Confirm Appointment</p>
                  {isPendingBookAppointment ? (
                    <Loader />
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
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SingleService;
