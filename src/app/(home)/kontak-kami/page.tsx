"use client";

import axios from "axios";
import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

declare global {
  interface Window {
    grecaptcha?: unknown;
  }
}

type SubmitResult =
  | { success: true; message?: string }
  | { success: false; error: string };

export default function Page() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    if (!executeRecaptcha) {
      setLoading(false);
      return;
    }

    try {
      const gRecaptchaToken = await executeRecaptcha("inquirySubmit");

      await axios.post(
        "/api/recaptchaSubmit",
        { gRecaptchaToken },
        {
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        }
      );

      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, email, message }),
      });

      const data = (await res.json()) as SubmitResult;
      setResult(data);

      if (data?.success) {
        setFirstName("");
        setEmail("");
        setMessage("");
      }
    } catch (error: unknown) {
      let errorMessage = "Gagal mengirim pesan";
      if (axios.isAxiosError<{ error?: string }>(error)) {
        errorMessage = error.response?.data?.error || errorMessage;
      }
      setResult({ success: false, error: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="page-container page-section">
        <header className="page-header text-center">
          <h1 className="text-3xl font-semibold text-slate-900">Kontak Kami</h1>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            Kirim pesan untuk konsultasi kebutuhan las dan konstruksi besi. Tim
            kami akan membantu memberikan arahan dan estimasi sesuai kebutuhan.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <section aria-labelledby="form-kontak" className="bg-white p-8 shadow-sm">
            <h2 id="form-kontak" className="text-2xl font-semibold text-slate-900">
              Kirim Pesan
            </h2>

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="nama-lengkap">
                  Nama Lengkap
                </label>
                <input
                  id="nama-lengkap"
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="border border-slate-200 px-4 py-2 focus:ring-2 focus:ring-slate-400"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-slate-200 px-4 py-2 focus:ring-2 focus:ring-slate-400"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="pesan">
                  Pesan
                </label>
                <textarea
                  id="pesan"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="border border-slate-200 px-4 py-2 focus:ring-2 focus:ring-slate-400"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 text-white font-semibold transition ${
                  loading
                    ? "bg-slate-400 cursor-not-allowed"
                    : "bg-slate-900 hover:bg-slate-800"
                }`}
              >
                {loading ? "Mengirim..." : "Kirim Email"}
              </button>
            </form>

            {result ? (
              <div
                className={`mt-6 p-4 text-sm ${
                  result.success ? "bg-emerald-50" : "bg-rose-50"
                }`}
              >
                {result.success ? (
                  <p className="text-emerald-800">
                    Pesan berhasil terkirim. Kami akan segera menghubungi Anda.
                  </p>
                ) : (
                  <p className="text-rose-800">{result.error}</p>
                )}
              </div>
            ) : null}
          </section>

          <div className="space-y-6">
            <section aria-labelledby="info-kontak" className="bg-white p-8 shadow-sm">
              <h2 id="info-kontak" className="text-2xl font-semibold text-slate-900">
                Informasi Kontak
              </h2>

              <ul className="mt-6 space-y-4 text-slate-700">
                <li>
                  <strong>Alamat:</strong>
                  <br />
                  Pekayon Jaya, Kec. Bekasi Sel., jl.masjid jami nurul mutaqin,
                  RT.03/RW.04, Kota Bks, Jawa Barat 17148
                </li>
                <li>
                  <strong>Telepon:</strong>
                  <br />
                  <a
                    href="tel:+6281283993386"
                    className="text-slate-900 underline underline-offset-4"
                  >
                    +62 812-8399-3396
                  </a>
                </li>
                <li>
                  <strong>Jam Operasional:</strong>
                  <br />
                  Senin - Sabtu: 08.00 - 17.00
                </li>
              </ul>
            </section>

            <section aria-label="Peta lokasi" className="bg-white shadow-sm overflow-hidden">
              <iframe
                width="100%"
                height="300"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                sandbox="allow-scripts allow-same-origin"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31728.01505782536!2d106.95669327384631!3d-6.2634807737853535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698de549e7328d%3A0x967837da2387e2d!2sIndri%20teknik%20las!5e0!3m2!1sen!2sid!4v1764565697074!5m2!1sen!2sid"
                title="Lokasi Indri Teknik Las"
              />
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

