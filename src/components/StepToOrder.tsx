const steps = [
  {
    title: "Pastikan Kebutuhan Anda",
    description:
      "Tentukan jenis layanan las yang Anda butuhkan seperti kanopi, pagar, atau tralis.",
  },
  {
    title: "Konsultasi Kepada Kami",
    description:
      "Diskusikan spesifikasi, desain, ukuran, serta estimasi biaya secara langsung.",
  },
  {
    title: "Negosiasi Dan Transfer DP",
    description:
      "Setelah kesepakatan, lakukan pembayaran DP untuk memulai pengerjaan.",
  },
  {
    title: "Pengerjaan Dan Pelunasan",
    description: "Proses pengerjaan dimulai hingga selesai sesuai kesepakatan.",
  },
];

type StepToOrderProps = {
  variant?: "default" | "clean";
};

export default function StepToOrder({ variant = "default" }: StepToOrderProps) {
  const isClean = variant === "clean";
  const containerClassName = isClean
    ? "mx-auto max-w-6xl"
    : "mx-auto max-w-6xl rounded-3xl border border-gray-200 bg-gradient-to-br from-white via-white to-amber-50/40 p-6 md:p-10 shadow-sm";
  const itemClassName = isClean
    ? "flex gap-4 bg-slate-100/60 p-5"
    : "flex gap-4 rounded-2xl border border-gray-200 bg-white/80 p-5 shadow-sm";
  const badgeClassName = isClean
    ? "flex h-10 w-10 shrink-0 items-center justify-center bg-amber-100 text-[#D67A00] font-semibold"
    : "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-amber-200 bg-white text-[#D67A00] font-semibold";

  return (
    <section className="px-4 sm:px-6 py-10">
      <div className={containerClassName}>
        <div className="grid gap-8 md:grid-cols-[1.1fr_1.4fr] items-start">
          <header className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#D67A00]">
              Langkah Pemesanan
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold text-[#171717]">
              Proses Pemesanan
            </h2>
            <p className="text-slate-600 max-w-xl">
              Ikuti langkah-langkah berikut untuk memesan layanan kami dengan
              mudah dan cepat.
            </p>
          </header>

          <ol className="grid gap-4">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className={itemClassName}
              >
                <span className={badgeClassName}>
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-[#171717]">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
