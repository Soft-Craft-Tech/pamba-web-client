import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "./QueryProvider";
import StoreProvider from "./StoreProvider";
import Link from "next/link";
import Image from "next/image";

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
        </div>
        <div className="fixed bottom-[calc(4rem+1.6rem)] z-50 right-0 mr-4 bg-white p-8 rounded-xl border border-[#e5e7eb]">
          <p className="text-[16px] font-bold max-w-[316px]">
            Book your next Salon, Spa, Haircut, Makeup appointment with ease
          </p>
          <Link
            href="/signup"
            className="bg-primary flex items-center w-max py-2 px-4 mt-5 text-white font-medium rounded-full gap-2 sm:py-4 sm:px-8 lg:py-3 lg:px-5 z-10"
          >
            Book Appointment
            <Image
              className="border bg-white rounded-full"
              src="/arrow-right.svg"
              alt="arrow-icon"
              width={20}
              height={20}
            />
          </Link>
        </div>
      </body>
    </html>
  );
}
