import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req) {
  try {
    const { email, committeeDetails } = await req.json();

    console.log({ email, committeeDetails });

    const NcommitteeDetails = committeeDetails.map(
      ({ committeeDetailsId, ...rest }) => rest,
    );

    const user = await db.user.findUnique({
      where: {
        email: email,
      },
      include: {
        committeeDetails: true,
      },
    });

    if (user && user.committeeDetails) {
      // fellowship exist, update them

      console.log("updating..");
      await db.committee.deleteMany({
        where: {
          committeeDetailsId: user.committeeDetails.id,
        },
      });

      await db.committeeDetails.delete({
        where: {
          email: email,
        },
      });

      const createdCommitteeDetails = await db.committeeDetails.create({
        data: {
          committees: {
            create: NcommitteeDetails,
          },
          user: {
            connect: {
              email: email,
            },
          },
        },
      });
    } else {
      const createdCommitteeDetails = await db.committeeDetails.create({
        data: {
          committees: {
            create: NcommitteeDetails,
          },
          user: {
            connect: {
              email: email,
            },
          },
        },
      });
    }
    return NextResponse.json(
      { message: "CommitteeDetails   Created/Updated." },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating/updating CommitteeDetails :", error);
    return NextResponse.json(
      {
        message: "An error occurred while creating/updating CommitteeDetails .",
      },
      { status: 500 },
    );
  }
}
