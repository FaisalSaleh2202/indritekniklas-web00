import { Button } from "@/components/ui/button";
import { MessageCircle, Phone } from "lucide-react";
import Image from "next/image";

interface Hero1Props {
  badge?: string;
  heading: string;
  description: string;
  buttons?: {
    primary?: {
      text: string;
      url: string;
    };
  };
}

const Hero1 = ({
  badge = "✨ Solusi Bengkel Las Profesional",
  heading = "Bengkel Las Terdekat & Berpengalaman",
  description = "Kami menyediakan layanan las profesional untuk kebutuhan rumah, kantor, bangunan komersial, hingga proyek konstruksi skala besar. Dikerjakan oleh tenaga berpengalaman dengan hasil rapi, kuat, dan bergaransi.",
  buttons = {
    primary: {
      text: "Tanyakan Kebutuhan Anda Sekarang",
      url: "#kontak",
    },
  },
}: Hero1Props) => {
  return (
    <section className="relative" aria-labelledby="hero-heading" role="banner">
      {/* Background Image */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/hero/hero5.png"
          alt="Latar belakang bengkel las"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Overlay Gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/40"
        aria-hidden="true"
      ></div>

      {/* CONTENT */}
      <div className="relative z-20 px-4 sm:px-6 py-8 pb-0 max-w-5xl mx-auto text-center">
        {/* BADGE */}

        {/* MAIN HEADING */}
        <h1
          id="hero-heading"
          className="text-4xl lg:text-4xl font-bold text-white leading-tight mt-2"
        >
          Bengkel Las <span className="text-[#E99C3D]">Terdekat</span> &
          Berpengalaman
        </h1>

        {/* DESCRIPTION */}
        <p className="text-gray-200 text-lg mt-4 max-w-2xl mx-auto">
          Hadir sebagai solusi bengkel las terdekat dan terpercaya di wilayah
          Anda. Kami melayani segala kebutuhan konstruksi dan renovasi — mulai
          dari rumah tinggal, gedung perkantoran, apartemen, hingga fasilitas
          umum
        </p>

        {/* BUTTON */}
        <div className="mt-6">
          <Button
            asChild
            className="w-auto py-5 px-6 rounded-full font-light shadow-xl inline-flex items-center gap-2"
            style={{
              backgroundColor: "#25D366",
              color: "black",
            }}
          >
            <a href={buttons.primary?.url} aria-label="Hubungi via WhatsApp">
              {buttons.primary?.text} <Phone aria-hidden="true" />{" "}
              <MessageCircle aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>

      {/* IMAGES BELOW */}
      <div
        className="relative z-20 mt-6 pb-12 max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-6"
        aria-label="Contoh hasil pekerjaan"
      >
        {/* Left Image */}
        <figure className="flex justify-center">
          <div className="w-64 h-48 rounded-[2rem] overflow-hidden rotate-[-5deg] shadow-lg border-4 border-white">
            <Image
              src="/hero/hero2.jpg"
              alt="Hasil pemasangan Railing Tangga"
              width={500}
              height={400}
              className="object-cover w-full h-full"
            />
          </div>
        </figure>

        {/* Middle Image */}
        <figure className="flex justify-center">
          <div className="w-72 h-56 rounded-[2rem] overflow-hidden shadow-xl border-4 border-white">
            <Image
              src="/hero/hero6.jpg"
              alt="Hasil pemasangan kanopi"
              width={600}
              height={450}
              className="object-cover w-full h-full"
            />
          </div>
        </figure>

        {/* Right Image */}
        <figure className="flex justify-center">
          <div className="w-64 h-48 rounded-[2rem] overflow-hidden rotate-[5deg] shadow-lg border-4 border-white">
            <Image
              src="/hero/hero4.jpg"
              alt="Proses pembuatan rangka besi oleh teknisi"
              width={500}
              height={400}
              className="object-cover w-full h-full"
            />
          </div>
        </figure>
      </div>
    </section>
  );
};

export { Hero1 };
