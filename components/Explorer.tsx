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
}> = ({
  imageUrl,
  shopName,
  btnText = "Explorer",
  booking = false,
  href = "not-found",
  location = "Not Provided",
  price = "",
  rating,
  reviews,
}) => {
  return (
    <div className=" bg-white border  border-gray-200 rounded-lg shadow max-w-[20rem] w-[19.5rem]">
      <img
        className="object-cover w-full h-[10rem]"
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
            <div className="w-full flex mt-3 justify-between items-center">
              <p className="text-lg">Ksh{price}</p>
              <div className="flex bg-[#DB147114] p-2 rounded-2xl  flex-row gap-x-1 items-center">
                <RatingIcon />
                <p>{rating}</p>
              </div>
            </div>
            <div className="flex flex-row items-center gap-x-3">
              <Image
                className="w-10 h-10 rounded-full"
                width={20}
                height={20}
                src={imageUrl}
                alt="Rounded avatar"
              />
              <p className="text-lg">{shopName}</p>
            </div>
          </div>
        ) : (
          <div className="mt-3">
            <div className="flex flex-row items-center gap-x-3">
              <p className="text-xl">{shopName}</p>
            </div>
            <div className="flex flex-row mt-3 items-center gap-x-1">
              <LocationIcon />
              <p className="text-xl text-grayArea">{location}</p>
            </div>
            <div className="w-full flex mt-3 justify-between items-center">
              <div className="flex bg-[#DB147114] p-2 rounded-2xl  flex-row gap-x-1 items-center">
                <RatingIcon />
                <p>{rating}</p>
              </div>
              <p className="text-xl">{reviews} review(s)</p>
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
          <button className="w-full px-5 mt-3 py-2 border border-primary rounded-full text-primary font-medium md:px-7 md:py-3">
            {btnText}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Explorer;
