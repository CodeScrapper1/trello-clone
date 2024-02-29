"use server";
import { CreateAudLog, User } from "@/interfaces";
import { getAuthSession } from "@/lib/auth";
import { prismaDB } from "@/providers/connection";

export const createAudLog = async (props: CreateAudLog) => {
  try {
    const { tableId, tableTitle, tableType, action, orgId } = props;
    const session: any = await getAuthSession();
    if (!session) {
      return {
        error: "user not found",
      };
    }
    const user: any = await prismaDB.user.findUnique({
      where: { email: session.user.email },
    });
    console.log(user, "user");
    const audit = await prismaDB.audLog.create({
      data: {
        tableId,
        tableTitle,
        tableType,
        action,
        orgId,
        userId: user.id,
        userImage: user.image,
        userName: user.name,
      },
    });
    console.log(user, "user", audit);
  } catch (error) {
    console.log("audit error", error);
  }
};
