import AllShopsHero from "@/components/AllShopsHero";
import Explorer from "@/components/Explorer";
import ShopSepartor from "@/components/shared/sectionSeparators/shopsSeparator";
import { sliderDataTwo } from "@/components/types";
import React from "react";

const AllShops = () => {
  return (
    <div>
      <AllShopsHero />
      <ShopSepartor header="Popular Shops" />
      <section className="pb-16 flex justify-center lg:px-20 lg:pb-16 w-full ">
        <div className="w-full flex flex-wrap justify-center gap-12 3xl:max-w-[80%] ">
          {sliderDataTwo?.map(({ imageUrl, shopName }, index) => (
            <Explorer key={index} imageUrl={imageUrl} shopName={shopName} />
          ))}
        </div>
      </section>
      <ShopSepartor header="Recomended Services" />
      <section className="pb-16 flex justify-center lg:px-20 lg:pb-16 w-full ">
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
      </section>
    </div>
  );
};

export default AllShops;
