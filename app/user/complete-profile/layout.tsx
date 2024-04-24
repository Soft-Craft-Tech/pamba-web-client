import { ReactNode } from "react";

export default function CompleteProfileLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="flex w-full min-h-screen bg-background">{children}</main>
  );
}
