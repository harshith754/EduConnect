import { Profile, User } from "@/lib/db"; // Import the Profile and User models

export async function POST(req) {
  try {
    const {
      userId,
      fullName,
      gender,
      dateOfBirth,
      email,
      mobileNumber,
      aadharDetails,
      facultyId,
    } = await req.json();

    // Create a new profile instance
    const profile = await Profile.create({
      data: {
        fullName,
        gender,
        dateOfBirth,
        email,
        mobileNumber,
        aadharDetails,
        facultyId,
        user: { connect: { id: userId } }, // Associate the profile with the user
      },
    });

    console.log("Profile created:", profile);

    return NextResponse.json({ message: "Profile Created." }, { status: 201 });
  } catch (error) {
    console.error("Error creating profile:", error);
    return NextResponse.json(
      { message: "An error occurred while creating profile." },
      { status: 500 },
    );
  }
}
