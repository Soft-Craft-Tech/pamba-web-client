import * as React from "react";

interface PageProps {
  params: {
    service: string;
  };
}

const Page: React.FC<PageProps> = ({ params }) => {
  return <div>{params.service}</div>;
};

export default Page;
