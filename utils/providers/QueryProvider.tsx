"use client";

import { getUser, isAuthenticated, logoutUser } from "@/utils/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { ReactNode } from "react";
dayjs.extend(isSameOrAfter);

const queryClient = new QueryClient();
function QueryProvider({ children }: { children: ReactNode }) {
  if (!isAuthenticated() && dayjs().isSameOrAfter(dayjs(getUser()?.expires))) {
    logoutUser();
  }
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}

export default QueryProvider;
