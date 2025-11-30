"use client";

import { motion } from "framer-motion";
import { useState } from "react";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      // INI BARIS PENTING: Ambil token reCAPTCHA v3
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
      if (!siteKey) {
        throw new Error("reCAPTCHA Site Key tidak ditemukan");
      }

      const token = await window.grecaptcha.execute(siteKey, {
        action: "submit_contact",
      });

      // Kirim token bersama data form
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          email,
          message,
          recaptchaToken: token, // ← tambah ini
        }),
      });

      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setResult({ success: false, error: "Gagal mengirim pesan" });
    } finally {
      setFirstName("");
      setEmail("");
      setMessage("");
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
            <h2 className="text-2xl font-semibold mb-6">Kirim Pesan</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Name */}
              <div className="flex flex-col gap-1">
                <label className="font-medium">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1">
                <label className="font-medium">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1">
                <label className="font-medium">Pesan</label>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              {/* Submit */}
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

            {/* Response */}
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
                  Jl. Contoh No. 123, Jakarta
                </li>
                <li>
                  <strong>📞 Telepon:</strong>
                  <br />
                  <a
                    href="tel:+628123456789"
                    className="text-blue-600 hover:underline"
                  >
                    +62 812-3456-789
                  </a>
                </li>
                <li>
                  <strong>✉ Email:</strong>
                  <br />
                  <a
                    href="mailto:info@indritekniklas.com"
                    className="text-blue-600 hover:underline"
                  >
                    info@indritekniklas.com
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
                loading="lazy"
                className="rounded-lg"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3335.0052107805877!2d106.97829930899059!3d-6.262158714275422!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698de549e7328d%3A0x967837da2387e2d!2sIndri%20teknik%20las!5e0!3m2!1sen!2sid!4v1763817912270!5m2!1sen!2sid"
                title="Lokasi Indri Teknik Las"
                sandbox="allow-scripts allow-same-origin"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}
