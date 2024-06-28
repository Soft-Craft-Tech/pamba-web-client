"use client";
import Image from "next/image";
import { AiFillEdit } from "react-icons/ai";
import ProfileUpdateForm from "./updateForm";
import { getUser } from "@/utils/auth";
import { useEffect, useState } from "react";

interface IUser {
  active: boolean;
  business_name: string;
  city: string;
  description: string;
  email: string;
  google_map: string;
  id: number;
  join_date: string;
  location: string;
  phone: string;
  profile_img: string;
  slug: string;
  verified: boolean;
  weekday_closing: string;
  weekday_opening: string;
  weekend_closing: string;
  weekend_opening: string;
}

export default function EditProfile() {
  const [client, setClient] = useState<IUser>({
    active: true,
    business_name: "",
    city: "",
    description: "",
    email: "",
    google_map: "",
    id: 1,
    join_date: "",
    location: "",
    phone: "",
    profile_img: "",
    slug: "",
    verified: true,
    weekday_closing: "",
    weekday_opening: "",
    weekend_closing: "",
    weekend_opening: "",
  });

  useEffect(() => {
    const { client } = getUser();
    setClient(client);
  }, []);

  return (
    <div className="flex flex-col gap-10 ">
      <div className="flex flex-col items-center gap-3">
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
        <button className="text-sm text-blue-400 w-auto h-auto flex items-center gap-2">
          <AiFillEdit size={20} />
          Change Image
        </button>
      </div>
      <ProfileUpdateForm client={client} />
    </div>
  );
}
