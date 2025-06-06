import SingleShopHero from "@/components/SingleShopHero";
import ShopTabs from "@/components/features/shop/shop-tabs";
import * as React from "react";

interface PageProps {
  params: {
    shop: string;
  };
}

const Page: React.FC<PageProps> = ({ params }) => {
  return (
    <div className="mb-10 w-full">
      <SingleShopHero slug={params.shop} />
      <ShopTabs slug={params?.shop} />
    </div>
  );
};

export default Page;
