import Image from "next/image";
import { motion } from "framer-motion";
export default function HeroCard() {
    return(
        <div className="bg-secondary absolute text-white w-11/12 p-3 rounded-lg -bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col gap-3 sm:-bottom-14 opacity-9 sm:p-5 sm:w-2/3 lg:gap-2 lg:bottom-3">
            <div>
                <h3 className="font-extrabold text-lg sm:text-2xl lg:text-lg">Kwetu SPA</h3>
                <p className="text-xs font-light sm:text-base lg:text-xs">2<sup>nd</sup> St, Kilimani Drive.</p>
            </div>
            <div className="flex w-full h-max items-center gap-2" >
                <Image src="/pamba-star.svg" alt="pamba-star" width={15} height={15} />
                <p className="text-sm sm:text-base lg:text-sm">5.0 Excellent (234+)</p>
            </div>
            <div className="flex w-full h-max items-center gap-2">
                <Image src="/pamba-time.svg" alt="pamba-time" width={15} height={15} />
                <p className="text-sm sm:text-base lg:text-sm">Open : 8AM-9PM</p>
            </div>
        </div>
    )
}