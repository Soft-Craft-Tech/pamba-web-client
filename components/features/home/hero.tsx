"use client";
import HeroCard from "../../core/cards/heroCard";
import Carousel from "../../core/cards/imageCarousel";
// import { motion } from "framer-motion";
import StartTrial from "../../core/buttons/startTrial";
import { carouselImages } from "@/ui/carouselImages";
export default function Hero() {
  

  return (
    <section className="px-5 h-auto flex flex-col gap-6 py-10 mt-20 mb-10 sm:mb-20 sm:px-10 sm:gap-10 lg:h-screen lg:px-20 lg:grid lg:grid-cols-9 xl:h-auto xl:py-20 xl:mt-24">
      <div className="flex flex-col justify-center gap-6 sm:gap-4 lg:col-span-5">
        <h1 className="font-extrabold text-5xl leading-tight text-secondary sm:font-extrabold sm:text-6xl  xl:text-6xl xl:leading-tight">
          <span className="text-primary">Simplify</span> Your Operations With{" "}
          <span className="text-primary">Effortless</span> Business Management
        </h1>
        <p className="text-secondary font-light text-base sm:text-xl md:text-2xl lg:text-xl xl:text-2xl">
          Elevate your barbershop, salon, or spa with our premier beauty and
          wellness software. Streamline your operations by effortlessly managing
          bookings, inventory, and cash flow - all in one powerful solution.
        </p>
        <StartTrial />
      </div>
      <div className="col-span-4 w-full h-full relative items-center justify-center flex">
        {/* Borders */}
        <div className="w-3/4 h-3/4 border-2 border-primary rounded-3xl absolute top-0 left-0 -z-10 hidden lg:block"></div>
        <div className="w-1/2 h-3/4 border-2 border-primary rounded-3xl hidden absolute right-0 bottom-0 -z-10 lg:block"></div>
        {/* Borders */}
        <div className="w-full h-72 rounded-2xl overflow-hidden lg:w-11/12 sm:h-3/4 ">
          <Carousel images={carouselImages} />
          <HeroCard />
        </div>
      </div>
    </section>
  );
}
