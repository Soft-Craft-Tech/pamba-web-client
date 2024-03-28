import Image from "next/image";
import { motion } from "framer-motion";
export default function HeroCard() {
    return(
        <div className="bg-secondary absolute text-white w-2/3 p-3 rounded-lg bottom-3 left-1/2 transform -translate-x-1/2 flex flex-col gap-2 opacity-9">
            <div>
                <h3 className="font-bold">Kilimani Salon & Barbershop</h3>
                <p className="text-xs font-light">2nd, Kilimani Drive.</p>
            </div>
            <div className="flex w-full h-max items-center gap-2" >
                <Image src="/pamba-star.svg" alt="pamba-star" width={15} height={15} />
                <p className="text-sm">5.0 Excellent (234+)</p>
            </div>
            <div className="flex w-full h-max items-center gap-2">
                <Image src="/pamba-time.svg" alt="pamba-time" width={15} height={15} />
                <p className="text-sm">Open : 8AM-9PM</p>
            </div>
        </div>
    )
}