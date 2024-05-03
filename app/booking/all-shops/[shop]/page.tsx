import * as React from "react";

interface PageProps {
  params: {
    shop: string;
  };
}

const Page: React.FC<PageProps> = ({ params }) => {
  return <div>{params.shop}</div>;
};

export default Page;
