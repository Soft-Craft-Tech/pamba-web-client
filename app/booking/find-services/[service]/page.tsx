import * as React from "react";
import SingleService from "@/components/SingleService";
import BackArrow from "@/components/shared/back";
import { revalidatePath } from "next/cache";

interface PageProps {
  params: {
    service: string;
  };
}

const Page: React.FC<PageProps> = ({ params }) => {
  revalidatePath(`/blog/${params?.service}`);
  return (
    <div className="mx-auto max-w-screen-2xl px-4 w-full mt-5 relative">
      <BackArrow />
      <SingleService serviceId={params?.service} />
    </div>
  );
};

export default Page;
