import React from "react";
import Separator from "./shared/sectionSeparators/separator";
import Image from "next/image";
import Link from "next/link";
import Explorer from "./Explorer";
import { DynamicObject } from "./types";

const FindShopsCards = ({ sliderData }: { sliderData: DynamicObject[] }) => {
  return (
    <>
      <Separator
        btnText={"RECOMMENDED"}
        header={"Find premier shops and beauty centers close to you"}
      />
      <div className="flex flex-col lg:flex-row lg:w-full  justify-evenly mb-12 gap-x-4 gap-y-4">
        {sliderData
          ?.slice(0, 4)
          .map(({ profile_img, business_name, id, location, slug }) => (
            <Explorer
              key={id}
              imageUrl={profile_img}
              shopName={business_name}
              location={location}
              href={slug}
            />
          ))}
      </div>
      <Link
        href="/booking/all-shops"
        className="bg-primary flex items-center w-max py-2 px-4  text-white font-medium rounded-full gap-2 sm:py-4 sm:px-8 lg:py-3 lg:px-5 z-10"
      >
        View All Shops
        <Image
          className="border bg-white rounded-full"
          src="/arrow-right.svg"
          alt="arrow-icon"
          width={20}
          height={20}
        />
      </Link>
    </>
  );
};

export default FindShopsCards;
