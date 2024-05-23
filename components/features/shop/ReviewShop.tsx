import RatingIcon from "@/ui/icons/rating";
import React from "react";
import ReviewsCard from "./ReviewCard";
import { useAllReviews } from "@/app/api/reviews";
import { DynamicObject } from "@/components/types";

const RatingItem = ({ rating, width }: { rating: number; width: number }) => {
  return (
    <li className="flex w-full gap-x-6 items-center">
      <div className="flex items-center gap-x-3">
        <p>{rating}</p>
        <RatingIcon fill="#FF9F0A" />
      </div>
      <div className={`bg-[#FF9F0A] h-2 w-[${width}px] rounded-sm`} />
    </li>
  );
};

const ReviewShop: React.FC<{ slug: string }> = ({ slug }) => {
  const { data: reviewsData } = useAllReviews(slug);
  console.log(reviewsData?.reviews);
  const ratings = [
    { rating: 5, width: 192 },
    { rating: 4, width: 126 },
    { rating: 3, width: 102 },
    { rating: 2, width: 60 },
    { rating: 1, width: 26 },
  ];

  return (
    <div className="flex flex-col gap-y-10 mt-4">
      <div className="flex flex-row gap-x-10">
        <div>
          <div className="flex flex-row items-center">
            <h1 className="text-[57px]">
              {reviewsData?.ratingsAverage.toFixed(1)}
            </h1>
            <RatingIcon fill="#FF9F0A" width={42} height={42} />
          </div>
          <p className="text-[#8C8C8C]">
            {reviewsData?.reviews?.length} Reviews
          </p>
        </div>
        <div className="w-full max-w-lg">
          <ul className="w-full space-y-1 text-gray-500 list-inside dark:text-gray-400">
            {ratings.map(({ rating, width }) => (
              <RatingItem key={rating} rating={rating} width={width} />
            ))}
          </ul>
        </div>
      </div>
      {reviewsData?.reviews?.map(
        ({ id, message, reviewer, reviewed_at, rating }: DynamicObject) => (
          <ReviewsCard
            key={id}
            reviewer={reviewer}
            date={reviewed_at}
            rating={rating}
            comment={message}
          />
        )
      )}
    </div>
  );
};

export default ReviewShop;
