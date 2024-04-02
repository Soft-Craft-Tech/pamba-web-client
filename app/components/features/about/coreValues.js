import Image from "next/image"
export default function CoreValues() {
    return (
        <div className="w-full h-auto flex flex-col items-center py-32 gap-10">
            <button className="w-max border border-borders px-5 py-2 text-primary uppercase rounded-full text-sm font-semibold bg-gradient-to-r from-gray-200 via-gray-100 to-white">Our values</button>
            <div className="w-full h-auto px-20 py-10 relative">
                <Image className="w-full h-full object-cover -z-10" src="/pamba-values.svg" alt="" fill={true} />
                <div className="w-full h-full left-0 top-0 absolute -z-10 inset-0 bg-gradient-to-t from-black via-black to-transparent"></div>
                <div className="mt-56 flex gap-10 text-white z-10">
                    <div className="flex flex-col gap-5">
                        <Image  src="/customer-value.svg" alt="" width={30} height={30} />
                        <div className="flex flex-col gap-1">
                            <h4 className="font-extrabold text-xl">Customer-centric approach</h4>
                            <p>
                                We recognize that every business is unique and every client has personal pain-points. 
                                Our platform is designed to be flexible and customizable, allowing users to tailor it to their specific goals, preferences, and workflows. 
                                We empower our clients to personalize their experience and make Pamba truly their own. 
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5">
                        <Image  src="/empowerment-value.svg" alt="" width={30} height={30} />
                        <div className="flex flex-col gap-1">
                            <h4 className="font-extrabold text-xl">Empowerment</h4>
                            <p>
                                We recognize that every business is unique and every client has personal pain-points. 
                                Our platform is designed to be flexible and customizable, allowing users to tailor it to their specific goals, preferences, and workflows. 
                                We empower our clients to personalize their experience and make Pamba truly their own. 
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5">
                        <Image  src="/quality-value.svg" alt="" width={30} height={30} />
                        <div className="flex flex-col gap-1">
                            <h4 className="font-extrabold text-xl">Quality</h4>
                            <p>
                                We recognize that every business is unique and every client has personal pain-points. 
                                Our platform is designed to be flexible and customizable, allowing users to tailor it to their specific goals, preferences, and workflows. 
                                We empower our clients to personalize their experience and make Pamba truly their own 
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}