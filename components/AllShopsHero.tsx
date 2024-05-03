import React from "react";

const AllShopsHero = () => {
  return (
    <section className="h-auto">
      <div
        className="w-full flex items-center h-[60vh] justify-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/all-shops.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <p className="text-white text-[50px] font-bold max-w-[900px] text-center">
          Discover Your Perfect Look: Explore Services Near You
        </p>
      </div>
    </section>
  );
};

export default AllShopsHero;
