import StartTrial from "../../core/buttons/startTrial";
import Image from "next/image";

export default function ServicesHero({
  title,
  text,
  image,
}: {
  title: string;
  text: string;
  image: string;
}) {
  return (
    <div className="w-full h-auto text-white mt-20">
      <div className="w-full h-96 bg-secondary px-5 py-10 flex flex-col items-center gap-4 relative sm:px-10 lg:px-20 lg:py-16">
        <h1 className="w-auto font-extrabold text-center text-3xl lg:w-max ">
          {title}
        </h1>
        <p className="text-center text-gray-400 lg:w-[50ch]">{text}</p>
        <StartTrial />
      </div>
      <div className="relative w-full h-48 pb-20 md:h-96">
        <Image
          className="shadow-lg w-11/12 h-auto rounded-md object-contain absolute -top-14 left-1/2 transform -translate-x-1/2 lg:-top-20 lg:w-1/2 lg:h-96"
          src={image}
          alt="pamba"
          width={300}
          height={250}
        />
      </div>
    </div>
  );
}
