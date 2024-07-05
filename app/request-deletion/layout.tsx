import { ReactNode } from "react";

export default function RequestDeletionLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <main className="container">{children}</main>;
}
