import { getAuthSession } from "@/lib/auth";
import { prismaDB } from "@/providers/connection";
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
    const card = await prismaDB.card.findUnique({
      where: { id: params.cardId },
      include: {
        list: true,
        users: true,
      },
    });

    return NextResponse.json(card);
  } catch (error) {
    return new NextResponse("Internat server error", { status: 500 });
  }
};
