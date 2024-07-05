import { useAppDispatch } from "@/hooks";
import { setSearchQuery } from "@/store/searchSlice";
import FilterIcon from "@/ui/icons/filter";
import LocationIcon from "@/ui/icons/location";
import SearchIcon from "@/ui/icons/search";
import React, { ChangeEvent, useState } from "react";

interface ServiceHeroProps {
  onSearch?: (service: string, shop: string) => void;
}

const AllShopsHero: React.FC<ServiceHeroProps> = ({ onSearch }) => {
  const dispatch = useAppDispatch();

  const [service, setService] = useState("");
  const [shop, setShop] = useState("");

  const handleServiceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setService(event.target.value);
    dispatch(setSearchQuery(service));
  };

  const handleShopChange = (event: ChangeEvent<HTMLInputElement>) => {
    setShop(event.target.value);
    dispatch(setSearchQuery(shop));
  };

  const handleClick = () => {
    if (onSearch) {
      onSearch(service, shop);
    }
  };
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
        className="w-full px-10 flex flex-col items-center h-[70vh] justify-center"
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
        <div className="flex bg-white w-full mt-4 gap-2 justify-between max-w-[940px] rounded-md px-4 py-2">
          <div className="flex flex-row w-full gap-3">
            <div className="flex flex-row items-center gap-1 w-full">
              <SearchIcon />
              <input
                type="text"
                placeholder="Service"
                value={service}
                onChange={handleServiceChange}
                className="py-2 px-4 w-full text-black focus:outline-primary"
              />
            </div>
            <div className="flex flex-row items-center w-full gap-1">
              <LocationIcon />
              <input
                type="text"
                placeholder="Shop"
                value={shop}
                onChange={handleShopChange}
                className="py-2 px-4 w-full text-black focus:outline-primary"
              />
            </div>
          </div>
          <button
            onClick={() => {
              handleClick();
            }}
            className="bg-primary text-white font-bold py-2 px-4 rounded-md w-max duration-100 hover:bg-primaryHover"
          >
            Search
          </button>
        </div>
        <div className="lg:flex flex-row hidden mt-10 w-full max-w-[800px] justify-between">
          <button className="flex items-center justify-center bg-[#00000040] p-4 rounded-full">
            <FilterIcon />
          </button>
          {filterBtn.map((text, index) => (
            <button
              key={index}
              className="flex items-center text-white font-bold justify-center bg-[#00000040] p-4 rounded-full hover:bg-primary duration-150 delay-75"
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
