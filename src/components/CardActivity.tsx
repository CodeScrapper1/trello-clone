import { CreateAudLog } from "@/interfaces";
import React from "react";
import ActivityItem from "./ActivityItem";

const CardActivity = ({ auditDetails }: { auditDetails: CreateAudLog[] }) => {
  return (
    <div>
      <div className="w-full py-5">
        <p className="font-bold">Activity Logs</p>
        <ol className="mt-5">
          {auditDetails?.map((item) => (
            <ActivityItem key={item.id} item={item} />
          ))}
        </ol>
      </div>
    </div>
  );
};

export default CardActivity;
