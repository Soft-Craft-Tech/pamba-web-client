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
      <Image
        className="w-11/12 lg:w-1/2 h-full md:h-96 object-cover transform mx-auto -translate-y-1/4 rounded-md shadow-xl"
        src={image}
        alt="pamba"
        width={300}
        height={250}
      />
    </div>
  );
}
