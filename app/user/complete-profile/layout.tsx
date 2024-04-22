import { CompleteProfileWrapper } from "@/context/completeProfile/completeProfileContext";
import { ReactNode } from "react";

export default function CompleteProfileLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="flex w-full min-h-screen bg-background">
      <CompleteProfileWrapper>{children}</CompleteProfileWrapper>
    </main>
  );
}
