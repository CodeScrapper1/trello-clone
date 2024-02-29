"use client";
import { List } from "@/interfaces";
import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import ListItem from "./ListItem";
import CreateList from "./CreateList";
import { reorderList } from "@/services/list";

interface ListProps {
  boardId: string;
  list: any;
}
// re order data
const reOrderData = (list: any, desIndex: number, sourceIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(sourceIndex, 1);
  result.splice(desIndex, 0, removed);

  return result;
};
const ListContainer = ({ boardId, list }: ListProps) => {
  const [listData, setListData] = useState(list);

  useEffect(() => {
    setListData(list);
  }, [list]);

  const onDragNDrop = async (result: any) => {
    const { destination, source, type } = result;

    if (!destination) return;

    if (
      destination.droppableId == source.droppableId &&
      destination.index == source.index
    ) {
      return;
    }

    if (type == "list") {
      const data = reOrderData(listData, destination.index, source.index).map(
        (item: any, index: number) => ({ ...item, order: index })
      );
      setListData(data);
      await reorderList({ items: data, boardId });
    }
  };
  return (
    <DragDropContext onDragEnd={onDragNDrop}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-3 h-full"
          >
            {listData?.map((list: List, index: number) => (
              <ListItem key={list.id} list={list} index={index} />
            ))}
            {provided.placeholder}
            <CreateList boardId={boardId} />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ListContainer;
