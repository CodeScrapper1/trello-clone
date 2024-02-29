import React from "react";
import InputForm from "./InputForm";
import { useParams } from "next/navigation";
import { updateDard } from "@/services/card";
import { toast } from "sonner";

interface CardDetails {
  cardData: any;
  setCardData: (cardData: any) => void;
}
const CardHeader = ({ cardData, setCardData }: CardDetails) => {
  const { boardId }: { boardId: string } = useParams();
  const handleSubmit = async (data: FormData) => {
    const title = data.get("title") as string;
    const res = await updateDard({
      title,
      boardId,
      id: cardData.id,
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
    <div className="flex items-start gap-x-3 mb-6 w-full">
      <div className="w-full">
        <form action={handleSubmit}>
          <InputForm
            id="title"
            defaultValue={cardData?.title}
            className="font-semibold text-xl px-1 text-gray-700 bg-transparent border-transparent focus-visible:border-input mb-0.5 truncate relative -left-2.5"
          />
        </form>
        <p className="text-sm text-slate-400">
          list name <span>{cardData?.list?.title}</span>
        </p>
      </div>
    </div>
  );
};

export default CardHeader;
