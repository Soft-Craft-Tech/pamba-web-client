import ReviewCard from "../cards/reviewCard"
export default function MyReviews() {
    return (
        <div className="flex flex-col gap-5">
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
        </div>
    )
}