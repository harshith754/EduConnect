import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req) {
  try {
    const { email, patents } = await req.json();

    console.log({ email, patents });
    const Npatents = patents.map(({ patentsRegisteredId, ...rest }) => rest);

    // Check if the user already has book details

    const user = await db.user.findUnique({
      where: {
        email: email,
      },
      include: {
        patentsRegistered: true,
      },
    });

    if (user && user.patentsRegistered) {
      // Professional details exist, update them

      console.log("updating..");
      await db.patent.deleteMany({
        where: {
          patentsRegisteredId: user.patentsRegistered.id,
        },
      });

      await db.patentsRegistered.delete({
        where: {
          email: email,
        },
      });

      const createdBooksPublished = await db.patentsRegistered.create({
        data: {
          patents: {
            create: Npatents,
          },
          user: {
            connect: {
              email: email,
            },
          },
        },
      });
    } else {
      const createdBooksPublished = await db.patentsRegistered.create({
        data: {
          patents: {
            create: Npatents,
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
      { message: "patents Created/Updated." },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating/updating patents:", error);
    return NextResponse.json(
      {
        message: "An error occurred while creating/updating booksPublished.",
      },
      { status: 500 },
    );
  }
}
