import { getAuthSession } from "@/lib/auth";
import { prismaDB } from "@/providers/connection";
import { TABLE_TYPE } from "@prisma/client";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { cardId: string } }
) => {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const audit = await prismaDB.audLog.findMany({
      where: { tableId: params.cardId, tableType: TABLE_TYPE.CARD },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(audit);
  } catch (error) {
    return new NextResponse("Internat server error", { status: 500 });
  }
};
