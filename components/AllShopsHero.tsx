import { useAppDispatch } from "@/hooks/redux";
import { setSearchQuery } from "@/store/searchSlice";
import FilterIcon from "@/ui/icons/filter";
import LocationIcon from "@/ui/icons/location";
import SearchIcon from "@/ui/icons/search";
import React, { ChangeEvent, useState } from "react";
import ReactSelectComponent from "@/ui/Select";

interface ServiceHeroProps {
  onSearch?: (service: string, shop: string) => void;
}

const AllShopsHero: React.FC<ServiceHeroProps> = ({ onSearch }) => {
  const dispatch = useAppDispatch();

  const [service, setService] = useState<{
    label: string;
    value: string;
  } | null>(null);

  const [shop, setShop] = useState("");
  const [location, setLocation] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const servicesOptions = [
    { label: "Barbershop", value: "Barbershop" },
    { label: "Spa", value: "Spa" },
    { label: "Stylist", value: "Stylist" },
    { label: "Makeup", value: "Makeup" },
  ];
  const locationOptios = [
    { label: "Nairobi", value: "Nairobi" },
    { label: "Mombasa", value: "Mombasa" },
    { label: "Kisumu", value: "Kisumu" },
    { label: "Nakuru", value: "Nakuru" },
    { label: "Eldoret", value: "Eldoret" },
    { label: "Thika", value: "Thika" },
    { label: "Malindi", value: "Malindi" },
    { label: "Kitale", value: "Kitale" },
    { label: "Nyeri", value: "Nyeri" },
    { label: "Machakos", value: "Machakos" },
    { label: "Meru", value: "Meru" },
    { label: "Kakamega", value: "Kakamega" },
    { label: "Naivasha", value: "Naivasha" },
    { label: "Kericho", value: "Kericho" },
    { label: "Bungoma", value: "Bungoma" },
    { label: "Embu", value: "Embu" },
    { label: "Nyahururu", value: "Nyahururu" },
    { label: "Kisii", value: "Kisii" },
    { label: "Kilifi", value: "Kilifi" },
    { label: "Homa Bay", value: "Homa Bay" },
  ];

  // const handleServiceChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setService(event.target.value);
  //   dispatch(setSearchQuery(service));
  // };

  const handleShopChange = (event: ChangeEvent<HTMLInputElement>) => {
    setShop(event.target.value);
    dispatch(setSearchQuery(shop));
  };

  const handleClick = () => {
    if (onSearch) {
      onSearch(service?.value as string, location?.value as string);
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
        <p className="text-white text-3xl md:text-[50px] leading-tight font-bold max-w-[900px] text-center">
          Discover Your Perfect Look: Explore Services Near You
        </p>
        <div className="flex bg-white w-full mt-4 gap-2 justify-between max-w-[940px] rounded-md px-4 py-2">
          <div className="flex flex-col lg:flex-row w-full gap-3">
            <div className="flex flex-row items-center gap-1 w-full">
              <SearchIcon />
              <ReactSelectComponent
                options={servicesOptions}
                placeholder="Choose a service..."
                closeMenuOnSelect
                defaultValue={service}
                className="py-2 px-4 w-full text-black focus:outline-primary"
                // @ts-ignore
                onChange={setService}
              />
              {/* <input
                type="text"
                placeholder="E.g barbershop.."
                value={service}
                onChange={handleServiceChange}
                className="py-2 px-4 w-full text-black focus:outline-primary"
              /> */}
            </div>
            <div className="flex flex-row items-center w-full gap-1">
              <LocationIcon />
              <ReactSelectComponent
                options={locationOptios}
                placeholder="Choose a location..."
                closeMenuOnSelect
                defaultValue={service}
                className="py-2 px-4 w-full text-black focus:outline-primary"
                // @ts-ignore
                onChange={setLocation}
              />
              {/* <input
                type="text"
                placeholder="Shop"
                value={shop}
                onChange={handleShopChange}
                className="py-2 px-4 w-full text-black focus:outline-primary"
              /> */}
            </div>
            <button
              onClick={() => {
                handleClick();
              }}
              className="bg-primary text-white font-bold py-2 px-4 rounded-md w-full lg:w-max duration-100 hover:bg-primaryHover"
            >
              Search
            </button>
          </div>
        </div>
        {/* <div className="lg:flex flex-row hidden mt-10 w-full max-w-[800px] justify-between">
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
        </div> */}
      </div>
    </section>
  );
};

export default AllShopsHero;
