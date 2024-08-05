import { ReactNode } from "react";

export const metadata = {
  title: "Pamba Services",
  description: "Simplify Your Operations With Effortless Business Management",
};

export default function AllServicesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="container">{children}</div>;
}
