import type { ReactNode } from "react";
import GoogleCaptchaWrapper from "@/components/GoogleCaptchaWrapper";

export default function KontakKamiLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <GoogleCaptchaWrapper>{children}</GoogleCaptchaWrapper>;
}
