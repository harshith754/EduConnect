import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req, { params }) {
  try {
    const email = params.email;

    const professionalDetails = await db.professionalDetails.findUnique({
      where: { email: email },
      include: {
        educationalQualifications: true, // Include educational qualifications for updating
      },
    });

    console.log(professionalDetails);
    return NextResponse.json({ professionalDetails }, { status: 201 });
  } catch (error) {
    console.error("Error creating PersonalDetails:", error);
    return NextResponse.json(
      { message: "An error occurred while creating PersonalDetails." },
      { status: 500 },
    );
  }
}
