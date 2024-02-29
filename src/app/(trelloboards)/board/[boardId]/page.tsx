import ListContainer from "@/components/ListContainer";
import { prismaDB } from "@/providers/connection";
import React from "react";

const BoardPage = async ({ params }: { params: { boardId: string } }) => {
  const list = await prismaDB.list.findMany({
    where: { boardId: params.boardId },
    include: {
      cards: {
        orderBy: {
          order: "asc",
        },
        include: {
          users: true,
        },
      },
    },
    orderBy: {
      order: "asc",
    },
  });
  return (
    <div className="p-4 w-full overflow-x-auto">
      <ListContainer boardId={params.boardId} list={list} />
    </div>
  );
};

export default BoardPage;
