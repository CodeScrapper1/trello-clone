"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import FormSubmit from "./FormSubmit";
import { Button } from "./ui/button";
import { Plus, X } from "lucide-react";
import TextAreaForm from "./TextAreaForm";
import { useParams } from "next/navigation";
import { cardCreate } from "@/services/card";

const CreateCard = ({ listId }: { listId: string }) => {
  const { boardId }: { boardId: string } = useParams();
  const [isEditable, setIsEditable] = useState(false);
  const editEnable = () => {
    setIsEditable(true);
  };
  const handleSubmit = async (formData: FormData) => {
    try {
      const title = formData.get("title") as string;
      if (!title) {
        toast.error("please add list title");
        return;
      }
      const res = await cardCreate({ title, listId, boardId });
      if (res?.result) {
        toast.success("Card successfully added");
      }
    } catch (error) {
      toast.error("card not created");
    }
  };

  if (isEditable) {
    return (
      <li className="shrink-0 h-full w-[272px] select-none bg-white relative">
        <form action={handleSubmit} className="m-1 py-0.5 px-1 space-y-4">
          <div>
            <TextAreaForm id="title" placeholder="List Title" />
            <FormSubmit className="mt-2">Create Card</FormSubmit>
          </div>
        </form>
        <Button
          className="absolute bottom-0 right-0 bg-white text-black hover:bg-white"
          onClick={() => setIsEditable(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </li>
    );
  }
  return (
    <li className="pt-2 px-2">
      <Button
        className="h-auto w-full text-muted-foreground text-sm px-2 py-1.5 bg-white hover:bg-white"
        onClick={editEnable}
      >
        Create Card
        <Plus className="h-4 w-4 mr-2" />
      </Button>
    </li>
  );
};

export default CreateCard;
