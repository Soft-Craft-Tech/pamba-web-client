"use client";
import { signupImages } from "@/ui/carouselImages";
import Carousel from "@/components/core/cards/imageCarousel";

const SignupImageCarousel = () => {
    return (
        <div>
            <Carousel images={signupImages} />
        </div>
    )
}

export default SignupImageCarousel;