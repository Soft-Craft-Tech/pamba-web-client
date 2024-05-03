import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "./QueryProvider";
import StoreProvider from "./StoreProvider";

import FloaterAppoitment from "@/components/FloaterAppoitment";

export const metadata: Metadata = {
  title: "Pamba App",
  description: "Simplify Your Operations With Effortless Business Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-manrope bg-background flex flex-col items-center">
        <div className="mx-auto max-w-screen-xl w-full relative">
          <StoreProvider>
            <QueryProvider>{children}</QueryProvider>
          </StoreProvider>
          <FloaterAppoitment />
        </div>
      </body>
    </html>
  );
}
