"use client";
import { Organization } from "@/interfaces";
import React from "react";
import AddMmebers from "./AddMmebers";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { removeOrgMember } from "@/services/organization";

const AllMembers = ({ organization }: { organization: any }) => {
  const removeMember = async (user: any) => {
    await removeOrgMember({
      userId: user.id,
      organizationId: organization?.id,
    });
  };
  return (
    <div>
      <div className="flex justify-between mb-5">
        <h2>Members</h2>
        <AddMmebers organization={organization} />
      </div>
      {organization.users?.map((user: any) => (
        <div className="flex justify-between items-center mb-5" key={user?.id}>
          <div className="flex items-center gap-2">
            <img
              src={user?.image}
              alt=""
              className="object-cover rounded-full h-12 w-12"
            />
            <div>
              <h1 className="font-semibold">{user?.name}</h1>
              <p className="text-gray-400 text-xs">{user?.id}</p>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <p className="">{user?.email}</p>
            <Button
              className="bg-slate-100 text-slate-500 hover:bg-slate-100"
              onClick={() => removeMember(user)}
            >
              <X className="h-4 w-4 mr-1" />
              <span>remove</span>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllMembers;
