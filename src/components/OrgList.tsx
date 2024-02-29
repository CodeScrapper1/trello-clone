import { Organization } from "@/interfaces";
import React from "react";
import { Accordion } from "@/components/ui/accordion";
import SidebarItem from "./SidebarItem";
interface OrgProps {
  getOrganizations: Organization[];
}
const OrgList = ({ getOrganizations }: OrgProps) => {
  return (
    <Accordion type="multiple" className="space-y-2">
      {getOrganizations?.map((org: Organization) => (
        <SidebarItem org={org} />
      ))}
    </Accordion>
  );
};

export default OrgList;
