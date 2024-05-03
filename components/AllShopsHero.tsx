import FilterIcon from "@/ui/icons/filter";
import LocationIcon from "@/ui/icons/location";
import SearchIcon from "@/ui/icons/search";
import React from "react";

const AllShopsHero = () => {
  const filterBtn = [
    "BarberShop",
    "Salon",
    "Spa",
    "Stylist",
    "Makeup",
    "Waxing",
    "Nail Parlor",
  ];
  return (
    <section className="h-auto">
      <div
        className="w-full px-10 flex flex-col items-center h-[60vh] justify-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/all-shops.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <p className="text-white text-[50px] font-bold max-w-[900px] text-center">
          Discover Your Perfect Look: Explore Services Near You
        </p>
        <div className="flex bg-white w-full mt-4 justify-between max-w-[940px] rounded-md px-4 py-2">
          <div className="flex flex-row w-3/4">
            <div className="flex flex-row items-center gap-1">
              <SearchIcon />
              <input
                type="text"
                placeholder="Service"
                className="py-2 px-4 text-black focus:outline-primary"
              />
            </div>
            <div className="flex flex-row items-center w-full gap-1">
              <LocationIcon />
              <input
                type="text"
                placeholder="Shop"
                className="py-2 px-4 w-full text-black focus:outline-primary"
              />
            </div>
          </div>
          <button className="bg-primary hover:bg-primary text-white font-bold py-2 px-4 rounded-r-md">
            Search
          </button>
        </div>
        <div className="flex flex-row mt-10 w-full max-w-[800px] justify-between">
          <button className="flex items-center justify-center bg-[#00000040] p-4 rounded-full">
            <FilterIcon />
          </button>
          {filterBtn.map((text, index) => (
            <button
              key={index}
              className="flex items-center text-white font-bold justify-center bg-[#00000040] p-4 rounded-full"
            >
              {text}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllShopsHero;
