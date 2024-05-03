import LocationIcon from "@/ui/icons/location";
import SearchIcon from "@/ui/icons/search";
import React, { ChangeEvent, useState } from "react";

interface Service {
  name: string;
  location: string;
}

interface ServiceHeroProps {
  onSearch?: (service: string, shop: string) => void;
}

const ServiceHero: React.FC<ServiceHeroProps> = ({ onSearch }) => {
  const [service, setService] = useState("");
  const [shop, setShop] = useState("");

  const handleServiceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setService(event.target.value);
  };

  const handleShopChange = (event: ChangeEvent<HTMLInputElement>) => {
    setShop(event.target.value);
  };

  const handleClick = () => {
    if (onSearch) {
      onSearch(service, shop);
    }
  };
  return (
    <section className="h-auto bg-secondary">
      <div className="grid h-[90vh] w-full mx-auto lg:gap-8 xl:gap-0  lg:grid-cols-2">
        <div className="mr-auto px-16 place-self-center w-full">
          <p className="text-lg uppercase text-white">
            Hair Salon,  Barber shop,  spa,  makeup
          </p>
          <h1 className="max-w-lg mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-primary ">
            Find a service close to you
          </h1>
          <p className="max-w-lg mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            There are many variation of passages are Ipsum available, majority
            have suffered alteration in some form.
          </p>
          <div className="flex bg-white rounded-md px-4 py-2 w-full">
            <div className="flex flex-row items-center gap-1 w-2/5">
              <SearchIcon />
              <input
                type="text"
                placeholder="Service"
                className="py-2 px-4 text-black focus:outline-none w-full"
                value={service}
                onChange={handleServiceChange}
              />
            </div>
            <div className="flex flex-row items-center gap-1 w-2/5">
              <LocationIcon />
              <input
                type="text"
                placeholder="Shop"
                className="py-2 px-4  text-black focus:outline-none w-full"
                value={shop}
                onChange={handleShopChange}
              />
            </div>
            <button
              onClick={handleClick}
              className="bg-primary w-1/5 hover:bg-primary  text-white font-bold py-2 px-4 rounded-r-md"
            >
              Search
            </button>
          </div>
        </div>
        <div
          className="relative lg:mt-0  lg:flex"
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
