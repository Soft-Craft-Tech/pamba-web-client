import { ReactNode } from "react";
export default function VerifyAccount({ children }: { children: ReactNode }) {
  return (
    <main className="w-full h-screen bg-background flex justify-center items-center">
      {children}
    </main>
  );
}
