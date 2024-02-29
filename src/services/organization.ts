"use server";
import { getAuthSession } from "@/lib/auth";
import { prismaDB } from "@/providers/connection";
import { revalidatePath } from "next/cache";

export const createOgranization = async (data: {
  title: string;
  image: string;
}) => {
  const session = getAuthSession();

  if (!session) {
    return {
      error: "unauthorized",
    };
  }

  const { title, image } = data;
  let organization;

  try {
    organization = await prismaDB.organization.create({
      data: {
        title,
        image,
      },
    });
  } catch (error) {
    return {
      error: "organization not created",
    };
  }

  revalidatePath("/");
  return { result: organization };
};

// get users without org
export const getWithoutOrgMembers = async (data: {
  organizationId: string;
}) => {
  const session = getAuthSession();

  if (!session) {
    return {
      error: "unauthorized",
    };
  }

  const { organizationId } = data;
  let users;

  try {
    users = await prismaDB.user.findMany({
      where: {
        NOT: {
          organizations: {
            some: { id: organizationId },
          },
        },
      },
    });
  } catch (error) {
    return {
      error: "user already exist",
    };
  }
  revalidatePath(`/orgnaizations/${organizationId}/members`);
  return { result: users };
};

// update or add member in organization
export const updateOrgMember = async (data: {
  id: string;
  organizationId: string;
  orgIds: any;
  userIds: any;
}) => {
  const session = getAuthSession();

  if (!session) {
    return {
      error: "unauthorized",
    };
  }

  const { id, organizationId, orgIds, userIds } = data;
  let updateUser, updateOrg;
  try {
    [updateUser, updateOrg] = await prismaDB.$transaction([
      prismaDB.user.update({
        where: { id },
        data: {
          orgIds,
        },
      }),
      prismaDB.organization.update({
        where: { id: organizationId },
        data: {
          userIds,
        },
      }),
    ]);
  } catch (error) {
    return {
      error: "user already exist",
    };
  }
  revalidatePath(`/orgnaizations/${organizationId}/members`);
  return { result: { updateUser, updateOrg } };
};

// remove org member
export const removeOrgMember = async (data: {
  userId: string;
  organizationId: string;
}) => {
  const session = getAuthSession();

  if (!session) {
    return {
      error: "unauthorized",
    };
  }

  const { userId, organizationId } = data;
  try {
    let updateUser, updateOrg;

    const organization: any = await prismaDB.organization.findUnique({
      where: { id: organizationId },
      select: { userIds: true },
    });

    const updateOrgUserIds = organization.userIds.filter(
      (id: string) => id != userId
    );
    await prismaDB.organization.update({
      where: { id: organizationId },
      data: {
        userIds: {
          set: updateOrgUserIds,
        },
      },
    });

    // 2. find users from board
    const boards = await prismaDB.board.findMany({
      where: { orgId: organizationId },
      select: { id: true, userIds: true },
    });

    for (const board of boards) {
      const updateBoardUserIds = board.userIds.filter((id) => id != userId);

      await prismaDB.board.update({
        where: {
          id: board.id,
        },
        data: {
          userIds: {
            set: updateBoardUserIds,
          },
        },
      });
      // 3. find users from card
      const cards = await prismaDB.card.findMany({
        where: { boardId: board.id },
        select: { id: true, userIds: true },
      });

      for (const card of cards) {
        const updateCardUserIds = card.userIds.filter((id) => id != userId);

        await prismaDB.card.update({
          where: {
            id: card.id,
          },
          data: {
            userIds: {
              set: updateCardUserIds,
            },
          },
        });
      }
    }
  } catch (error) {
    return {
      error: "user already exist",
    };
  }
  revalidatePath(`/orgnaizations/${organizationId}/members`);
  // return { result: { updateUser, updateOrg } };
};
