import Image from "next/image";
import Link from "next/link";

export default function ServiceCard({
  bgWhite,
  img,
  title,
  text,
  url,
}: {
  bgWhite: boolean;
  img: string;
  title: string;
  text: string;
  url: string;
}) {
  return (
    <div
      className={`w-full flex flex-col-reverse h-auto px-5 gap-5 py-10  ${
        bgWhite && "bg-white"
      } sm:p-10 sm:gap-10 lg:grid grid-cols-1 lg:grid-cols-2 lg:py-16 lg:grid-rows-1 lg:gap-16 lg:px-20`}
    >
      <div
        className={`flex flex-col w-full h-full justify-center items-center gap-5 sm:items-start  ${
          !bgWhite && "lg:order-2"
        }`}
      >
        <h3 className="text-2xl font-extrabold text-primary sm:text-3xl md:text-4xl lg:text-3xl">
          {title}
        </h3>
        <p className="text-secondary font-light text-base text-center sm:text-xl sm:text-left md:text-2xl lg:text-lg">
          {text}
        </p>
        <Link
          className="flex items-center w-max h-max gap-2 px-5 py-2 border border-primary rounded-full text-primary font-medium duration-100 group hover:border-primaryHover hover:text-primaryHover hover:scale-[1.02] md:px-7 md:py-3"
          href={url}
        >
          Learn more
          <Image
            src="/arrow-right-white.svg"
            alt="pamba-arrow"
            className="border bg-primary group-hover:bg-primaryHover rounded-full p-1 w-5 h-5 md:w-7 md:h-7"
            width={20}
            height={20}
          />
        </Link>
      </div>
      <div className={`${!bgWhite && "lg:order-1"} w-full`}>
        <Image
          className="w-full"
          src={img}
          alt="pamba services"
          width={500}
          height={450}
        />
      </div>
    </div>
  );
}
