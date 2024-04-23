import { ReactNode } from "react";

export default function RequestDeletionLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <main>{children}</main>;
}
