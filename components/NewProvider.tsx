"use client";
import { getUser, isAuthenticated, logoutUser } from "@/utils/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
dayjs.extend(isSameOrAfter);

export function NewProvider({ children }: { children: ReactNode }) {
  if (!isAuthenticated() && dayjs().isSameOrAfter(dayjs(getUser()?.expires))) {
    logoutUser();
    redirect("/login");
  }
  return <>{children}</>;
}
