import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { firstName, email, message } = await req.json();

    const data = await resend.emails.send({
      from: "Indri Teknik Las <onboarding@resend.dev>",
      to: ["benaffleak000@gmail.com"],
      subject: "Pesan Baru Dari Form Kontak",
      html: `
        <h2>Pesan Baru Dari Website</h2>
        <p><strong>Nama:</strong> ${firstName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Pesan:</strong><br/>${message}</p>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Gagal mengirim email" },
      { status: 500 }
    );
  }
}
