// app/api/send-email/route.ts
import { EmailTemplate } from "@/components/EmailTemplate";
import { render } from "@react-email/render";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  firstName: z.string().min(2).max(50),
  email: z.string().email(),
  message: z.string().min(10).max(1000),
  recaptchaToken: z.string(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. Validasi struktur data
    const parseResult = contactSchema.safeParse(body);
    if (!parseResult.success) {
      return Response.json(
        { success: false, error: "Data tidak valid" },
        { status: 400 }
      );
    }
    const { firstName, email, message, recaptchaToken } = parseResult.data;

    // 2. Wajib ada token
    if (!recaptchaToken) {
      return Response.json(
        { success: false, error: "Token hilang" },
        { status: 400 }
      );
    }

    // 3. Verifikasi reCAPTCHA
    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`;
    const recaptchaRes = await fetch(verificationUrl, { method: "POST" });
    const recaptchaData = await recaptchaRes.json();

    if (!recaptchaData.success || (recaptchaData.score ?? 0) < 0.5) {
      return Response.json(
        { success: false, error: "Verifikasi gagal" },
        { status: 400 }
      );
    }

    // 4. Sanitasi pesan (anti-XSS)
    const cleanMessage = message
      .replace(/<script/gi, "&lt;script")
      .replace(/on\w+\s*=/gi, "disabled=");

    // 5. Kirim email
    const html = await render(
      EmailTemplate({ firstName, email, message: cleanMessage })
    );

    const { data, error } = await resend.emails.send({
      from: "Indri Teknik Las <onboarding@resend.dev>",
      to: ["benaffleak000@gmail.com"],
      subject: `Pesan dari ${firstName}`,
      html,
    });

    if (error) {
      return Response.json({ success: false, error }, { status: 500 });
    }

    return Response.json({ success: true, message: "Pesan terkirim!" });
  } catch (err) {
    return Response.json(
      { success: false, error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
