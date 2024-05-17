"use client";
import { useGetAllBusinesses } from "@/app/api/businesses";
import { useGetClientServices } from "@/app/api/services";
import AllShopsHero from "@/components/AllShopsHero";
import Explorer from "@/components/Explorer";
import ShopSepartor from "@/components/shared/sectionSeparators/shopsSeparator";
import { DynamicObject, sliderDataTwo } from "@/components/types";
import * as React from "react";

const AllShops: React.FC = () => {
  const { data } = useGetClientServices();
  const { data: allBusinessesData } = useGetAllBusinesses();
  return (
    <div>
      <AllShopsHero />
      <div className="mx-auto max-w-screen-xl w-full mt-10 relative">
        <ShopSepartor header="Popular Shops" />
      </div>
      <section className="mx-auto max-w-screen-xl w-full mt-10 relative">
        <div className="w-full flex flex-wrap justify-center gap-12 3xl:max-w-[80%] ">
          {allBusinessesData?.businesses
            ?.slice(0, 9)
            ?.map(
              ({
                profile_img,
                business_name,
                id,
                location,
                slug,
              }: DynamicObject) => (
                <Explorer
                  key={id}
                  imageUrl={profile_img}
                  shopName={business_name}
                  location={location}
                  href={slug}
                />
              )
            )}
        </div>
      </section>
      <div className="mx-auto max-w-screen-xl w-full mt-10 relative">
        <ShopSepartor header="Recomended Services" />
      </div>
      <section className="mx-auto max-w-screen-xl w-full my-10 relative">
        <div className="w-full flex flex-wrap justify-center gap-12 3xl:max-w-[80%] ">
          {data?.services?.map(
            ({
              business_profile_image,
              business_name,
              business_slug,
              id,
            }: DynamicObject) => (
              <Explorer
                key={id}
                imageUrl={business_profile_image}
                shopName={business_name}
                btnText="Book Appointment"
                booking={true}
                href={business_slug}
              />
            )
          )}
        </div>
      </section>
    </div>
  );
};

export default AllShops;
