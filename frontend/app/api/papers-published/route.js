import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req) {
  try {
    const { email, researchPapers } = await req.json();

    console.log({ email, researchPapers });

    const NresearchPapers = researchPapers.map(
      ({ papersPublishedId, ...rest }) => rest,
    );

    // Check if the user already has book details

    const user = await db.user.findUnique({
      where: {
        email: email,
      },
      include: {
        papersPublished: true,
      },
    });

    if (user && user.papersPublished) {
      // papers published exist, update them
      console.log("updating..");
      await db.paper.deleteMany({
        where: {
          papersPublishedId: user.papersPublished.id,
        },
      });

      await db.papersPublished.delete({
        where: {
          email: email,
        },
      });
      const createdpapersPublished = await db.papersPublished.create({
        data: {
          papers: {
            create: NresearchPapers,
          },
          user: {
            connect: {
              email: email,
            },
          },
        },
      });
    } else {
      const createdpapersPublished = await db.papersPublished.create({
        data: {
          papers: {
            create: NresearchPapers,
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
      { message: "papersPublished Created/Updated." },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating/updating papersPublished:", error);
    return NextResponse.json(
      {
        message: "An error occurred while creating/updating papersPublished.",
      },
      { status: 500 },
    );
  }
}
