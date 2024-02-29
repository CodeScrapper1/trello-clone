"use client";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ImagesForm from "./ImagesForm";
import InputForm from "./InputForm";
import FormSubmit from "./FormSubmit";
import { toast } from "sonner";
import { createBoard } from "@/services/board";
import { useParams, useRouter } from "next/navigation";

const CreateBoardPopup = () => {
  const router = useRouter();
  const { organizationId } = useParams();
  let orgId = organizationId as string;
  const handleSubmit = async (formData: FormData) => {
    try {
      const title = formData.get("title") as string;
      const image = formData.get("image") as string;
      if (!title || !image || !orgId) {
        toast.error("please fill all required fields");
        return;
      }
      console.log(orgId);
      const res = await createBoard({ title, image, orgId });
      toast.success("Board successfully added");
      router.push(`/board/${res?.result?.id}`);
    } catch (error) {
      toast.error("organization not created");
    }
  };
  return (
    <Popover>
      <PopoverTrigger>
        <div
          role="button"
          className="h-24 w-40 p-3 aspect-video relative bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition"
        >
          <p className="text-sm">Create new board</p>
          <p className="text-xs">Unlimited</p>
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <div className="font-medium text-center text-gray-600 pb-4 text-sm">
          Create Board
        </div>
        <form action={handleSubmit}>
          <div>
            <ImagesForm name="image" />
            <InputForm id="title" label="Board Title" type="text" />
            <FormSubmit className="w-full mt-2">Create Board</FormSubmit>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default CreateBoardPopup;
