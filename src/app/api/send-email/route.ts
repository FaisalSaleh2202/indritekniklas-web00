import { EmailTemplate } from "@/components/EmailTemplate";
import { render } from "@react-email/render";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const firstName = body?.firstName || "Guest";
    const email = body?.email || "-";
    const message = body?.message || "-";

    const html = await render(EmailTemplate({ firstName, email, message }));

    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["benaffleak000@gmail.com"],
      subject: "Form Submission Notification",
      html,
    });

    if (error) {
      return Response.json({ success: false, error }, { status: 500 });
    }

    return Response.json({ success: true, data });
  } catch (err: any) {
    return Response.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}

export function GET() {
  return Response.json({
    message: "API berjalan. Kirim email menggunakan POST.",
  });
}
