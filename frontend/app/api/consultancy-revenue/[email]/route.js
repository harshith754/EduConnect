import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req, { params }) {
  try {
    const email = params.email;

    const trainingRevenues = await db.trainingRevenues.findUnique({
      where: { email: email },
      include: {
        revenues: true, // Include educational qualifications for updating
      },
    });

    console.log(trainingRevenues);
    return NextResponse.json({ trainingRevenues }, { status: 201 });
  } catch (error) {
    console.error("Error creating PersonalDetails:", error);
    return NextResponse.json(
      { message: "An error occurred while creating PersonalDetails." },
      { status: 500 },
    );
  }
}
