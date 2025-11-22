// lib/verifyRecaptcha.ts
export async function verifyRecaptchaToken(token?: string, remoteip?: string) {
  if (!token) return { success: false, reason: "no-token" };

  const params = new URLSearchParams();
  params.append("secret", process.env.RECAPTCHA_SECRET_KEY!);
  params.append("response", token);
  if (remoteip) params.append("remoteip", remoteip);

  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    body: params,
  });

  const data = await res.json();
  // data has fields: success, score, action, challenge_ts, hostname, ...
  return data;
}
