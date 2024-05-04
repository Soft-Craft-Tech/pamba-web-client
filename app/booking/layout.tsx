import AppSection from "@/components/features/home/appSection";
import RevampedHeader from "@/components/shared/header/revampedHeader";
import { ReactNode } from "react";
export const metadata = {
  title: "Book your Appointment",
  description: "Simplify Your Operations With Effortless Business Management",
};

export default function BookingLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <RevampedHeader />
      {children}
      <AppSection />
    </div>
  );
}
