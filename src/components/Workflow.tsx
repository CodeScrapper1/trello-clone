import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { workflowList } from "@/lib/data";
import { Button } from "./ui/button";

export function Workflow() {
  return (
    <div className="px-[10%] py-16 mt-10 bg-white">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {workflowList.map((item, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
              <div className="bg-white rounded-md h-64">
                <div
                  className={`h-10 w-full ${item.color} rounded-t-md relative`}
                >
                  <div className="h-10 w-10 bg-white absolute bottom-[-15px] left-3 rounded-md p-1">
                    <img src={item.img} alt="" />
                  </div>
                </div>
                <div className="p-3 pt-6">
                  <h5 className="mb-2 text-lg font-bold tracking-tight">
                    {item.title}
                  </h5>
                  <p className="mb-3 font-normal text-gray-700">{item.desc}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-[75%] lg:left-[92%] top-[-25px] bg-slate-300" />
        <CarouselNext className="absolute right-0 top-[-25px] bg-slate-300" />
      </Carousel>
      <div className="flex flex-col lg:flex-row justify-between items-center mb-16">
        <p className="text-center lg:text-start mb-2 text-lg w-full lg:w-2/3">
          No need to start from scratch. Jump-start your workflow with a proven
          playbook designed for different teams. Customize it to make it yours.
        </p>
        <Button className="bg-transparent text-black hover:bg-white border border-blue-500">
          Explore all use cases
        </Button>
      </div>
    </div>
  );
}
