import SingleShopHero from "@/components/SingleShopHero";
import ShopTabs from "@/components/features/shop/shop-tabs";
import Button from "@/ui/button";
import * as React from "react";

interface PageProps {
  params: {
    shop: string;
  };
}

const Page: React.FC<PageProps> = ({ params }) => {
  return (
    <div>
      <SingleShopHero shopName={params.shop} />
      <ShopTabs />
    </div>
  );
};

export default Page;
