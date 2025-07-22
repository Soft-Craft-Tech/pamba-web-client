import { useGetAllServices, useGetSingleBusiness } from "@/app/api/businesses";
import ServiceCard from "@/components/ServiceCard";
import ShopSepartor from "@/components/shared/sectionSeparators/shopsSeparator";
import { CartItem, DynamicObject } from "@/components/types";
import LocationIcon from "@/ui/icons/location";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { HiOutlineExternalLink } from "react-icons/hi";
import { useBookingCart } from "@/utils/providers/BookingCartProvider";
import { useRouter } from "next/navigation";
import CartServiceCard from "@/components/ServiceCard";
import { useGetSingleService } from "@/app/api/services";

const AboutShop: React.FC<{ slug: string }> = ({ slug }) => {
  const router = useRouter();
  const [filteredServices, setFilteredServices] = useState<CartItem[]>([]);
  const { data } = useGetSingleBusiness(slug);

  const { data: shopServices } = useGetAllServices(slug);
  const { data: serviceData } = useGetSingleService(
    shopServices?.services[0]?.id.toString() || ""
  );

  const { addService, removeService, updateCartBusiness, cartServices } =
    useBookingCart();

  const isInCart = (id: number) =>
    cartServices.some((cartItem: CartItem) => cartItem.id === id);

  useEffect(() => {
    if (shopServices?.services) {
      setFilteredServices(shopServices.services);
    }
  }, [shopServices]);

  const handleBookNow = () => {
    updateCartBusiness(
      data?.business?.id,
      data?.business?.business_name,
      slug,
      serviceData?.service?.weekdayClosing,
      serviceData?.service?.weekdayOpening,
      serviceData?.service?.weekendClosing,
      serviceData?.service?.weekendOpening
    );
    if (cartServices.length > 0) {
      router.push(`/booking/find-services/${slug}`);
    }
  };

  return (
    <div className="flex flex-col w-full gap-y-10 mt-4">
      <div>
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
      </div>
      <div className="flex flex-col gap-5">
        <ShopSepartor header="Our Services" />
        <div className="w-full flex flex-wrap gap-12 3xl:max-w-[80%]">
          {filteredServices?.map((serviceItem: CartItem) => {
            return (
              <CartServiceCard
                key={serviceItem.id}
                service={serviceItem.service}
                description={serviceItem.description}
                href={`/booking/find-services/${slug}`}
                price={serviceItem.price}
                duration={serviceItem.estimated_service_time}
                booking={false}
                category={serviceItem.category_name}
                businessData={data?.business}
                selected={isInCart(serviceItem.id)}
                onAdd={() => {
                  addService(serviceItem);
                  handleBookNow();
                }}
                onRemove={() => {
                  removeService(serviceItem.id);
                }}
              />
            );
          })}
        </div>

        {/* Book Now Button */}
        {cartServices.length > 0 && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleBookNow}
              className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors"
            >
              Book Now ({cartServices.length} service{cartServices.length > 1 ? "s" : ""})
            </button>
          </div>
        )}
      </div>

      {/* list opening hours and days from mon to sun */}
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-medium">Opening Hours</h2>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-light">
            Monday: {serviceData?.service?.weekdayOpening} -{" "}
            {serviceData?.service?.weekdayClosing}
          </p>
          <p className="text-sm font-light">
            Tuesday: {serviceData?.service?.weekdayOpening} -{" "}
            {serviceData?.service?.weekdayClosing}
          </p>
          <p className="text-sm font-light">
            Wednesday: {serviceData?.service?.weekdayOpening} -{" "}
            {serviceData?.service?.weekdayClosing}
          </p>
          <p className="text-sm font-light">
            Thursday: {serviceData?.service?.weekdayOpening} -{" "}
            {serviceData?.service?.weekdayClosing}
          </p>
          <p className="text-sm font-light">
            Friday: {serviceData?.service?.weekdayOpening} -{" "}
            {serviceData?.service?.weekdayClosing}
          </p>
          <p className="text-sm font-light">
            Saturday: {serviceData?.service?.weekendOpening} -{" "}
            {serviceData?.service?.weekendClosing}
          </p>
          <p className="text-sm font-light">
            Sunday: {serviceData?.service?.weekendOpening} -{" "}
            {serviceData?.service?.weekendClosing}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutShop;
