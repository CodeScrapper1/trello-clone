import { plansList } from "@/lib/data";
import React from "react";
import { Button } from "./ui/button";

const PlansComp = () => {
  let plansIndex = 2;
  return (
    <div>
      <div className="px-[10%] grid grid-cols-1 md:md:!grid-cols-2 lg:!grid-cols-4 gap-4 lg:gap-0 mt-6">
        {plansList?.map((item, index) => (
          <div
            key={index}
            className={`p-5 bg-white ${
              index == plansIndex
                ? "border-2 border-[#00c7e5]"
                : "border border-gray-200"
            }`}
          >
            <h1 className="text-sm font-semibold uppercase">{item.planName}</h1>
            <p className="h-28 mt-4">
              $<span className="text-5xl">{item.price}</span>USD
            </p>
            <p className="h-48">{item.desc}</p>
            <Button
              className={`border border-[#00c7e5] hover:bg-[#e6fafc] mb-5 ${
                index == plansIndex && "bg-[#e6fafc] text-[#00c7e5]"
              }`}
            >
              {item.button}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlansComp;
