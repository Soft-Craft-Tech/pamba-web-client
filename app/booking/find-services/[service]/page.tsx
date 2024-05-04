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

interface PageProps {
  params: {
    service: string;
  };
}

const Page: React.FC<PageProps> = ({ params }) => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState("");

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
      <section className="mx-auto max-w-screen-2xl w-full mt-10 relative">
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
          <div>
            <h1>Book Appointment</h1>
            <p>Select service provider </p>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>
          {/* <div className="flex flex-col gap-y-6">
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
                  Default radio
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
                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Checked state
                </label>
              </div>
            </div>
            <div className="flex flex-row gap-x-4 justify-between">
              <Button label="Cancel" variant="outline" />
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
          </div> */}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Page;
