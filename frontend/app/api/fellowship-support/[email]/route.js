import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req, { params }) {
  try {
    const email = params.email;

    const fellowshipSupport = await db.fellowshipSupport.findUnique({
      where: { email: email },
      include: {
        fellowships: true, // Include educational qualifications for updating
      },
    });

    console.log(fellowshipSupport);
    return NextResponse.json({ fellowshipSupport }, { status: 201 });
  } catch (error) {
    console.error("Error creating PersonalDetails:", error);
    return NextResponse.json(
      { message: "An error occurred while creating PersonalDetails." },
      { status: 500 },
    );
  }
}
