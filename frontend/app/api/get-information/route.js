import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req) {
  try {
    const { selectedFields, selectedTitles } = await req.json();

    // console.log(selectedFields, selectedTitles);

    const postData = await db.user.findMany({
      select: {
        email: selectedFields.includes("email"),
        name: selectedFields.includes("name"),
        personalDetails: selectedTitles.includes("PersonalDetails")
          ? {
              select: {
                fullName: selectedFields.includes("fullName"),
                gender: selectedFields.includes("gender"),
                dateOfBirth: selectedFields.includes("dateOfBirth"),
                mobileNumber: selectedFields.includes("mobileNumber"),
                aadharDetails: selectedFields.includes("aadharDetails"),
                facultyId: selectedFields.includes("facultyId"),
                bloodGroup: selectedFields.includes("bloodGroup"),
                imageId: selectedFields.includes("imageId"),
              },
            }
          : false,
        professionalDetails: selectedTitles.includes("ProfessionalDetails")
          ? {
              select: {
                email: selectedFields.includes("email"),
                department: selectedFields.includes("department"),
                designation: selectedFields.includes("designation"),
                dateOfJoining: selectedFields.includes("dateOfJoining"),
                highestQualification: selectedFields.includes(
                  "highestQualification",
                ),
                teachingExperience:
                  selectedFields.includes("teachingExperience"),
                instituteExperience: selectedFields.includes(
                  "instituteExperience",
                ),
                educationalQualifications: selectedFields.includes(
                  "educationalQualifications",
                ),
                recognizedAsResearchGuide: selectedFields.includes(
                  "recognizedAsResearchGuide",
                ),
                yearOfRecognition: selectedFields.includes("yearOfRecognition"),
              },
            }
          : false,
        booksPublished: selectedTitles.includes("BooksPublished")
          ? {
              select: {
                books: {
                  select: {
                    title: selectedFields.includes("title"),
                    publishers: selectedFields.includes("publishers"),
                    yearOfPublication:
                      selectedFields.includes("yearOfPublication"),
                    dateOfPublication:
                      selectedFields.includes("dateOfPublication"),
                  },
                },
                _count: {
                  select: {
                    books: true,
                  },
                },
              },
            }
          : false,
        patentsRegistered: selectedTitles.includes("PatentsRegistered")
          ? {
              select: {
                patents: {
                  select: {
                    patentType: selectedFields.includes("patentType"),
                    applicationNo: selectedFields.includes("applicationNo"),
                    patentTitle: selectedFields.includes("patentTitle"),
                    publicationDate: selectedFields.includes("publicationDate"),
                    formFillingDate: selectedFields.includes("formFillingDate"),
                    authorList: selectedFields.includes("authorList"),
                    publishedYear: selectedFields.includes("publishedYear"),
                  },
                },
                _count: {
                  select: {
                    patents: true,
                  },
                },
              },
            }
          : false,
        awardsReceived: selectedTitles.includes("AwardsReceived")
          ? {
              select: {
                awards: {
                  select: {
                    awardName: selectedFields.includes("awardName"),
                    agencyName: selectedFields.includes("agencyName"),
                    agencyEmail: selectedFields.includes("agencyEmail"),
                    agencyAddress: selectedFields.includes("agencyAddress"),
                    yearReceived: selectedFields.includes("yearReceived"),
                    hasFellowship: selectedFields.includes("hasFellowship"),
                  },
                },
                _count: {
                  select: {
                    awards: true,
                  },
                },
              },
            }
          : false,
      },
    });

    return NextResponse.json({ postData }, { status: 201 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching data." },
      { status: 500 },
    );
  }
}
