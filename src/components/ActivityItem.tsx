import React from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { auditLogs } from "@/lib/auditLogs";

const ActivityItem = ({ item }: { item: any }) => {
  return (
    <div className="flex items-center gap-3 mb-4">
      <Avatar className="h-8 w-8">
        <AvatarImage src={item?.userImage} />
      </Avatar>
      <div className="text-slate-400 text-sm flex flex-col">
        <span className="text-slate-700 truncate">
          {item?.userName} {auditLogs(item)}
        </span>
        {/* <span className="">{item?.createdAt}</span> */}
      </div>
    </div>
  );
};

export default ActivityItem;
