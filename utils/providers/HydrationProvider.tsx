"use client";

import SkeletonLoader from "@/components/Skeleton";
import { useEffect, useState } from "react";

export default function HydrationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isHydrated, setIsHydrated] = useState(false);

  // Wait till Next.js rehydration completes
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated ? <>{children}</> : <SkeletonLoader />;
}
