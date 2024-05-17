"use client";
import { useGetSingleBusiness } from "@/app/api/businesses";
import SearchIcon from "@/ui/icons/search";
import React from "react";

const SingleShopHero: React.FC<{ slug: string }> = ({ slug }) => {
  const { data } = useGetSingleBusiness(slug);
  return (
    <section className="h-auto">
      <div
        className="w-full px-10 flex flex-col items-center h-[60vh] justify-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/singe-shop.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <p className="text-white text-[50px] font-bold max-w-[900px] text-center">
          {data?.business?.name}
        </p>
        <div className="flex bg-white w-full mt-4 justify-between max-w-[940px] rounded-md px-4 py-2">
          <div className="flex flex-row w-3/4">
            <div className="flex flex-row items-center w-full gap-1">
              <SearchIcon />
              <input
                type="text"
                placeholder="Search Service"
                className="py-2 px-4 w-full text-black focus:outline-primary"
              />
            </div>
          </div>
          <button className="bg-primary hover:bg-primary text-white font-bold py-2 px-4 rounded-md">
            Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default SingleShopHero;
