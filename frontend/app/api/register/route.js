import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    //check if email exists
    const existingUser = await db.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      console.log("User with this email already exists");
      return NextResponse.json(
        { user: null, message: "User with this email already exists" },
        { status: 209 },
      );
    }

    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json(
      { user: newUser, message: "User registered." },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 },
    );
  }
}
