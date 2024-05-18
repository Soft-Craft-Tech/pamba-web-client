import { useGetAllServices, useGetSingleBusiness } from "@/app/api/businesses";
import Explorer from "@/components/Explorer";
import ShopSepartor from "@/components/shared/sectionSeparators/shopsSeparator";
import { DynamicObject, sliderDataTwo } from "@/components/types";
import LocationIcon from "@/ui/icons/location";
import RatingIcon from "@/ui/icons/rating";
import { getUser } from "@/utils/auth";
import React from "react";

const AboutShop: React.FC<{ slug: string }> = ({ slug }) => {
  const { data } = useGetSingleBusiness(slug);
  const { data: shopServices } = useGetAllServices(slug);

  return (
    <div className="flex flex-col w-full gap-y-4 mt-4">
      <div className="flex flex-row items-center gap-x-3">
        <p>{data?.business?.rating}</p>
        <RatingIcon fill="#FF9F0A" />
      </div>
      <p> {data?.business?.name}</p>
      <div className="flex flex-row gap-x-3">
        <LocationIcon />
        <p> {data?.business?.location}</p>
      </div>
      <p className="max-w-[800px]">{data?.business?.description}</p>
      <ShopSepartor header="Shop Services" />
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
            />
          )
        )}
      </div>
    </div>
  );
};

export default AboutShop;
