import { useGetAllServices, useGetSingleBusiness } from "@/app/api/businesses";
import Explorer from "@/components/Explorer";
import ShopSepartor from "@/components/shared/sectionSeparators/shopsSeparator";
import { DynamicObject } from "@/components/types";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setFilteredServices } from "@/store/filteredServicesSlice";
import { RootState } from "@/store/store";
import LocationIcon from "@/ui/icons/location";
import RatingIcon from "@/ui/icons/rating";
import Link from "next/link";
import React, { useEffect } from "react";

const AboutShop: React.FC<{ slug: string }> = ({ slug }) => {
  const filteredServices = useAppSelector(
    (state: RootState) => state.filteredServices.filteredServices
  );
  const dispatch = useAppDispatch();
  const { data } = useGetSingleBusiness(slug);
  const { data: shopServices, isSuccess } = useGetAllServices(slug);
  useEffect(() => {
    if (isSuccess && shopServices?.services) {
      dispatch(setFilteredServices(shopServices.services));
    }
  }, [isSuccess, shopServices, dispatch]);

  return (
    <div className="flex flex-col w-full gap-y-10 mt-4">
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-medium">
          {" "}
          {data?.business?.business_name}
        </h2>
        <div>
          {data?.business && (
            <Link
              target="_blank"
              className="text-primary border-[0.1px] border-primary py-1 px-3 hover:bg-primary hover:text-white transition-all ease-in-out rounded-full text-sm duration-100 delay-75 "
              href={data?.business?.google_map && data?.business?.google_map}
            >
              Directions
            </Link>
          )}
        </div>
        <div className="flex flex-row gap-x-1 items-center mt-2">
          <LocationIcon />
          <p className="text-sm font-light"> {data?.business?.location}</p>
        </div>
        {/* <div className="flex flex-row items-center gap-x-2">
          <p className="font-semibold text-xl">{data?.business?.rating}</p>
          <div className="flex gap-1">
            <RatingIcon fill="#FF9F0A" />
            <RatingIcon fill="#FF9F0A" />
            <RatingIcon fill="#FF9F0A" />
            <RatingIcon fill="#FF9F0A" />
            <RatingIcon fill="#FF9F0A" />
          </div>
        </div> */}
        <p className="max-w-[800px] text-sm mt-2">
          {data?.business?.description}
        </p>
      </div>
      <div className="flex flex-col gap-5">
        <ShopSepartor header="Our Services" />
        <div className="w-full flex flex-wrap gap-12 3xl:max-w-[80%] ">
          {filteredServices?.map(
            ({
              service_image,
              service,
              id,
              location,
              price,
            }: DynamicObject) => (
              <Explorer
                key={id}
                imageUrl={service_image}
                shopName={service}
                location={location}
                href={id}
                booking={true}
                btnText="Book Appointment"
                price={price}
                rating={data?.business?.rating}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutShop;
