import { ReactNode } from "react";
export default function VerifyAccount({ children }: { children: ReactNode }) {
  return (
    <main className="w-screen h-screen bg-background flex justify-center items-center">
      {children}
    </main>
  );
}
