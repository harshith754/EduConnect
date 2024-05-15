import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req, { params }) {
  try {
    const email = params.email;

    const lecturesDelivered = await db.lecturesDelivered.findUnique({
      where: { email: email },
      include: {
        lectures: true, // Include educational qualifications for updating
      },
    });

    console.log(lecturesDelivered);
    return NextResponse.json({ lecturesDelivered }, { status: 201 });
  } catch (error) {
    console.error("Error creating PersonalDetails:", error);
    return NextResponse.json(
      { message: "An error occurred while creating PersonalDetails." },
      { status: 500 },
    );
  }
}
