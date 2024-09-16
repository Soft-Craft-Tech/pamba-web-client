import Image from "next/image";

interface IServiceCardProps {
  reverse: boolean;
  image: string;
  title: string;
  text: string;
  functions: string[];
}

const ServiceInfoCard: React.FC<IServiceCardProps> = ({
  reverse,
  image,
  title,
  text,
  functions,
}) => {
  return (
    <div className="w-full h-auto flex flex-col gap-5 lg:gap-10 lg:grid lg:grid-cols-2 lg:grid-rows-1">
      <div
        className={`h-72 shadow-md w-full p-5 bg-secondary rounded-md sm:h-80 ${
          reverse && "lg:order-2"
        } lg:h-96`}
      >
        <div className="relative w-full h-full">
          <Image
            className="absolute rounded-md left-0 top-0 w-full h-full object-cover"
            src={image}
            alt=""
            width={150}
            height={100}
          />
        </div>
      </div>
      <div
        className={`flex flex-col gap-3 w-full h-full justify-center text-muted ${
          reverse && "lg:order-1"
        }`}
      >
        <h3 className="font-extrabold text-2xl text-secondary sm:text-4xl lg:text-3xl">
          {title}
        </h3>
        <p className="sm:text-lg lg:text-base">{text}</p>
        <div className="text-secondary flex flex-col gap-2">
          {functions.map((func: string | undefined, index: number) => {
            return (
              <p
                key={index}
                className="w-full h-auto flex items-center gap-3 text-sm font-medium lg:h-5"
              >
                <Image
                  className="w-5 h-5"
                  src="/tick-icon.svg"
                  alt=""
                  width={10}
                  height={10}
                />
                {func}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default ServiceInfoCard;
