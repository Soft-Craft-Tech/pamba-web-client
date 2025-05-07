import FloaterAppoitment from "@/components/FloaterAppointment";
import QueryProvider from "@/utils/providers/QueryProvider";
import StoreProvider from "@/utils/providers/StoreProvider";
import type { Metadata } from "next";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import HydrationProvider from "@/utils/providers/HydrationProvider";
import GMapsProvider from "@/utils/providers/GMapsProvider";

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
        <GMapsProvider>
          <HydrationProvider>
            <StoreProvider>
              <QueryProvider>{children}</QueryProvider>
            </StoreProvider>

            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition={Bounce}
            />
            <FloaterAppoitment />
          </HydrationProvider>
        </GMapsProvider>
      </body>
    </html>
  );
}
