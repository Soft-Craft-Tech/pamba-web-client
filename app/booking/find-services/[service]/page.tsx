/* eslint-disable @next/next/no-img-element */
"use client";
import ArrowBack from "@/ui/icons/arrow-back";
import { useRouter } from "next/navigation";
import * as React from "react";
import Image from "next/image";
import ShopSepartor from "@/components/shared/sectionSeparators/shopsSeparator";
import Explorer from "@/components/Explorer";
import { sliderDatThree } from "@/components/types/fakeData";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import CalendarIcon from "@/ui/icons/calendar-con";
import TimeIcon from "@/ui/icons/time-icon";
import Button from "@/ui/button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useGetSingleService } from "@/app/api/services";

const daysData = [
  { day: "Fri", date: "03 Feb", slots: 16 },
  { day: "Sun", date: "03 Feb", slots: 2 },
  { day: "Mon", date: "03 Feb", slots: 2 },
  { day: "Tue", date: "03 Feb", slots: 5 },
  { day: "Wed", date: "03 Feb", slots: 4 },
  { day: "Thur", date: "03 Feb", slots: 8 },
  { day: "Sat", date: "03 Feb", slots: 7 },
];

interface PageProps {
  params: {
    service: string;
  };
}

const Page: React.FC<PageProps> = ({ params }) => {
  const { data } = useGetSingleService(params?.service);
  console.log(data);
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState("");

  const [activeSelect, setActiveSelect] = React.useState(0);

  const [bookingFrame, setBookingFrame] = React.useState("start");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  return (
    <div className="mx-auto max-w-screen-2xl px-4 w-full mt-10 relative">
      <div
        className="flex flex-row gap-x-3 cursor-pointer mb-4 px-4"
        onClick={() => router.back()}
      >
        <div>
          <ArrowBack />
        </div>
        <p>Back</p>
      </div>
      {params.service}

      <div className="parent max-h-[630px] grid grid-cols-2 md:grid-cols-3 grid-rows-2 gap-1">
        <div className="div1 col-span-1 row-span-1">
          <img
            className="h-max-full max-w-full rounded-lg"
            src="/imageOne.png"
            alt=""
          />
        </div>
        <div className="parent grid grid-cols-1 grid-rows-2 gap-x-1 gap-y-2">
          <img
            className="h-auto max-w-full rounded-lg"
            src="/imageTwo.png"
            alt=""
          />
          <img
            className="h-auto max-w-full rounded-lg"
            src="/imageThree.png"
            alt=""
          />
        </div>
        <div className="parent grid grid-cols-1 grid-rows-1 md:grid-rows-2 gap-x-1 gap-y-2">
          <img
            className="h-auto max-w-full rounded-lg"
            src="/imageTwo.png"
            alt=""
          />
          <img
            className="h-auto max-w-full rounded-lg"
            src="/imageThree.png"
            alt=""
          />
        </div>
      </div>
      <div className="flex flex-col mb-10 gap-y-2 md:gap-y-4">
        <h1 className="text-3xl font-bold">Stylish hair cut</h1>
        <p className="text-lg text-[#323232]">
          1 hour 15 mins - 1 hour 40 mins
        </p>
        <p className="text-[30px] text-[#323232]">Ksh 1000</p>
        <p>
          Feel the thrill of a fresh start as our talented stylists bring your
          vision to life with our signature stylish haircut. We're not just
          cutting hair; we're sculpting confidence, one snip at a time. Whether
          you're after a daring makeover or a subtle refinement, our team is
          here to listen, advise, and create a look that's uniquely you. Say
          goodbye to the ordinary and hello to the extraordinary – step into our
          salon and let's make magic happen together!
        </p>
        <button
          onClick={() => {
            handleClickOpen();
          }}
          className="bg-primary flex items-center w-max py-2 px-4 mt-5 text-white font-medium rounded-full gap-2 sm:py-4 sm:px-8 lg:py-3 lg:px-5"
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
      <div className="mx-auto max-w-screen-2xl w-full mt-10 relative">
        <ShopSepartor header="You might also like" />
      </div>
      <section className="mx-auto max-w-screen-2xl w-full my-10 relative">
        <div className="w-full flex flex-wrap justify-between gap-12">
          {sliderDatThree?.map(({ imageUrl, shopName }, index) => (
            <Explorer
              key={index}
              imageUrl={imageUrl}
              shopName={shopName}
              btnText="Book Appointment"
              booking={true}
              href="/booking/find-services/massage"
            />
          ))}
        </div>
      </section>
      <Dialog
        maxWidth="lg"
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogContent style={{ padding: "20px" }}>
          {bookingFrame === "start" && (
            <div className="w-full flex flex-col gap-y-10">
              <h1 className="text-xl font-semibold">Book Appointment</h1>
              <div className="gap-y-10 flex flex-col">
                <div className="flex-col flex max-w-[336px]  gap-y-3">
                  <InputLabel
                    className="text-[#0F1C35] tetx-lg font-bold"
                    id="demo-simple-select-label"
                  >
                    Select Service Provider
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Olivia Rahy"
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </div>
                <div className="flex flex-row gap-x-5">
                  {daysData.map(({ day, date, slots }, index) => (
                    <div
                      key={index}
                      className={`px-4 py-2 flex flex-col gap-y-4 items-center justify-center cursor-pointer border-2 rounded-lg ${
                        activeSelect === index
                          ? "border-[#DB1471]"
                          : "border-[#F2F2F2]"
                      }`}
                      onClick={() => {
                        setActiveSelect(index);
                      }}
                    >
                      <p className="text-[14px] text-[#1C1C1C] font-normal">
                        {day}
                      </p>
                      <p className="text-[14px] text-[#1C1C1C] font-normal">
                        {date}
                      </p>
                      <p
                        className={`text-[11px] text-center max-w-[80px] ${
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
                <div className="flex-col flex max-w-[336px]  gap-y-3">
                  <InputLabel
                    className="text-[#0F1C35] tetx-lg font-bold"
                    id="demo-simple-select-label"
                  >
                    Select Time
                  </InputLabel>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker label="8:00 AM" name="startTime" />
                  </LocalizationProvider>
                </div>
                <div className="flex flex-row justify-end gap-x-4">
                  <Button
                    label="Cancel"
                    variant="outline"
                    onClick={() => {
                      handleClose();
                    }}
                  />
                  <Button
                    label="Book Appointment"
                    onClick={() => {
                      setBookingFrame("finish");
                    }}
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
              <p>Haircut appointment </p>
              <div className="flex flex-row gap-x-2">
                <div className="flex flex-row gap-x-1">
                  <CalendarIcon />
                  <p>Fri, 3 March</p>
                </div>
                <div className="flex flex-row gap-x-1">
                  <TimeIcon />
                  <p>2:00PM EAT</p>
                </div>
              </div>
              <input
                type="text"
                id="first_name"
                className="border-[#D9D9D9] border bg-[#FAFDFF] text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                placeholder="John"
                required
              />
              <input
                type="text"
                id="first_name"
                className="border-[#D9D9D9] border bg-[#FAFDFF] text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
                placeholder="John"
                required
              />
              <input
                type="text"
                id="first_name"
                className="border-[#D9D9D9] border bg-[#FAFDFF] text-gray-900 text-sm rounded-lg h-[96px]  block w-full p-2.5 "
                placeholder="John"
                required
              />
              <p>How do you want to be notified?</p>
              <div className="flex flex-row items-center gap-x-3">
                <div className="flex items-center">
                  <input
                    id="default-radio-1"
                    type="radio"
                    value=""
                    name="default-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                  />
                  <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    SMS
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    checked
                    id="default-radio-2"
                    type="radio"
                    value=""
                    name="default-radio"
                    className="w-4 h-4 text-[#7F56D9] bg-[#7F56D9] border-[#7F56D9]"
                  />
                  <label className="ms-2 text-sm font-medium text-gray-900">
                    Whatsapp
                  </label>
                </div>
              </div>
              <div className="flex flex-row gap-x-4 justify-between">
                <Button
                  label="Cancel"
                  onClick={() => {
                    handleClose();
                    setBookingFrame("start");
                  }}
                  variant="outline"
                />
                <Button label="Book Appointment" variant="primary">
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
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Page;
