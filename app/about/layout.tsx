import { ReactNode } from "react";

export const metadata = {
  title: "About Pamba",
  description: "Simplify Your Operations With Effortless Business Management",
};
export default function AboutLayout({ children }: { children: ReactNode }) {
  return <main className="relative">{children}</main>;
}
