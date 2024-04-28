import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req, { params }) {
  try {
    const email = params.email;

    const awardsReceived = await db.awardsReceived.findUnique({
      where: { email: email },
      include: {
        awards: true, // Include educational qualifications for updating
      },
    });

    console.log(awardsReceived);
    return NextResponse.json({ awardsReceived }, { status: 201 });
  } catch (error) {
    console.error("Error creating PersonalDetails:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching award details." },
      { status: 500 },
    );
  }
}
