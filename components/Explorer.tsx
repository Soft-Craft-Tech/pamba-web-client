/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import LocationIcon from "@/ui/icons/location";
import RatingIcon from "@/ui/icons/rating";

const Explorer: React.FC<{
  imageUrl: string;
  shopName: string;
  btnText?: string;
  booking?: boolean;
  href?: string;
  location?: string;
  price?: number;
  rating?: string;
  reviews?: string;
  service?: string;
  shopImage?: string;
}> = ({
  imageUrl,
  shopName,
  btnText = "Explore",
  booking = false,
  href = "not-found",
  location = "Not Provided",
  price = "",
  rating,
  reviews,
  service,
  shopImage
}) => {
  return (
    <div className=" bg-white border w-full border-gray-200 rounded-lg shadow md:max-w-[20rem] md:w-[19.5rem]">
      <img
        className="object-cover w-full h-[10rem] sm:h-[12rem] lg:h-[10rem]"
        src={
          imageUrl === null
            ? "https://res.cloudinary.com/dnfrxficl/image/upload/v1715585716/pamba-web/iejtagfjemtmqr2k2f0n.svg"
            : imageUrl
        }
        alt=""
      />
      <div className="p-5  w-full">
        {booking ? (
          <div>
            <h3 className="text-secondary">{service}</h3>
            <div className="w-full flex mt-2 justify-between items-center">
              <p className="text-lg">Ksh {price}</p>
              <div className="flex bg-[#DB147114] p-2 rounded-2xl  flex-row gap-x-1 items-center">
                <RatingIcon />
                <p>{rating}</p>
              </div>
            </div>
            <div className="flex flex-row items-center gap-x-3">
              {shopImage &&
                <Image
                className="w-10 h-10 rounded-full"
                width={20}
                height={20}
                src={shopImage}
                alt="Rounded avatar"
              />
              }
              
              <p className="text-lg">{shopName}</p>
            </div>
          </div>
        ) : (
          <div className="mt-3">
            <div className="flex flex-row items-center gap-x-3">
              <p className="text-lg">{shopName}</p>
            </div>
            <div className="flex flex-row mt-3 items-center gap-x-1">
              <LocationIcon />
              <p className="text-sm text-grayArea line-clamp-1">{location}</p>
            </div>
            <div className="w-full flex mt-3 justify-between items-center">
              <div className="flex bg-[#DB147114] p-2 rounded-2xl  flex-row gap-x-1 items-center">
                <RatingIcon />
                <p>{rating}</p>
              </div>
              <p className="text-sm">{reviews} review(s)</p>
            </div>
          </div>
        )}
        <Link
          href={
            booking
              ? `/booking/find-services/${href}`
              : `/booking/all-shops/${href}`
          }
        >
          <button className="w-full px-5 mt-3 py-2 border border-primary rounded-full text-primary font-medium duration-100 delay-75 hover:scale-[1.02] md:px-7 md:py-3">
            {btnText}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Explorer;
