import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setSearchQuery } from "@/store/searchSlice";
import LocationIcon from "@/ui/icons/location";
import SearchIcon from "@/ui/icons/search";
import React, { ChangeEvent, useState } from "react";

interface ServiceHeroProps {
  onSearch?: (service: string, shop: string) => void;
}

const ServiceHero: React.FC<ServiceHeroProps> = ({ onSearch }) => {
  const dispatch = useAppDispatch();

  const [service, setService] = useState("");
  const [shop, setShop] = useState("Nairobi");

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
  return (
    <section className="h-auto md:bg-secondary">
      <div className="grid md:h-[90vh] w-full mx-auto lg:gap-8 xl:gap-0  lg:grid-cols-2">
        <div className="mr-auto md:px-16 px-4 md:place-self-center w-full">
          <p className="text-xs md:text-lg font-semibold uppercase md:text-white pb-4 md:pb-0">
            Hair Salon, Barber shop, spa, makeup
          </p>
          <h1 className="max-w-lg mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-primary ">
            Find a service close to you
          </h1>
          <p className="max-w-lg mb-6 font-light text-white lg:mb-8 md:text-lg  dark:text-gray-400">
            Looking for assistance nearby? Use our service locator to find
            support options close to your location.
          </p>
          <div className="flex bg-white rounded-md px-4 py-2 w-full">
            <div className="flex flex-row items-center gap-1 w-2/5">
              <SearchIcon />
              <input
                type="text"
                placeholder="What service are you looking for?"
                className="py-2 px-4 text-black focus:outline-none w-full"
                value={service}
                onChange={handleServiceChange}
              />
            </div>
            <div className="flex  flex-row items-center gap-1 w-2/5">
              <LocationIcon />
              <input
                type="text"
                placeholder="Location"
                className="py-2 px-4  text-black focus:outline-none w-full"
                value={shop}
                defaultValue="Nairobi"
                onChange={handleShopChange}
              />
            </div>
            <button
              onClick={handleClick}
              className="bg-primary w-1/5 hover:bg-primaryHover text-sm md:text-base text-white font-bold delay-75 duration-100 md:py-2 md:px-4 rounded-r-md"
            >
              Search
            </button>
          </div>
        </div>
        <div
          className="relative lg:mt-0  lg:flex hidden md:block"
          style={{
            backgroundImage: "url('/findservice.svg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="absolute w-full h-full left-0 top-0 inset-0 bg-gradient-to-r from-secondary from-10% to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;
