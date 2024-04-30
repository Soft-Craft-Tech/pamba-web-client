"use client";
import { getUser, isAuthenticated } from "@/utils/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export function NewProvider({ children }: { children: ReactNode }) {
  // const { authToken } = getUser();
  if (!isAuthenticated()) {
    redirect("/login");
  }
  return <>{children}</>;
}
