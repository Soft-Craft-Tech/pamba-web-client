import Image from "next/image"
export default function CoreValues() {
    return (
        <div className="w-full h-auto flex flex-col items-center py-32 gap-10">
            <button className="w-max border border-borders px-5 py-2 text-primary uppercase rounded-full text-sm font-semibold bg-gradient-to-r from-gray-200 via-gray-100 to-white">Our values</button>
            <div className="w-full h-auto px-20 py-10 relative">
                <Image className="w-full h-full object-cover -z-10" src="/pamba-values.svg" alt="" fill={true} />
                <div className="w-full h-full left-0 top-0 absolute -z-10 inset-0 bg-gradient-to-t from-secondary via-secondary to-transparent"></div>
                <div className="mt-56 flex gap-10 text-white z-10">
                    <div className="flex flex-col gap-5">
                        <Image  src="/customer-value.svg" alt="" width={30} height={30} />
                        <div className="flex flex-col gap-1">
                            <h4 className="font-extrabold text-xl">Efficiency</h4>
                            <p className="text-sm">
                                Our wellness and beauty software is designed to optimize operations, saving valuable time and resources for barbershops, salons, and spas. 
                                By automating administrative tasks and streamlining workflows, businesses can focus more on delivering top-notch services to their clients. 
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5">
                        <Image  src="/empowerment-value.svg" alt="" width={30} height={30} />
                        <div className="flex flex-col gap-1">
                            <h4 className="font-extrabold text-xl">Client Satisfaction</h4>
                            <p className="text-sm">
                                With our software, businesses can elevate the customer experience by offering seamless booking options, personalized services, and effective communication channels. 
                                By prioritizing client satisfaction, barbershops, salons, and spas can build strong relationships with their customers and foster loyalty.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5">
                        <Image  src="/quality-value.svg" alt="" width={30} height={30} />
                        <div className="flex flex-col gap-1">
                            <h4 className="font-extrabold text-xl">Business Growth</h4>
                            <p className="text-sm">
                                Gain valuable insights into sales, expenses, and performance metrics with our analytics and reporting tools. 
                                By leveraging data-driven insights and marketing features, businesses can make informed decisions, 
                                drive growth, and expand their reach in the competitive wellness and beauty industry.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}