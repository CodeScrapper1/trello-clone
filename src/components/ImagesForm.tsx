"use client";
import { defaultImages } from "@/contants/images";
import React, { useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";

const ImagesForm = ({ name }: { name: string }) => {
  const [imageId, setImageId] = useState("");
  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2 mb-2">
        {defaultImages?.map((image: any) => (
          <div
            className={
              "cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted"
            }
            onClick={() => setImageId(image.id)}
            key={image.id}
          >
            <input
              type="radio"
              id={name}
              name={name}
              checked={imageId == image.id}
              value={image.image}
              className="hidden"
            />
            <Image
              src={image.image}
              alt={image.name}
              className="object-cover rounded-sm"
              fill
            />
            {imageId == image.id && (
              <div className="absolute inset-y-0 h-full w-full bg-black/40 flex items-center justify-center">
                <Check className="h-4 w-4 text-white" />
              </div>
            )}
            <span className="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white p-0.5 bg-black/50">
              {image.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagesForm;
