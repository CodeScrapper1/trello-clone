"use client";
import React, { useEffect, useState } from "react";
import { Popover, PopoverContent } from "./ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { getWithoutOrgMembers, updateOrgMember } from "@/services/organization";
import { User } from "@/interfaces";

const AddMmebers = ({ organization }: { organization: any }) => {
  const [memebers, setMembers] = useState<any>([]);
  const getMembers = async () => {
    const getUsers = await getWithoutOrgMembers({
      organizationId: organization?.id,
    });
    setMembers(getUsers?.result);
  };
  useEffect(() => {
    if (organization) getMembers();
  }, []);

  const handleSubmit = async (user: any) => {
    user?.orgIds?.push(organization?.id);
    organization?.userIds?.push(user?.id);
    await updateOrgMember({
      id: user.id,
      organizationId: organization.id,
      orgIds: user?.orgIds,
      userIds: organization?.userIds,
    });
    setMembers(memebers?.filter((item: User) => item?.id != user?.id));
  };
  return (
    <Popover>
      <PopoverTrigger>
        <Button className="bg-white text-black hover:bg-slate-100 ml-auto cursor-pointer">
          <Plus className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-80 pt-3 z-50 bg-white"
        side="bottom"
        sideOffset={18}
      >
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Add Member
        </div>
        <div>
          {memebers?.map((user: any) => (
            <div
              key={user?.id}
              className="flex items-center gap-2 hover:bg-slate-100 p-2 cursor-pointer"
              onClick={() => handleSubmit(user)}
            >
              <img
                src={user?.image}
                className="object-cover rounded-full h-12 w-12"
                alt=""
              />
              <div>
                <h1 className="font-semibold">{user?.name}</h1>
                <p className="text-gray-400 text-xs">{user?.id}</p>
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AddMmebers;
