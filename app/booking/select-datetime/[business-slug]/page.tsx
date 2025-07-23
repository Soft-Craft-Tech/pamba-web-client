"use client";
import BackArrow from "@/components/shared/back";
import SelectDateTime from "@/components/singleService/SelectDateTime";

const SelectDateTimePage = ({
  params,
}: {
  params: { "business-slug": string };
}) => {
  return (
    <div className="mx-auto max-w-screen-2xl px-4 w-full mt-5 relative">
      <BackArrow />
      <SelectDateTime businessSlug={params["business-slug"]} />
    </div>
  );
};

export default SelectDateTimePage;
