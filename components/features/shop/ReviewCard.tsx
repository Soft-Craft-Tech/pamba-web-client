import React from "react";
import Image from "next/image";
import RatingIcon from "@/ui/icons/rating";

const ReviewsCard: React.FC<{
  reviewer?: string;
  date?: string;
  comment?: string;
  rating?: number;
}> = ({ reviewer = "Anonymous", date, comment, rating = 0 }) => {
  return (
    <div className="w-full p-4 flex flex-row items-center gap-16  bg-white border border-gray-200 rounded-lg shadow sm:p8">
      <div className="flex items-center flex-col gap-4">
        <div className="relative w-12 h-12 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <svg
            className="absolute w-12 h-12 text-gray-400 -left-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>

        <h1 className="text-secondary text-xl font-bold ">{reviewer}</h1>
      </div>
      <div className="max-w-lg flex flex-col gap-y-2">
        <h1 className="text-xl text-secondary font-bold">
          Braiding experience
        </h1>
        <div className="flex items-center flex-row gap-x-4">
          <p>{rating}</p>
          <div className="flex flex-row gap-x-1">
            {Array.from({ length: rating }, (_, index) => (
              <RatingIcon key={index} fill="#FF9F0A" />
            ))}
          </div>
        </div>
        <p className="text-[#8C8C8C] text-sm">Reviewed {date}</p>
        <p className="text-[#323232]">{comment}</p>
      </div>
    </div>
  );
};

export default ReviewsCard;
