import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req, { params }) {
  try {
    const email = params.email;

    const booksPublished = await db.booksPublished.findUnique({
      where: { email: email },
      include: {
        books: true, // Include educational qualifications for updating
      },
    });

    console.log(booksPublished);
    return NextResponse.json({ booksPublished }, { status: 201 });
  } catch (error) {
    console.error("Error creating PersonalDetails:", error);
    return NextResponse.json(
      { message: "An error occurred while creating PersonalDetails." },
      { status: 500 },
    );
  }
}
