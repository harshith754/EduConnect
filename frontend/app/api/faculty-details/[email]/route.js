import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req, { params }) {
  try {
    const email = params.email;

    const facultyDetails = await db.user.findUnique({
      where: {
        email: email, // Replace this with the actual email
      },
      include: {
        personalDetails: true,
        professionalDetails: {
          include: {
            educationalQualifications: true, // Include nested educational qualifications
          },
        },
        booksPublished: {
          include: {
            books: true, // Include related books
          },
        },
        patentsRegistered: {
          include: {
            patents: true, // Include related patents
          },
        },
        awardsReceived: {
          include: {
            awards: true, // Include related awards
          },
        },
        lecturesDelivered: {
          include: {
            lectures: true, // Include related lectures
          },
        },
        papersPublished: {
          include: {
            papers: true, // Include related papers
          },
        },
        financialSupport: {
          include: {
            supports: true, // Include related financial support details
          },
        },
        fellowshipSupport: {
          include: {
            fellowships: true, // Include related fellowship details
          },
        },
        committeeDetails: {
          include: {
            committees: true, // Include related committees
          },
        },
        activityDetails: {
          include: {
            activities: true, // Include related activities
          },
        },
        trainingRevenues: {
          include: {
            revenues: true, // Include related training revenues
          },
        },
      },
    });
    console.log(facultyDetails);
    return NextResponse.json({ facultyDetails }, { status: 201 });
  } catch (error) {
    console.error("Error creating facultyDetails:", error);
    return NextResponse.json(
      { message: "An error occurred while creating facultyDetails." },
      { status: 500 },
    );
  }
}
