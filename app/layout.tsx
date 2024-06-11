import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "./QueryProvider";
import StoreProvider from "./StoreProvider";

import FloaterAppoitment from "@/components/FloaterAppointment";

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
        <StoreProvider>
          <QueryProvider>{children}</QueryProvider>
        </StoreProvider>
        <FloaterAppoitment />
      </body>
    </html>
  );
}
