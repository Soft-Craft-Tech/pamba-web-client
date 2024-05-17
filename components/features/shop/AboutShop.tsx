import { useGetSingleBusiness } from "@/app/api/businesses";
import Explorer from "@/components/Explorer";
import ShopSepartor from "@/components/shared/sectionSeparators/shopsSeparator";
import { sliderDataTwo } from "@/components/types";
import LocationIcon from "@/ui/icons/location";
import RatingIcon from "@/ui/icons/rating";
import React from "react";

const AboutShop: React.FC<{ slug: string }> = ({ slug }) => {
  const { data } = useGetSingleBusiness(slug);
  return (
    <div className="flex flex-col gap-y-4 mt-4">
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
      <ShopSepartor header="Popular Shops" />
      <div className="w-full flex flex-wrap justify-center gap-12 3xl:max-w-[80%] ">
        {sliderDataTwo?.map(({ imageUrl, shopName }, index) => (
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
    </div>
  );
};

export default AboutShop;
