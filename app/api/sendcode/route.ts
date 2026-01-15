import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// In-memory store (For production, use Redis or your DB with an expiry)
export const verificationCodes = new Map<string, { code: string; expires: number }>();

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store code for 10 minutes
    verificationCodes.set(email, { 
      code, 
      expires: Date.now() + 10 * 60 * 1000 
    });

    const transporter = nodemailer.createTransport({
      service: "gmail", // or your SMTP provider
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: '"NAK Support" <noreply@nak.com>',
      to: email,
      subject: "Your NAK Verification Code",
      html: `<div style="font-family: sans-serif; padding: 20px;">
              <h2>Welcome to NAK</h2>
              <p>Your verification code is:</p>
              <h1 style="color: #fbbf24; letter-spacing: 5px;">${code}</h1>
              <p>This code expires in 10 minutes.</p>
            </div>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}