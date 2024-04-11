"use client";
import HeroCard from "../../core/cards/heroCard";
import Carousel from "../../core/cards/heroCarousel";
import { motion } from "framer-motion";
import StartTrial from "../../core/buttons/startTrial";
export default function Hero() {
    const variants = {
        hidden: {
            scale: 0.9,
            opacity: 0
        },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                delay: .05,
                duration: 1
            }
        }
    }

    return (
        <section className="px-5 h-auto flex gap-5 py-5 mt-20 sm:h-screen sm:py-10 sm:mb-20 sm:px-10 lg:gap-10 lg:px-20 lg:grid lg:grid-cols-9 ">
            <motion.div initial="hidden" animate="visible" variants={variants} className="flex flex-col justify-center gap-6 sm:gap-4 lg:col-span-5">
                <h1 className="font-extrabold text-5xl leading-tight text-secondary sm:font-extrabold sm:text-6xl md:text-8xl xl:text-5xl" >
                    <span className="text-primary">Simplify</span> Your Operations With <span className="text-primary">Effortless</span> Business Management
                </h1>
                <p className="text-secondary font-light text-base sm:text-xl md:text-2xl lg:text-xl">
                    Elevate your barbershop, salon, or spa with our premier beauty and wellness software. 
                    Streamline your operations by effortlessly managing bookings, inventory, and cash flow – all in one powerful solution.
                </p>
                <StartTrial />
            </motion.div>
            <div className="col-span-4 w-full h-full relative hidden items-center justify-center lg:flex">
                {/* Borders */}
                <div className="w-3/4 h-3/4 border-2 border-primary rounded-3xl absolute top-0 left-0 -z-10">
                </div>
                <div className="w-1/2 h-3/4 border-2 border-primary rounded-3xl absolute right-0 bottom-0 -z-10">
                </div>
                {/* Borders */}
                <div className="w-5/6 h-3/4 rounded-2xl overflow-hidden">
                    <Carousel />
                    <HeroCard />
                </div>
            </div>
        </section>
    )
}