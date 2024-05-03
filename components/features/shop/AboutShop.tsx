import Explorer from "@/components/Explorer";
import ShopSepartor from "@/components/shared/sectionSeparators/shopsSeparator";
import { sliderDataTwo } from "@/components/types";
import LocationIcon from "@/ui/icons/location";
import RatingIcon from "@/ui/icons/rating";
import React from "react";

const AboutShop = () => {
  return (
    <div className="flex flex-col gap-y-4 mt-4">
      <div className="flex flex-row items-center gap-x-3">
        <p>4.5</p>
        <RatingIcon fill="#FF9F0A" />
      </div>
      <p>Beauty Square Salon</p>
      <div className="flex flex-row gap-x-3">
        <LocationIcon />
        <p>Lavington area, Nairobi. Kenya</p>
      </div>
      <p className="max-w-[800px]">
        We believe that beauty is not just about how you look, but also how you
        feel. Our salon is more than just a place to get your hair done or your
        nails painted – it's a sanctuary where you can escape the stresses of
        daily life and indulge in a moment of pampering and self-care.
      </p>
      <ShopSepartor header="Popular Shops" />
      <div className="w-full flex flex-wrap justify-center gap-12 3xl:max-w-[80%] ">
        {sliderDataTwo?.map(({ imageUrl, shopName }, index) => (
          <Explorer
            key={index}
            imageUrl={imageUrl}
            shopName={shopName}
            btnText="Book Appointment"
            booking={true}
          />
        ))}
      </div>
    </div>
  );
};

export default AboutShop;
