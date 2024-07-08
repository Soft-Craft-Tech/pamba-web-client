"use client";
import { getUser } from "@/utils/auth";
import Image from "next/image";
import ProfileUpdateForm from "./updateForm";

export default function EditProfile() {
  const user = getUser();
  const client = user ? user.client : null;

  return (
    <div className="flex flex-col gap-10 ">
      <div className="flex flex-col items-center gap-3">
        {client && (
          <div className="w-32 h-32 border rounded-full relative overflow-hidden">
            <Image
              className="top-0 left-0 object-cover w-full h-full"
              src={
                client.profile_img
                  ? client.profile_img
                  : "https://github.com/shadcn.png"
              }
              alt="pamba-user"
              fill={true}
              priority
            />
          </div>
        )}
      </div>
      {client && <ProfileUpdateForm client={client} />}
    </div>
  );
}
