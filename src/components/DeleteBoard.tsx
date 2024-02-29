"use client";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { deleteBoard } from "@/services/board";
import { Board } from "@/interfaces";

const DeleteBoard = ({ board }: { board: Board }) => {
  const handleDelete = async () => {
    const data = { id: board.id, orgId: board.orgId };
    const result: any = await deleteBoard(data);
    if (result?.error) {
      toast.error("board not deleted");
    }
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="h-auto w-auto p-2">
          <MoreHorizontal />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Board</SheetTitle>
          <SheetDescription>Do you want to delete this board?</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <SheetClose asChild>
            <Button
              type="submit"
              className="bg-red-500 text-white mt-5"
              onClick={handleDelete}
            >
              Delete this board
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default DeleteBoard;
