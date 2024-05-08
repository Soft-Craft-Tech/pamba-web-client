import Image from "next/image";
import { useState, useEffect } from "react";

export default function Carousel({images}: {images: {idx: number, img: string}[]}) {
  const [activeIDX, setActiveIDX] = useState(1);
  // Handle the slide
  const handleSlide = () => {
    console.log(activeIDX)
    if (activeIDX === images.length) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIDX]);
  return (
    <div className="bg-background h-full">
      {images.map((image) => {
        return (
          <Image
            key={image.idx}
            className={`${
              activeIDX === image.idx
                ? "w-full h-full z-10 object-cover object-top block transition-all duration-1000"
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
