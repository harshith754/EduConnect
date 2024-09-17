import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req) {
  try {
    const { email, awards } = await req.json();

    console.log({ email, awards });

    const Nawards = awards.map(({ awardsReceivedId, ...rest }) => rest);

    // Check if the user already has book details

    const user = await db.user.findUnique({
      where: {
        email: email,
      },
      include: {
        awardsReceived: true,
      },
    });

    if (user && user.awardsReceived) {
      // Professional details exist, update them

      console.log("updating..");
      await db.award.deleteMany({
        where: {
          awardsReceivedId: user.awardsReceived.id,
        },
      });

      await db.awardsReceived.delete({
        where: {
          email: email,
        },
      });

      const createAwardsReceived = await db.awardsReceived.create({
        data: {
          awards: {
            create: Nawards,
          },
          user: {
            connect: {
              email: email,
            },
          },
        },
      });
    } else {
      const createAwardsReceived = await db.awardsReceived.create({
        data: {
          awards: {
            create: Nawards,
          },
          user: {
            connect: {
              email: email,
            },
          },
        },
      });
    }
    return NextResponse.json(
      { message: "awardsReceived Created/Updated." },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating/updating awardsReceived:", error);
    return NextResponse.json(
      {
        message: "An error occurred while creating/updating booksPublished.",
      },
      { status: 500 },
    );
  }
}
