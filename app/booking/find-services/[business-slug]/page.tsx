import * as React from "react";
import { SingleService } from "@/components/singleService";
import BackArrow from "@/components/shared/back";

interface PageProps {
  params: {
    "business-slug": string;
  };
}

const Page: React.FC<PageProps> = ({ params }) => {
  return (
    <div className="mx-auto max-w-screen-2xl px-4 w-full mt-5 relative">
      <BackArrow />
      <SingleService serviceId={params?.["business-slug"]} />
    </div>
  );
};

export default Page;
