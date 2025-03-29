import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server"; // ✅ Correct import
import { connectDB } from "../../../backend/lib/database";
import User from "../../../backend/models/User";

export async function POST(req: Request) {
  try {
    await connectDB(); // Ensure DB connection

    const { userId, sessionClaims } = await auth(); // ✅ Await auth() to resolve Promise

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // ✅ Explicitly define `sessionClaims` type
    const email = (sessionClaims as { email_addresses?: string[] })?.email_addresses?.[0] || "";

    // Check if user exists, otherwise create new user
    const existingUser = await User.findOne({ clerkId: userId });

    if (!existingUser) {
      const newUser = new User({ clerkId: userId, email });
      await newUser.save();
    }

    return NextResponse.json({ message: "User authenticated" }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
