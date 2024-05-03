// Page Section Separators
export default function Separator({
  btnText,
  header,
}: {
  btnText: string;
  header: string;
}) {
  return (
    <div className="w-full h-auto p-5 flex flex-col justify-center items-center   gap-5 lg:gap-10 lg:p-10">
      <div className=" 3xl:max-w-[80%] lg:px-20  w-full">
        <h2 className=" text-[#0F1C35] text-2xl sm:text-4xl">{header}</h2>
      </div>
    </div>
  );
}
