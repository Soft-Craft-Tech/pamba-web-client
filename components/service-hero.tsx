import LocationIcon from "@/ui/icons/location";
import SearchIcon from "@/ui/icons/search";
import React from "react";

const ServiceHero = () => {
  return (
    <section className="h-auto">
      <div className="grid bg-gradient-to-r from-secondary via-secondary to-transparent  h-[90vh]  mx-auto lg:gap-8 xl:gap-0  lg:grid-cols-2">
        <div className="mr-auto  px-16 place-self-center ">
          <p className="text-lg uppercase text-white">
            Hair Salon, Barber shop, spa, makeup
          </p>
          <h1 className="max-w-lg mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-primary ">
            Find a service close to you
          </h1>
          <p className="max-w-lg mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            There are many variation of passages are Ipsum available, majority
            have suffered alteration in some form.
          </p>
          <div className="flex bg-white rounded-md px-4 py-2">
            <div className="flex flex-row items-center gap-1">
              <SearchIcon />
              <input
                type="text"
                placeholder="Service"
                className="py-2 px-4 text-black focus:outline-none"
              />
            </div>
            <div className="flex flex-row items-center gap-1">
              <LocationIcon />
              <input
                type="text"
                placeholder="Shop"
                className="py-2 px-4  text-black focus:outline-none"
              />
            </div>
            <button className="bg-primary hover:bg-primary text-white font-bold py-2 px-4 rounded-r-md">
              Search
            </button>
          </div>
        </div>
        <div
          className="hidden lg:mt-0  lg:flex"
          style={{
            backgroundImage: "url('/findservice.svg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        ></div>
      </div>
    </section>
  );
};

export default ServiceHero;
