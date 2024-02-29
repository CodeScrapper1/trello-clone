import AllMembers from "@/components/AllMembers";
import { OrgId } from "@/interfaces";
import { prismaDB } from "@/providers/connection";
import React from "react";

const page = async ({ params: { organizationId } }: OrgId) => {
  const organization = await prismaDB.organization.findUnique({
    where: { id: organizationId },
    include: { users: true },
  });
  return (
    <div className="w-full">
      <AllMembers organization={organization} />
    </div>
  );
};

export default page;
