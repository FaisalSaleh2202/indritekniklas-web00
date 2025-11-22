"use client";
import { useEffect } from "react";

export default function RecaptchaWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_KEY;

    // Jika sudah ada script, jangan tambah lagi
    if (document.getElementById("recaptcha-script")) return;

    const script = document.createElement("script");
    script.id = "recaptcha-script";
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;

    document.body.appendChild(script);
  }, []);

  return <>{children}</>;
}
