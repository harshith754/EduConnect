import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req, { params }) {
  try {
    const email = params.email;

    const financialSupport = await db.financialSupport.findUnique({
      where: { email: email },
      include: {
        supports: true, // Include educational qualifications for updating
      },
    });

    console.log(financialSupport);
    return NextResponse.json({ financialSupport }, { status: 201 });
  } catch (error) {
    console.error("Error creating PersonalDetails:", error);
    return NextResponse.json(
      { message: "An error occurred while creating PersonalDetails." },
      { status: 500 },
    );
  }
}
