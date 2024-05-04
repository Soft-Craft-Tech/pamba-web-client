import Link from "next/link";
import Image from "next/image";

export default function AppSection() {
  return (
    <section className="flex flex-col-reverse px-5 h-auto py-20 bg-secondary text-white gap-10 w-full sm:p-10 lg:h-screen lg:grid lg:grid-cols-9  lg:grid-rows-1 lg:p-20">
      <div className="flex flex-col text-center justify-center gap-3 sm:gap-5 lg:text-left col-span-4">
        <h3 className="font-extrabold text-3xl sm:text-4xl">
          Your clients are using the Pamba application to book with you.
        </h3>
        <p className="text-sm font-light text-gray-300 sm:text-base">
          Our Pamba app seamlessly manages the client side of your business,
          allowing you to focus on what you do best: providing exceptional
          service. Let us handle customer scheduling effortlessly while you
          elevate your business. Gain valuable feedback about your services
          through the Ratings and Reviews feature integrated into our system.
          Spread the word about the Pamba app to your clients and transition
          them to the online platform.
        </p>
        <div className="flex gap-5 justify-center lg:justify-start">
          <Link href="">
            <Image
              className="w-24"
              src="/app-store-badge.svg"
              alt="pamba app"
              width={50}
              height={20}
            />
          </Link>
          <Link href="">
            <Image
              className="w-24"
              src="/play-store-badge.svg"
              alt="pamba app"
              width={50}
              height={20}
            />
          </Link>
        </div>
      </div>
      <div className="w-full h-80 flex justify-center relative col-span-5 lg:justify-end lg:h-full">
        <Image
          className="w-auto h-full"
          src="/pamba-phone.svg"
          alt="Pamba mobile app"
          width={0}
          height={0}
          priority
        />
      </div>
    </section>
  );
}
