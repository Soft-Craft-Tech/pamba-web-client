import MyReviews from "@/components/features/userAccount/reviews/myReviews";
import Rating from "@/components/features/userAccount/reviews/rating";

export default function Reviews() {
  return (
    <div className="flex flex-col gap-10 pb-10">
      <Rating />
      <MyReviews />
    </div>
  );
}
