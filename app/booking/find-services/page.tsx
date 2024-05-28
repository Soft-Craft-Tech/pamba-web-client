"use client";
import * as React from "react";
import ServiceHero from "@/components/service-hero";
import { CategoryCard } from "@/components/core/cards/categoryCard";
import Separator from "@/components/shared/sectionSeparators/separator";
import FindShopsCards from "@/components/FindShopsCards";
import ArrowBack from "@/ui/icons/arrow-back";
import ShopSepartor from "@/components/shared/sectionSeparators/shopsSeparator";
import Explorer from "@/components/Explorer";
import Image from "next/image";
import { useGetClientServices } from "@/app/api/services";
import { useAppSelector } from "@/hooks";
import { RootState } from "@/store/store";
import { useGetAllBusinesses } from "@/app/api/businesses";
import { DynamicObject } from "@/components/types";

const FindServices: React.FC = () => {
  const { data } = useGetClientServices();
  console.log("Here", data?.services);
  const { data: allBusinessesData } = useGetAllBusinesses();
  const [filteredServices, setFilteredServices] = React.useState(
    data?.services
  );
  const {
    search: { searchQuery },
  } = useAppSelector((state: RootState) => state);
  const [search, setSearch] = React.useState(false);

  console.log(filteredServices, "filteredServices");

  const handleSearch = (service: string, location: string) => {
    const searchQuery = `${service.toLowerCase()} ${location.toLowerCase()}`;
    const filtered = data?.services?.filter((item: DynamicObject) => {
      const businessInfo = item?.businessInfo;
      const serviceInfo = item?.serviceInfo;
      if (!businessInfo || !serviceInfo) {
        return false;
      }
      const businessLocation = businessInfo?.location?.toLowerCase() || "";
      const serviceNames = serviceInfo?.service?.toLowerCase() || "";
      if (!businessLocation || !serviceNames) {
        return false;
      }
      const itemString = `${serviceNames} ${businessLocation}`.toLowerCase();
      return itemString.includes(searchQuery);
    });
    setFilteredServices(filtered);
    setSearch(true);
  };
  if (search)
    return (
      <div className="mx-auto max-w-screen-2xl px-4 w-full my-10 relative">
        <div
          className="flex flex-row gap-x-3 cursor-pointer mb-4 px-4"
          onClick={() => setSearch(false)}
        >
          <div>
            <ArrowBack />
          </div>
          <p>Back</p>
        </div>
        <div className="flex flex-row gap-x-3 my-10 px-4">
          <ShopSepartor header={` Search Results for ${searchQuery}`} />
        </div>
        <div className="w-full flex flex-wrap justify-evenly gap-12">
          {filteredServices?.map(({ businessInfo, serviceInfo }: any) => (
            <Explorer
              key={serviceInfo?.id}
              imageUrl={businessInfo?.profile_img}
              shopName={businessInfo?.business_name}
              price={serviceInfo?.price}
              rating={businessInfo?.rating}
              btnText="Book Appointment"
              booking={true}
              href={serviceInfo?.id}
            />
          ))}
        </div>
      </div>
    );
  return (
    <div>
      <ServiceHero onSearch={handleSearch} />
      <div
        className="mx-auto flex flex-col items-center justify-center py-16 max-w-screen-xl
         w-full"
      >
        <Separator
          btnText={"SERVICE CATEGORIES"}
          header={"Discover Your Ultimate Beauty and wellness Destination"}
        />
        <section className="pb-16 flex justify-center lg:px-20 lg:pb-16 w-full lg:w-2/3">
          <div className="w-full flex flex-wrap gap-12 justify-evenly">
            <CategoryCard img="/barberSalon.svg" text="Barbersalon" />
            <CategoryCard img="/make-up.svg" text="Barbersalon" />
            <CategoryCard img="/wedding-stylist.svg" text="Barbersalon" />
            <CategoryCard img="/massage-spa.svg" text="Barbersalon" />
            <CategoryCard img="/tattoo-parlor.svg" text="Barbersalon" />
            <CategoryCard img="/makestar.svg" text="Barbersalon" />
          </div>
        </section>
        <FindShopsCards sliderData={allBusinessesData?.businesses} />
        <Separator
          btnText={"WHY US"}
          header={"We are experienced in making you very beautiful"}
        />
        <div>
          <Image
            className="w-full px-2 md:px-4 xl:px-0"
            src="/whyUs.svg"
            alt="pamba app"
            width={50}
            height={20}
          />
        </div>
      </div>
    </div>
  );
};

export default FindServices;
