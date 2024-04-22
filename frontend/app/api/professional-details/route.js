import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req) {
  try {
    const {
      designation,
      department,
      dateOfJoining,
      highestQualification,
      instituteExperience,
      teachingExperience,
      educationalQualifications,
      email,
    } = await req.json();

    // Check if the user already has professional details
    const user = await db.user.findUnique({
      where: {
        email: email,
      },
      include: {
        professionalDetails: {
          include: {
            educationalQualifications: true, // Include educational qualifications for updating
          },
        },
      },
    });

    if (user && user.professionalDetails) {
      // Professional details exist, update them

      await db.educationalQualification.deleteMany({
        where: {
          professionalDetailsId: user.professionalDetails.id,
        },
      });

      await db.professionalDetails.delete({
        where: {
          email: email,
        },
      });

      const createdProfessionalDetails = await db.professionalDetails.create({
        data: {
          designation,
          department,
          dateOfJoining,
          highestQualification,
          instituteExperience,
          teachingExperience,
          educationalQualifications: {
            create: educationalQualifications,
          },
          user: {
            connect: {
              email: email,
            },
          },
        },
        include: {
          educationalQualifications: true,
        },
      });
    } else {
      // Professional details don't exist, create them
      const createdProfessionalDetails = await db.professionalDetails.create({
        data: {
          designation,
          department,
          dateOfJoining,
          highestQualification,
          instituteExperience,
          teachingExperience,
          educationalQualifications: {
            create: educationalQualifications,
          },
          user: {
            connect: {
              email: email,
            },
          },
        },
        include: {
          educationalQualifications: true,
        },
      });
    }

    return NextResponse.json(
      { message: "ProfessionalDetails Created/Updated." },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating/updating ProfessionalDetails:", error);
    return NextResponse.json(
      {
        message:
          "An error occurred while creating/updating ProfessionalDetails.",
      },
      { status: 500 },
    );
  }
}
