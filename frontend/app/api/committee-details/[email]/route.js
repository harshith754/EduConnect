import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req, { params }) {
  try {
    const email = params.email;

    const committeeDetails = await db.committeeDetails.findUnique({
      where: { email: email },
      include: {
        committees: true, // Include educational qualifications for updating
      },
    });

    console.log(committeeDetails);
    return NextResponse.json({ committeeDetails }, { status: 201 });
  } catch (error) {
    console.error("Error creating PersonalDetails:", error);
    return NextResponse.json(
      { message: "An error occurred while creating PersonalDetails." },
      { status: 500 },
    );
  }
}
