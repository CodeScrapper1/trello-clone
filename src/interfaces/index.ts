import { z } from "zod";
export type User = {
  id: string;
  name: string;
  email: string;
  emailVerified?: string;
  image?: string;
  orgIds: string[];
  boardIds?: string[];
  cardIds?: string[];
};

export type Board = {
  id: string;
  orgId: string;
  organization?: Organization;
  title: string;
  image: string;
  userIds?: string[];
  Users?: User[];
  lists?: List[];
};

export type Organization = {
  id: string;
  title: string;
  image: string;
  userIds?: string[];
  users?: User[];
  boards?: Board[];
  createdAt: Date;
};

export type List = {
  id: string;
  title: string;
  order: number;
  boardId: string;
  board: Board;
  cards: Card[];
  createdAt: Date;
  updatedAt: Date;
};
export type Card = {
  id: string;
  title: string;
  order: number;
  description: string;
  listId?: string;
  list?: List;
  userIds?: string[];
  users?: User[];
  label: Label[];
  createdAt: Date;
  updatedAt: Date;
};

export type Label = {
  id: string;
  name: string;
  color: string;
  cardId?: string;
  card: Card;
};

export type CreateAudLog = {
  id?: string;
  tableId: string;
  tableType: any;
  tableTitle: string;
  action: any;
  orgId?: string;
  userImage?: string;
  userName?: string;
  createdAt?: string;
};

export type OrgId = {
  params: {
    organizationId: string;
  };
};
export const UpdateCard = z.object({
  description: z.optional(z.string()),
  title: z.optional(z.string()),
  boardId: z.string(),
  id: z.string(),
});
