import AllShopsHero from "@/components/AllShopsHero";
import Explorer from "@/components/Explorer";
import { sliderDataTwo } from "@/components/types";
import React from "react";

const AllShops = () => {
  return (
    <div>
      <AllShopsHero />
      <div className="w-full h-auto p-5 flex flex-col  gap-5 lg:gap-10 lg:p-20">
        <h2 className=" text-[#0F1C35] text-2xl  sm:text-4xl">Popular Shops</h2>
      </div>
      <section className="pb-16 flex justify-center lg:px-20 lg:pb-16 w-full ">
        <div className="w-full flex flex-wrap justify-center gap-12 center ">
          {sliderDataTwo?.map(({ imageUrl, shopName }, index) => (
            <Explorer key={index} imageUrl={imageUrl} shopName={shopName} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default AllShops;
