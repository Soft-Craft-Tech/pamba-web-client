import { useGetAllServices, useGetSingleBusiness } from "@/app/api/businesses";
import Explorer from "@/components/Explorer";
import ShopSepartor from "@/components/shared/sectionSeparators/shopsSeparator";
import { DynamicObject, sliderDataTwo } from "@/components/types";
import LocationIcon from "@/ui/icons/location";
import RatingIcon from "@/ui/icons/rating";
import { getUser } from "@/utils/auth";
import Link from "next/link";
import React from "react";

const AboutShop: React.FC<{ slug: string }> = ({ slug }) => {
  const { data } = useGetSingleBusiness(slug);
  const { data: shopServices } = useGetAllServices(slug);

  return (
    <div className="flex flex-col w-full gap-y-10 mt-4">
      <div className="flex flex-col gap-3">
        <h2 className="text-3xl font-semibold"> {data?.business?.name}</h2>
        <div>
          {data?.business && <Link target="_blank" className="text-primary border-[0.1px] border-primary py-1 px-3 rounded-full text-sm" href={data?.business?.google_map && data?.business?.google_map}>Directions</Link>}
        </div>
        <div className="flex flex-row gap-x-3">
          <LocationIcon />
          <p className="text-sm font-light"> {data?.business?.location}</p>
        </div>
        <div className="flex flex-row items-center gap-x-2">
          <p className="font-semibold text-xl">{data?.business?.rating}</p>
          <div className="flex gap-1">
            <RatingIcon fill="#FF9F0A" />
            <RatingIcon fill="#FF9F0A" />
            <RatingIcon fill="#FF9F0A" />
            <RatingIcon fill="#FF9F0A" />
            <RatingIcon fill="#FF9F0A" />
          </div>
        </div>
        <p className="max-w-[800px] text-sm mt-2">{data?.business?.description}</p>
      </div>
      <div className="flex flex-col gap-5">
        <ShopSepartor header="Our Services" />
        <div className="w-full flex flex-wrap gap-12 3xl:max-w-[80%] ">
          {shopServices?.services?.map(
            ({
              service_image,
              service,
              id,
              location,
              slug,
              price,
            }: DynamicObject) => (
              <Explorer
                key={id}
                imageUrl={service_image}
                shopName={service}
                location={location}
                href={slug}
                booking={true}
                btnText="Book Appointment"
                price={price}
                rating={data?.business?.rating}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutShop;
