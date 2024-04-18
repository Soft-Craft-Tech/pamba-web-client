import { ReactNode } from "react";

export default function ReportingLayout({ children }: { children: ReactNode }) {
  return <main className="w-full h-auto">{children}</main>;
}
