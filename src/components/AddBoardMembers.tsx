"use client";
import { Board, User } from "@/interfaces";
import React, { useEffect, useState } from "react";
import { Popover, PopoverContent } from "./ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { addMemberInBoard, getWithoutBoardMembers } from "@/services/board";
import { useRouter } from "next/navigation";

const AddBoardMembers = ({ board }: { board: Board }) => {
  const router = useRouter();
  const [members, setMembers] = useState<any>();
  const getMembers = async () => {
    const getUsers = await getWithoutBoardMembers({ board });
    setMembers(getUsers?.result);
  };

  useEffect(() => {
    if (board) getMembers();
  }, []);
  console.log(members, "members");
  const addMembers = async (user: User) => {
    user?.boardIds?.push(board.id);
    board?.userIds?.push(user.id);
    await addMemberInBoard({
      user,
      board,
    });
    setMembers(members?.filter((item: User) => item.id != user.id));
    router.refresh();
  };
  return (
    <Popover>
      <PopoverTrigger className="h-auto w-auto p-2 text-white">
        Join Board
      </PopoverTrigger>
      <PopoverContent
        className="px-0 py-3 bg-white"
        side="bottom"
        align="start"
      >
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Board Actions
        </div>
        {members?.map((user: any) => (
          <div
            key={user?.id}
            className="flex items-center gap-2 hover:bg-slate-100 p-2 cursor-pointer"
            onClick={() => addMembers(user)}
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
      </PopoverContent>
    </Popover>
  );
};

export default AddBoardMembers;
