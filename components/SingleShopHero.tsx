"use client";
import { useGetSingleBusiness } from "@/app/api/businesses";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  clearFilteredServices,
  setFilteredServices,
} from "@/store/filteredServicesSlice";
import { RootState } from "@/store/store";
import CancelIcon from "@/ui/icons/cancel-icon";
import SearchIcon from "@/ui/icons/search";
import React, { ChangeEvent, useState } from "react";

const SingleShopHero: React.FC<{
  slug: string;
}> = ({ slug }) => {
  const [service, setService] = useState("");
  const dispatch = useAppDispatch();
  const handleServiceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setService(event.target.value);
  };
  const { data } = useGetSingleBusiness(slug);

  const filteredServices = useAppSelector(
    (state: RootState) => state.filteredServices.filteredServices
  );

  const handleSearch = (serviceValue: string) => {
    const filtered = filteredServices?.filter(
      ({ service }: { service: string }) =>
        service.toLowerCase().includes(serviceValue.toLowerCase())
    );
    dispatch(setFilteredServices(filtered));
  };

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
        <div className="flex bg-white w-full cu mt-4 justify-between max-w-[940px] rounded-md px-4 py-2">
          <div className="flex flex-row w-3/4">
            <div className="flex flex-row items-center w-full gap-1">
              <div
                className="cursor-pointer"
                onClick={() => {
                  setService("");
                  dispatch(setFilteredServices(filteredServices));
                }}
              >
                {service === "" ? <SearchIcon /> : <CancelIcon />}
              </div>
              <input
                type="text"
                placeholder="Search Service"
                className="py-2 px-4 w-full text-black focus:outline-primary"
                value={service}
                onChange={handleServiceChange}
              />
            </div>
          </div>
          <button
            onClick={() => handleSearch(service)}
            className="bg-primary hover:bg-primary text-white font-bold py-2 px-4 rounded-md"
          >
            Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default SingleShopHero;
