"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dayjs from "dayjs";
import { getUser, isAuthenticated, logoutUser } from "@/utils/auth";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
dayjs.extend(isSameOrAfter);

const queryClient = new QueryClient();
function QueryProvider({ children }: { children: ReactNode }) {
  if (!isAuthenticated() && dayjs().isSameOrAfter(dayjs(getUser()?.expires))) {
    logoutUser();
  }
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default QueryProvider;
