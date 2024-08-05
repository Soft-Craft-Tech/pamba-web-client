"use client";
import { getUser } from "@/utils/auth";
import Image from "next/image";
import ProfileUpdateForm from "./updateForm";
import { useGetSingleBusiness } from "@/app/api/businesses";

const EditProfile = () => {
  const { client } = getUser();
  // const client = user ? user.client : null;
  const { data } = useGetSingleBusiness(client?.slug);

  return (
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
  );
};

export default EditProfile;
