import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req, { params }) {
  try {
    const email = params.email;

    const papersPublished = await db.papersPublished.findUnique({
      where: { email: email },
      include: {
        papers: true, // Include educational qualifications for updating
      },
    });

    console.log(papersPublished);
    return NextResponse.json({ papersPublished }, { status: 201 });
  } catch (error) {
    console.error("Error fetching papers:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching papers." },
      { status: 500 },
    );
  }
}
