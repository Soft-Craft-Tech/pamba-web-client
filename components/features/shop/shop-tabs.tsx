"use client";
import Button from "@/ui/button";
import React from "react";
import AboutShop from "./AboutShop";
import ReviewShop from "./ReviewShop";
import GalleryShop from "./GalleryShop";

const ShopTabs = () => {
  const [activeTab, setActiveTab] = React.useState("about");
  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };
  return (
    <div className="mx-auto max-w-screen-xl w-full mt-10 relative">
      <div className="w-full flex gap-x-10 ">
        <Button
          label="About"
          variant={activeTab === "about" ? "primary" : "secondary"}
          onClick={() => handleTabChange("about")}
        />
        <Button
          variant={activeTab === "review" ? "primary" : "secondary"}
          label="Review"
          onClick={() => handleTabChange("review")}
        />
        <Button
          variant={activeTab === "gallery" ? "primary" : "secondary"}
          label="Gallery"
          onClick={() => handleTabChange("gallery")}
        />
      </div>
      {activeTab === "about" && <AboutShop />}
      {activeTab === "review" && <ReviewShop />}
      {activeTab === "gallery" && <GalleryShop />}
    </div>
  );
};

export default ShopTabs;