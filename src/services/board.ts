"use server";
import { getAuthSession } from "@/lib/auth";
import { prismaDB } from "@/providers/connection";
import { createAudLog } from "./audit";
import { ACTION, TABLE_TYPE } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Board, User } from "@/interfaces";

export const createBoard = async (data: {
  title: string;
  image: string;
  orgId: string;
}) => {
  const session = await getAuthSession();
  if (!session) {
    return {
      error: "user not found",
    };
  }
  const { title, image, orgId } = data;

  let board;
  try {
    board = await prismaDB.board.create({
      data: {
        title,
        image,
        orgId,
      },
    });
    await createAudLog({
      tableId: board.id,
      tableTitle: board.title,
      tableType: TABLE_TYPE.BOARD,
      action: ACTION.CREATE,
      orgId,
    });
  } catch (error) {
    return {
      error: "failed to create",
    };
  }
  revalidatePath("/");
  return { result: board };
};

// delete board
export const deleteBoard = async ({
  id,
  orgId,
}: {
  id: string;
  orgId: string;
}) => {
  const session = await getAuthSession();
  console.log(session);
  if (!session) {
    return {
      error: "user not found",
    };
  }
  let board;
  try {
    board = await prismaDB.board.delete({ where: { id } });

    await createAudLog({
      tableId: board.id,
      tableTitle: board.title,
      tableType: TABLE_TYPE.BOARD,
      action: ACTION.DELETE,
      orgId,
    });
  } catch (error) {
    return {
      error: "board not created",
    };
  }

  revalidatePath("/organizations");
  redirect("/organizations");
};

// get member without current board

export const getWithoutBoardMembers = async (data: { board: any }) => {
  const session = await getAuthSession();
  if (!session) {
    return {
      error: "user not found",
    };
  }

  const { board } = data;
  let users;

  try {
    users = await prismaDB.user.findMany({
      where: {
        AND: [
          {
            organizations: {
              some: { id: board.orgId },
            },
          },
          {
            NOT: {
              boards: {
                some: { id: board.id },
              },
            },
          },
        ],
      },
    });
  } catch (error) {
    return {
      error: "board id not exist",
    };
  }
  revalidatePath(`/board/${board.id}`);
  return { result: users };
};

// add memeber in board
export const addMemberInBoard = async (data: { user: User; board: Board }) => {
  const session = getAuthSession();

  if (!session) {
    return {
      error: "unauthorized",
    };
  }

  const { user, board } = data;
  let updateUser, updateBoard;
  try {
    [updateUser, updateBoard] = await prismaDB.$transaction([
      prismaDB.user.update({
        where: { id: user.id },
        data: {
          boardIds: user.boardIds,
        },
      }),
      prismaDB.board.update({
        where: { id: board.id },
        data: {
          userIds: board.userIds,
        },
      }),
    ]);
  } catch (error) {
    return {
      error: "user already exist",
    };
  }
  revalidatePath(`/board/${board.id}`);
  return { result: { updateUser, updateBoard } };
};
