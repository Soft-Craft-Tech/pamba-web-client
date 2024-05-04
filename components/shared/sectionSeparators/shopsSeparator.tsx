// Page Section Separators
export default function ShopSepartor({ header }: { header: string }) {
  return (
    <div className="">
      <div className="px-4 w-full">
        <h2 className=" text-[#0F1C35] text-lg sm:text-4xl">{header}</h2>
      </div>
    </div>
  );
}
