import AllShopsHero from "@/components/AllShopsHero";
import Explorer from "@/components/Explorer";
import ShopSepartor from "@/components/shared/sectionSeparators/shopsSeparator";
import { sliderDataTwo } from "@/components/types";
import React from "react";

const AllShops = () => {
  return (
    <div>
      <AllShopsHero />
      <div className="mx-auto max-w-screen-xl w-full mt-10 relative">
        <ShopSepartor header="Popular Shops" />
      </div>
      <section className="mx-auto max-w-screen-xl w-full mt-10 relative">
        <div className="w-full flex flex-wrap justify-center gap-12 3xl:max-w-[80%] ">
          {sliderDataTwo?.map(({ imageUrl, shopName }, index) => (
            <Explorer key={index} imageUrl={imageUrl} shopName={shopName} />
          ))}
        </div>
      </section>
      <div className="mx-auto max-w-screen-xl w-full mt-10 relative">
        <ShopSepartor header="Recomended Services" />
      </div>
      <section className="mx-auto max-w-screen-xl w-full mt-10 relative">
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
