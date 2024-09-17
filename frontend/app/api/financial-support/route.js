import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req) {
  try {
    const { email, financialSupport } = await req.json();

    console.log({ email, financialSupport });

    const NfinancialSupport = financialSupport.map(
      ({ financialSupportId, ...rest }) => rest,
    );

    const user = await db.user.findUnique({
      where: {
        email: email,
      },
      include: {
        financialSupport: true,
      },
    });

    if (user && user.financialSupport) {
      // Professional details exist, update them

      console.log("updating..");
      await db.support.deleteMany({
        where: {
          financialSupportId: user.financialSupport.id,
        },
      });

      await db.financialSupport.delete({
        where: {
          email: email,
        },
      });

      const createdfinancialSupport = await db.financialSupport.create({
        data: {
          supports: {
            create: NfinancialSupport,
          },
          user: {
            connect: {
              email: email,
            },
          },
        },
      });
    } else {
      const createdfinancialSupport = await db.financialSupport.create({
        data: {
          supports: {
            create: NfinancialSupport,
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
      { message: "Financial Support Created/Updated." },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating/updating financialSupport:", error);
    return NextResponse.json(
      {
        message: "An error occurred while creating/updating financialSupport.",
      },
      { status: 500 },
    );
  }
}
