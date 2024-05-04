"use client";
import { isAuthenticated } from "@/utils/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export function NewProvider({ children }: { children: ReactNode }) {
  if (!isAuthenticated()) {
    redirect("/login");
  }
  return <>{children}</>;
}
