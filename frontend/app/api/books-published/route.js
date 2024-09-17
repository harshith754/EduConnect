import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req) {
  try {
    const { email, books } = await req.json();

    console.log({ email, books });

    const Nbooks = books.map(({ booksPublishedId, ...rest }) => rest);

    // Check if the user already has book details

    const user = await db.user.findUnique({
      where: {
        email: email,
      },
      include: {
        booksPublished: true,
      },
    });

    if (user && user.booksPublished) {
      // Professional details exist, update them

      console.log("updating..");
      await db.book.deleteMany({
        where: {
          booksPublishedId: user.booksPublished.id,
        },
      });

      await db.booksPublished.delete({
        where: {
          email: email,
        },
      });

      const createdBooksPublished = await db.booksPublished.create({
        data: {
          books: {
            create: Nbooks,
          },
          user: {
            connect: {
              email: email,
            },
          },
        },
      });
    } else {
      const createdBooksPublished = await db.booksPublished.create({
        data: {
          books: {
            create: Nbooks,
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
      { message: "booksPublished Created/Updated." },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating/updating booksPublished:", error);
    return NextResponse.json(
      {
        message: "An error occurred while creating/updating booksPublished.",
      },
      { status: 500 },
    );
  }
}
