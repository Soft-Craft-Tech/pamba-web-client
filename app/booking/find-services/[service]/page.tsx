/* eslint-disable @next/next/no-img-element */
"use client";
import ArrowBack from "@/ui/icons/arrow-back";
import { useRouter } from "next/navigation";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import ShopSepartor from "@/components/shared/sectionSeparators/shopsSeparator";
import { sliderDataTwo } from "@/components/types";
import Explorer from "@/components/Explorer";
import { sliderDatThree } from "@/components/types/fakeData";

interface PageProps {
  params: {
    service: string;
  };
}

const Page: React.FC<PageProps> = ({ params }) => {
  const router = useRouter();
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
        <Link
          href="/booking/find-services"
          className="bg-primary flex items-center w-max py-2 px-4 mt-5 text-white font-medium rounded-full gap-2 sm:py-4 sm:px-8 lg:py-3 lg:px-5 z-10"
        >
          Book Appointment
          <Image
            className="border bg-white rounded-full"
            src="/arrow-right.svg"
            alt="arrow-icon"
            width={20}
            height={20}
          />
        </Link>
      </div>
      <div className="mx-auto max-w-screen-2xl w-full mt-10 relative">
        <ShopSepartor header="You might also like" />
      </div>
      <section className="mx-auto max-w-screen-2xl w-full mt-10 relative">
        <div className="w-full flex flex-wrap justify-center gap-12">
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
    </div>
  );
};

export default Page;
