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
import { HiOutlineExternalLink } from "react-icons/hi";

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
        {data?.business.placeId && (
          <div>
            <Link
              target="_blank"
              className="flex items-center gap-2 w-fit text-primary border-[0.1px] border-primary py-1 px-3 hover:bg-primary hover:text-white transition-all ease-in-out rounded-full text-sm duration-100 delay-75 "
              href={`https://www.google.com/maps/place/?q=place_id:${data?.business.placeId}`}
              rel="noopener noreferrer"
            >
              Directions
              <HiOutlineExternalLink className="w-4 h-4" />
            </Link>
          </div>
        )}
        {data?.business?.formatted_address && (
          <div className="flex flex-row gap-x-1 items-center mt-2">
            <LocationIcon />
            <p className="text-sm font-light">
              {" "}
              {data?.business?.formatted_address}
            </p>
          </div>
        )}
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
