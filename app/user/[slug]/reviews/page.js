import Rating from "@/app/components/features/userAccount/reviews/rating";
import MyReviews from "@/app/components/features/userAccount/reviews/myReviews";
export default function Reviews () {
    return (
        <div className="flex flex-col gap-10 pb-10">
            <Rating />
            <MyReviews />
        </div>
    )
}