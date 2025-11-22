// lib/secureHandler.ts
import { sanitizeString } from "./sanitize";
import { verifyRecaptchaToken } from "./verifyRecaptcha";

export async function secureHandler(
  req: Request,
  options: {
    requireRecaptcha?: boolean; // default true
    recaptchaMinScore?: number; // default 0.5
    handler: (body: any) => Promise<Response>;
  }
) {
  try {
    const requireRecaptcha = options.requireRecaptcha ?? true;
    const recaptchaMinScore = options.recaptchaMinScore ?? 0.5;

    const body = await req.json();
    // inside secureHandler after reading body
    console.log("recaptchaToken:", body.recaptchaToken);

    // honeypot: if filled => bot
    if (body?._hp) {
      return new Response(
        JSON.stringify({ success: false, message: "Bot detected" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // verify recaptcha
    if (requireRecaptcha) {
      // remoteip optional: get from headers (middleware passed via fetch)
      const remoteip = (req.headers.get("x-forwarded-for") ??
        req.headers.get("cf-connecting-ip") ??
        undefined) as string | undefined;
      const recaptchaRes = await verifyRecaptchaToken(
        body?.recaptchaToken,
        remoteip
      );

      if (!recaptchaRes || !recaptchaRes.success) {
        return new Response(
          JSON.stringify({
            success: false,
            message: "Captcha verification failed",
          }),
          { status: 403, headers: { "Content-Type": "application/json" } }
        );
      }

      if ((recaptchaRes.score ?? 0) < recaptchaMinScore) {
        return new Response(
          JSON.stringify({ success: false, message: "Low captcha score" }),
          { status: 403, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    // sanitize all string fields
    for (const k of Object.keys(body || {})) {
      if (typeof body[k] === "string") body[k] = sanitizeString(body[k]);
    }

    // call user handler
    return await options.handler(body);
  } catch (err: any) {
    console.error("secureHandler error:", err);
    return new Response(
      JSON.stringify({ success: false, message: "Internal error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
