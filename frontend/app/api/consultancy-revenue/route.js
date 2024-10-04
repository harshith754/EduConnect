import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req) {
  try {
    const { email, trainingRevenue } = await req.json();

    console.log({ email, trainingRevenue });

    const Nrevenues = trainingRevenue.map(
      ({ trainingRevenuesId, ...rest }) => rest,
    );

    const user = await db.user.findUnique({
      where: {
        email: email,
      },
      include: {
        trainingRevenues: true,
      },
    });

    if (user && user.trainingRevenues) {
      // trainingRevenue exist, update them

      console.log("updating..");
      await db.revenue.deleteMany({
        where: {
          trainingRevenuesId: user.trainingRevenues.id,
        },
      });

      await db.trainingRevenues.delete({
        where: {
          email: email,
        },
      });

      const createdtrainingRevenues = await db.trainingRevenues.create({
        data: {
          revenues: {
            create: Nrevenues,
          },
          user: {
            connect: {
              email: email,
            },
          },
        },
      });
    } else {
      const createdtrainingRevenues = await db.trainingRevenues.create({
        data: {
          revenues: {
            create: Nrevenues,
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
      { message: "trainingRevenue Support Created/Updated." },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating/updating trainingRevenues:", error);
    return NextResponse.json(
      {
        message: "An error occurred while creating/updating trainingRevenues.",
      },
      { status: 500 },
    );
  }
}
