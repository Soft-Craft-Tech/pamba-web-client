import BackArrow from "@/components/shared/back";
import SelectProvider from "@/components/singleService/SelectProvider";

const SelectProviderPage = ({
  params,
}: {
  params: { "business-slug": string };
}) => {
  return (
    <div className="mx-auto max-w-screen-2xl px-4 w-full mt-5 relative">
      <BackArrow />
      <SelectProvider businessSlug={params["business-slug"]} />
    </div>
  );
};

export default SelectProviderPage;
