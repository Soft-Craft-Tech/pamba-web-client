import Link from "next/link";
import React from "react";

const AllShops = () => {
  return (
    <div>
      <Link href="/all-shops/dnjdnjnd">
        <button className="w-full px-5 mt-3 py-2 border border-primary rounded-full text-primary font-medium md:px-7 md:py-3">
          Explore
        </button>
      </Link>
    </div>
  );
};

export default AllShops;
