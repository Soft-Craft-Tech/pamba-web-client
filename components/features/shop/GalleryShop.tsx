/* eslint-disable @next/next/no-img-element */
"use client";
import { useAllImages } from "@/app/api/gallery";
import { DynamicObject } from "@/components/types";
import React from "react";

const GalleryShop: React.FC<{ slug: string }> = ({ slug }) => {
  const { data: imagesData } = useAllImages(slug);
  return (
    <div className="grid grid-cols-2 mt-10 md:grid-cols-4 gap-4">
      {imagesData?.gallery.length === 0 ? (
        <div>
          <p>No Images Posted</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {imagesData?.gallery?.map(({ image_url, id }: DynamicObject) => (
            <div key={id}>
              <img
                className="h-auto max-w-full rounded-lg"
                src={image_url}
                alt=""
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryShop;
