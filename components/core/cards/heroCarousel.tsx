import { carouselImages } from "@/ui/carouselImages";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Carousel() {
  const [activeIDX, setActiveIDX] = useState(1);
  // Handle the slide
  const handleSlide = () => {
    if (activeIDX === carouselImages.length) {
      setActiveIDX(1);
    } else {
      setActiveIDX((prev) => prev + 1);
    }
  };

  // Set Initial slider Image
  useEffect(() => {
    const slideInterval = setInterval(handleSlide, 5000);

    // Clean up
    return () => {
      clearInterval(slideInterval);
    };
  }, [activeIDX]);
  return (
    <div className="bg-background h-full">
      {carouselImages.map((image) => {
        return (
          <Image
            key={image.idx}
            className={`${
              activeIDX === image.idx
                ? "w-full h-full z-10 object-cover block transition-all duration-1000"
                : "hidden"
            }`}
            src={image.img}
            alt="pamba"
            width={60}
            height={60}
            priority
          />
        );
      })}
    </div>
  );
}
