"use client";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

declare global {
  interface Window {
    grecaptcha: any;
  }
}

export default function Page() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
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
      // Jalankan reCAPTCHA
      const gRecaptchaToken = await executeRecaptcha("inquirySubmit");

      // Kirim token ke backend untuk verifikasi
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

      // Kirim email
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, email, message }),
      });

      const data = await res.json();
      setResult(data);

      // Reset form
      setFirstName("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      setResult({
        success: false,
        error: err?.response?.data?.error || "Gagal mengirim pesan",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="px-4 sm:px-6 py-6 bg-gray-50">
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="text-center text-2xl md:text-2xl font-light text-[#171717]"
        >
          Kontak Kami
        </motion.h2>

        {/* Grid 2 Kolom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-6">
          {/* FORM */}
          <div className="bg-white p-8  shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">kirim pesan</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <label className="font-medium">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium">Pesan</label>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg text-white font-semibold transition ${
                  loading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? "Mengirim..." : "Kirim Email"}
              </button>
            </form>

            {/* {result && (
              <div
                className={`mt-6 p-4 rounded-lg text-sm border ${
                  result?.success
                    ? "bg-green-50 border-green-300"
                    : "bg-red-50 border-red-300"
                }`}
              >
                <strong>Response:</strong>
                <pre className="mt-2 whitespace-pre-wrap text-xs">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )} */}
          </div>

          {/* KONTAK & MAP */}
          <div className="space-y-6">
            {/* Informasi Kontak */}
            <div className="bg-white p-8  shadow-lg">
              <h2 className="text-2xl font-semibold mb-6">Informasi Kontak</h2>

              <ul className="space-y-4 text-gray-700 text-base">
                <li>
                  <strong>📍 Alamat:</strong>
                  <br />
                  Pekayon Jaya, Kec. Bekasi Sel., jl.masjid jami nurul mutaqin,
                  RT.03/RW.04, Kota Bks, Jawa Barat 17148
                </li>
                <li>
                  <strong>📞 Telepon:</strong>
                  <br />
                  <a
                    href="tel:+6281283993386"
                    className="text-blue-600 hover:underline"
                  >
                    +62 812-8399-3396
                  </a>
                </li>
                <li>
                  <strong>🕒 Jam Operasional:</strong>
                  <br />
                  Senin – Sabtu: 08.00 – 17.00
                </li>
              </ul>
            </div>

            {/* Google Maps */}
            <div className="bg-white  shadow-lg overflow-hidden">
              <iframe
                width="100%"
                height="300"
                className="rounded-lg"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                sandbox="allow-scripts allow-same-origin"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31728.01505782536!2d106.95669327384631!3d-6.2634807737853535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698de549e7328d%3A0x967837da2387e2d!2sIndri%20teknik%20las!5e0!3m2!1sen!2sid!4v1764565697074!5m2!1sen!2sid"
                title="Lokasi Indri Teknik Las"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}
