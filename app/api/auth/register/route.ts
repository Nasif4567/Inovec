import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
// Import the shared map from your send-code route
import { verificationCodes } from "../../sendcode/route"; 

export async function POST(req: Request) {
  try {
    // 1. Destructure all fields including the verification 'code'
    const { 
      zohoCusID,
      name, 
      email, 
      password, 
      phone, 
      address, 
      city, 
      postalCode,
      code // Received from the frontend input
    } = await req.json();

    // --- START VERIFICATION CHECK ---
    const storedData = verificationCodes.get(email);

    if (!storedData) {
      return NextResponse.json({ error: "No verification code found for this email" }, { status: 400 });
    }

    if (storedData.code !== code) {
      return NextResponse.json({ error: "Invalid verification code" }, { status: 400 });
    }

    if (Date.now() > storedData.expires) {
      verificationCodes.delete(email); // Clean up expired code
      return NextResponse.json({ error: "Verification code has expired" }, { status: 400 });
    }
    // --- END VERIFICATION CHECK ---

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "Email already in use" }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 2. Create the user
    const newUser = await prisma.user.create({
      data: {
        zohoCusID,
        name,
        email,
        password: hashedPassword,
        phone,
        address,
        city,
        zip: postalCode || "00000",
        country: "Qatar",
      },
    });

    // 3. SUCCESS - Remove code from memory so it can't be used again
    verificationCodes.delete(email);

    return NextResponse.json({
      message: "Registration successful",
      userId: newUser.id,
    });
  } catch (err) {
    console.error("Registration error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}