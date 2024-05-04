import React from "react";
import Image from "next/image";
import RatingIcon from "@/ui/icons/rating";

const ReviewsCard = () => {
  return (
    <div className="w-full p-4 flex flex-row items-center gap-16  bg-white border border-gray-200 rounded-lg shadow sm:p8">
      <div className="flex flex-col gap-4">
        <Image
          className="w-20 h-20 rounded-full"
          width={80}
          height={80}
          src="/user-icons/profile-icon.svg"
          alt="Rounded avatar"
        />
        <h1 className="text-secondary text-xl font-bold ">Leticia Kutch</h1>
      </div>
      <div className="max-w-lg flex flex-col gap-y-2">
        <h1 className="text-xl text-secondary font-bold">
          Braiding experience
        </h1>
        <div className="flex items-center flex-row gap-x-4">
          <p>5.0</p>
          <div className="flex flex-row gap-x-1">
            {Array.from({ length: 5 }, (_, index) => (
              <RatingIcon key={index} fill="#FF9F0A" />
            ))}
          </div>
        </div>
        <p className="text-[#8C8C8C] text-sm">Reviewed April 1st</p>
        <p className="text-[#323232]">
          I got the best service. The technician was very kind and gentle. I
          will definitely be back and bring more people with me. I got the best
          service. The technician was very kind and gentle. I will definitely be
          back and bring more people with me.
        </p>
      </div>
    </div>
  );
};

export default ReviewsCard;
