"use client";
import { AppStore, makeStore } from "@/store/store";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { Provider } from "react-redux";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  const pathname = usePathname();
  return (
    <Provider store={storeRef.current}>
      <div
        className={`mx-auto ${
          pathname.includes("booking") ? "" : "max-w-screen-xl"
        } w-full relative`}
      >
        {children}
      </div>
    </Provider>
  );
}
