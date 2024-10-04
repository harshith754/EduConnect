import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req) {
  try {
    const { email, activities } = await req.json();

    console.log({ email, activities });

    const Nactivities = activities.map(
      ({ activityDetailsId, ...rest }) => rest,
    );

    const user = await db.user.findUnique({
      where: {
        email: email,
      },
      include: {
        activityDetails: true,
      },
    });

    if (user && user.activityDetails) {
      // activities exist, update them

      console.log("updating..");
      await db.activities.deleteMany({
        where: {
          activityDetailsId: user.activityDetails.id,
        },
      });

      await db.activityDetails.delete({
        where: {
          email: email,
        },
      });

      const createdactivityDetails = await db.activityDetails.create({
        data: {
          activities: {
            create: Nactivities,
          },
          user: {
            connect: {
              email: email,
            },
          },
        },
      });
    } else {
      const createdactivityDetails = await db.activityDetails.create({
        data: {
          activities: {
            create: Nactivities,
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
      { message: "activities Support Created/Updated." },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating/updating activityDetails:", error);
    return NextResponse.json(
      {
        message: "An error occurred while creating/updating activityDetails.",
      },
      { status: 500 },
    );
  }
}
