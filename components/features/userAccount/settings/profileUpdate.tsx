"use client";
import { getUser } from "@/utils/auth";
import Image from "next/image";
import ProfileUpdateForm from "./updateForm";
import { useGetSingleBusiness } from "@/app/api/businesses";

const EditProfile = () => {
  const { client } = getUser();
  // const client = user ? user.client : null;
  console.log(client);
  const { data } = useGetSingleBusiness(client?.slug);

  return client?.active ? (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col items-center gap-3">
        {data?.business && (
          <div className="w-32 h-32 border rounded-full relative overflow-hidden">
            <Image
              className="top-0 left-0 object-cover w-full h-full"
              src={
                data.business.imageUrl
                  ? data.business.imageUrl
                  : "https://github.com/shadcn.png"
              }
              alt="pamba-user"
              fill={true}
              priority
            />
          </div>
        )}
      </div>
      {data?.business && <ProfileUpdateForm client={data.business} />}
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center p-6 bg-red-100 border border-red-400 rounded-md w-2/3 mx-auto">
      <p className="text-lg font-semibold text-red-700">
        Your business isn't verified
      </p>
      <p className="text-sm text-red-600">
        Please contact{" "}
        <a
          href="mailto:info@pamba.africa"
          className="text-blue-600 underline"
          rel="noopener noreferrer"
          target="_blank"
        >
          support
        </a>{" "}
        to verify your business and unlock all features.
      </p>
    </div>
  );
};

export default EditProfile;
