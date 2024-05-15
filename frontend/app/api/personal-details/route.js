import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req) {
  try {
    const {
      fullName,
      gender,
      dateOfBirth,
      email,
      mobileNumber,
      aadharDetails,
      facultyId,
      imageId,
    } = await req.json();

    // Create a new PersonalDetails instance

    const user = await db.user.findUnique({
      where: {
        email: email,
      },
      include: {
        personalDetails: true,
      },
    });

    if (user && user.personalDetails) {
      // Personal details exist, update them
      const pD = await db.personalDetails.update({
        where: {
          id: user.personalDetails.id,
        },
        data: {
          fullName,
          gender,
          dateOfBirth,
          mobileNumber,
          aadharDetails,
          facultyId,
          imageId,
        },
      });
    } else {
      // Personal details don't exist, create them
      const pD = await db.personalDetails.create({
        data: {
          fullName,
          gender,
          dateOfBirth,
          mobileNumber,
          aadharDetails,
          facultyId,
          imageId,
          user: {
            connect: {
              email: email,
            },
          },
        },
      });
    }

    return NextResponse.json(
      { message: "PersonalDetails Created." },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating PersonalDetails:", error);
    return NextResponse.json(
      { message: "An error occurred while creating PersonalDetails." },
      { status: 500 },
    );
  }
}
