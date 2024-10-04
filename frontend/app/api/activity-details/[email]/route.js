import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req, { params }) {
  try {
    const email = params.email;

    const activityDetails = await db.activityDetails.findUnique({
      where: { email: email },
      include: {
        activities: true, // Include educational qualifications for updating
      },
    });

    console.log(activityDetails);
    return NextResponse.json({ activityDetails }, { status: 201 });
  } catch (error) {
    console.error("Error creating PersonalDetails:", error);
    return NextResponse.json(
      { message: "An error occurred while creating PersonalDetails." },
      { status: 500 },
    );
  }
}
