import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  try {
    const { gRecaptchaToken } = await request.json();

    const formData = `secret=${secretKey}&response=${gRecaptchaToken}`;

    const res = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      formData,
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    if (res.data?.success && res.data?.score > 0.5) {
      return NextResponse.json({ success: true, score: res.data.score });
    } else {
      return NextResponse.json({ success: false });
    }
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}
