"use client";
import { useGetAllBusinesses } from "@/app/api/businesses";
import { useGetClientServices } from "@/app/api/services";
import AllShopsHero from "@/components/AllShopsHero";
import Explorer from "@/components/Explorer";
import ShopSepartor from "@/components/shared/sectionSeparators/shopsSeparator";
import { DynamicObject } from "@/components/types";
import { useAppSelector } from "@/hooks";
import { RootState } from "@/store/store";
import ArrowBack from "@/ui/icons/arrow-back";
import * as React from "react";

const AllShops: React.FC = () => {
  const { data } = useGetClientServices();
  const { data: allBusinessesData } = useGetAllBusinesses();

  const [filteredServices, setFilteredServices] = React.useState(
    data?.services
  );

  const {
    search: { searchQuery },
  } = useAppSelector((state: RootState) => state);
  const [search, setSearch] = React.useState(false);
  const [searchedString, setSearchString] = React.useState<{
    location: string;
    service: string;
  }>({ location: "", service: "" });
  const handleSearch = (service: string, shop: string) => {
    console.log(`Logs from handleSearch: ${service}, ${shop}`);
    const filtered = data?.services?.filter(
      ({ businessInfo }: any) =>
        businessInfo?.business_name
          .toLowerCase()
          .includes(service.toLowerCase()) &&
        businessInfo?.location.toLowerCase().includes(shop.toLowerCase())
    );
    const searchTextResponse = {
      location: shop,
      service,
    };
    setSearchString(searchTextResponse);
    setFilteredServices(filtered);
    console.log(`Logs from filtered services: ${filteredServices}`);
    console.log(`Log for search query: ${searchQuery}`);

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
          <ShopSepartor
            header={` Search Results for ${searchedString.service}s in ${searchedString.location}`}
          />
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
      <AllShopsHero onSearch={handleSearch} />
      <div className="px-5 sm:px-10 lg:px-20 2xl:px-0">
        <div className="mx-auto max-w-screen-xl w-full mt-10 relative">
          <ShopSepartor header="Popular Shops" />
        </div>
        <section className="mx-auto max-w-screen-xl w-full mt-10 relative">
          <div className="w-full flex flex-wrap gap-10">
            {allBusinessesData?.businesses
              ?.slice(0, 9)
              ?.map(
                ({
                  profile_img,
                  business_name,
                  id,
                  location,
                  slug,
                  reviews,
                  rating,
                }: DynamicObject) => (
                  <Explorer
                    key={id}
                    imageUrl={profile_img}
                    shopName={business_name}
                    location={location}
                    href={slug}
                    rating={rating}
                    reviews={reviews}
                  />
                )
              )}
          </div>
        </section>
      </div>
      <div className="px-5 sm:px-10 lg:px-20 2xl:px-0">
        <div className="mx-auto max-w-screen-xl w-full mt-10 relative">
          <ShopSepartor header="Recommended Services" />
        </div>
        <section className="mx-auto max-w-screen-xl w-full my-10 relative">
          <div className="w-full flex flex-wrap gap-10 ">
            {data?.services?.map(({ businessInfo, serviceInfo }: any) => (
              <Explorer
                key={serviceInfo?.id}
                service={serviceInfo?.service}
                imageUrl={serviceInfo?.service_image}
                shopName={businessInfo?.business_name}
                price={serviceInfo?.price}
                rating={businessInfo?.rating}
                btnText="Book Appointment"
                booking={true}
                href={serviceInfo?.id}
                shopImage={businessInfo?.profile_img}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AllShops;
