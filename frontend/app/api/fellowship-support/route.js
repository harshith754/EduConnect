import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req) {
  try {
    const { email, fellowshipSupport } = await req.json();

    console.log({ email, fellowshipSupport });

    const NfellowshipSupport = fellowshipSupport.map(
      ({ fellowshipSupportId, ...rest }) => rest,
    );

    const user = await db.user.findUnique({
      where: {
        email: email,
      },
      include: {
        fellowshipSupport: true,
      },
    });

    if (user && user.fellowshipSupport) {
      // fellowship exist, update them

      console.log("updating..");
      await db.fellowship.deleteMany({
        where: {
          fellowshipSupportId: user.fellowshipSupport.id,
        },
      });

      await db.fellowshipSupport.delete({
        where: {
          email: email,
        },
      });

      const createdfellowshipSupport = await db.fellowshipSupport.create({
        data: {
          fellowships: {
            create: NfellowshipSupport,
          },
          user: {
            connect: {
              email: email,
            },
          },
        },
      });
    } else {
      const createdfellowshipSupport = await db.fellowshipSupport.create({
        data: {
          fellowships: {
            create: NfellowshipSupport,
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
      { message: "Fellowship Support Created/Updated." },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating/updating FellowshipSupport:", error);
    return NextResponse.json(
      {
        message: "An error occurred while creating/updating FellowshipSupport.",
      },
      { status: 500 },
    );
  }
}
