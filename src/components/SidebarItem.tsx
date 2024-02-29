"use client";
import React from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Organization } from "@/interfaces";
import Image from "next/image";
import { Activity, Layout } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

const SidebarItem = ({ org }: { org: Organization }) => {
  const router = useRouter();
  const pathname = usePathname();
  const routes = [
    {
      label: "Boards",
      icon: <Layout className="h-4 w-4 mr-2" />,
      href: `/organizations/${org.id}`,
    },
    {
      label: "Activity",
      icon: <Activity className="h-4 w-4 mr-2" />,
      href: `/organizations/${org.id}/activity`,
    },
    {
      label: "Members",
      icon: <Activity className="h-4 w-4 mr-2" />,
      href: `/organizations/${org.id}/members`,
    },
  ];

  return (
    <AccordionItem value={org?.id} className="border-none">
      <AccordionTrigger>
        <div className="flex items-center gap-x-2">
          <div className="w-7 h-7 relative">
            <Image
              fill
              src={org?.image}
              alt={org?.title}
              className="rounded-sm object-cover"
            />
          </div>
          <span className="font-medium text-sm">{org?.title}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="">
        {routes?.map((route) => (
          <Button
            key={route.href}
            onClick={() => router.push(route.href)}
            className={cn(
              "w-full font-normal justify-start pl-10 mb-1",
              pathname == route.href && "bg-sky-500/10 text-sky-700"
            )}
            variant="ghost"
          >
            {route.icon}
            {route.label}
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

export default SidebarItem;
