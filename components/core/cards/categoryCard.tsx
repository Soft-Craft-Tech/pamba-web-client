import Image from "next/image";
export function Category({ img, text }: { img: string; text: string }) {
  return (
    <div className="w-28 h-28 flex flex-col gap-2 bg-white p-3 rounded-lg items-center justify-center">
      <Image
        className="w-10 h-10"
        src={img}
        alt="pamba-icons"
        width={24}
        height={24}
      />
      <h2 className="font-bold text-secondary text-sm text-center">{text}</h2>
    </div>
  );
}

export const CategoryCard: React.FC<{ text: string; img: string }> = ({
  text,
  img,
}) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-28 h-28  rounded-full items-center justify-center">
        <Image
          className="w-full h-full"
          src={img}
          alt="pamba-icons"
          width={24}
          height={24}
        />
      </div>
      <h2 className="font-bold text-secondary text-sm text-center">{text}</h2>
    </div>
  );
};
