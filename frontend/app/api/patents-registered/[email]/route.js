import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req, { params }) {
  try {
    const email = params.email;

    const patentsRegistered = await db.patentsRegistered.findUnique({
      where: { email: email },
      include: {
        patents: true, // Include educational qualifications for updating
      },
    });

    console.log(patentsRegistered);
    return NextResponse.json({ patentsRegistered }, { status: 201 });
  } catch (error) {
    console.error("Error creating PersonalDetails:", error);
    return NextResponse.json(
      { message: "An error occurred while creating PersonalDetails." },
      { status: 500 },
    );
  }
}
