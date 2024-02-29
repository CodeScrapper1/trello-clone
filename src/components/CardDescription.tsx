"use client";
import { updateDard } from "@/services/card";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import TextAreaForm from "./TextAreaForm";
import FormSubmit from "./FormSubmit";
import { Button } from "./ui/button";

interface CardDetails {
  cardData: any;
  setCardData: (cardData: any) => void;
}

const CardDescription = ({ cardData, setCardData }: CardDetails) => {
  const { boardId }: { boardId: string } = useParams();
  const [isEditable, setIsEditable] = useState(false);

  const handleSubmit = async (data: FormData) => {
    const description = data.get("description") as string;
    const res = await updateDard({
      description,
      boardId,
      id: cardData?.id,
    });
    if (res?.result) {
      setCardData(res.result);
      toast.success("Card successfully udpated");
    }
    try {
    } catch (error) {
      toast.error("Card not udpated");
    }
  };
  return (
    <div>
      <div>
        <p className="font-bold text-slate-700">Description</p>
        {isEditable ? (
          <form action={handleSubmit} className="space-y-2">
            <TextAreaForm
              id="description"
              className="w-full mt-2"
              placeholder="Add more details"
              defaultValue={cardData?.description || ""}
            />
            <div className="flex justify-between items-center">
              <FormSubmit>Save</FormSubmit>
              <Button
                type="button"
                onClick={() => setIsEditable(false)}
                size="sm"
                variant="ghost"
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div
            role="button"
            className="min-h-20 bg-slate-100 text-sm p-3 rounded-ms"
            onClick={() => setIsEditable(true)}
          >
            {cardData?.description || "please add details"}
          </div>
        )}
      </div>
    </div>
  );
};

export default CardDescription;
