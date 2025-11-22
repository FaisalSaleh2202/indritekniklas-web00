import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Mail, MessageCircle, Phone } from "lucide-react";

export default function Footer() {
  return (
    <>
      <footer className="px-4 sm:px-6 py-10 mt-10 bg-[#212121] text-white">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-8">
          {/* Kolom kiri */}
          <div className="lg:col-span-4">
            <div className="grid gap-8 md:grid-cols-2">
              {/* Info Brand */}
              <div className="space-y-4">
                <span className="text-xl font-light block">
                  Indri Teknik Las
                </span>

                <div className="flex items-center gap-3">
                  <p className="leading-relaxed">
                    Kota Bekasi, Jawa Barat 17148 <br />
                    jl.masjid jami nurul mutaqin, RT.03/RW.04, Pekayon Jaya,
                    Kec. Bekasi Sel.,
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="">
                    <Phone size={20} className="text-white" />
                  </div>
                  <a href="#" className="hover:underline">
                    081283993386
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <div className="">
                    <MessageCircle size={20} className="" />
                  </div>
                  <a href="#" className="hover:underline">
                    081283993386
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <div className="">
                    <Mail size={20} className="" />
                  </div>
                  <a href="#" className="hover:underline">
                    indritekniklas@gmail.com
                  </a>
                </div>
              </div>

              {/* Layanan */}
              <div className="space-y-3">
                <h2 className="font-semibold text-lg">Layanan</h2>
                <ul className="space-y-2 text-base">
                  <li>
                    <a href="#" className="hover:underline">
                      Pagar
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Kanopi
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Tangga
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Kolom Kanan - FAQ */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-lg font-semibold">
              Pertanyaan yang Sering Diajukan (F.A.Q)
            </h3>

            <Accordion
              className="bg-[#212121] text-2lg"
              type="single"
              collapsible
              defaultValue="item-1"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger className="bg-gradient-to-r from-[#E99C3D] to-white bg-clip-text text-transparent">
                  Apakah gratis ongkos kirim?
                </AccordionTrigger>
                <AccordionContent>
                  Ya, kami menyediakan gratis ongkir .
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="bg-gradient-to-r from-[#E99C3D] to-white bg-clip-text text-transparent">
                  Apakah menerima custom desain?
                </AccordionTrigger>
                <AccordionContent>
                  Ya, kami bisa membuat sesuai desain dari pelanggan atau
                  membantu membuatkan desain baru.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger className="bg-gradient-to-r from-[#E99C3D] to-white bg-clip-text text-transparent">
                  Apakah menerima panggilan ke lokasi?
                </AccordionTrigger>
                <AccordionContent>
                  Ya, kami menyediakan jasa panggilan ke lokasi untuk survei
                  maupun pengerjaan langsung.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger className="bg-gradient-to-r from-[#E99C3D] to-white bg-clip-text text-transparent">
                  Material apa saja yang tersedia?
                </AccordionTrigger>
                <AccordionContent>
                  Kami menyediakan besi hollow, besi siku, plat, stainless,
                  galvanis, dan material lainnya.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8">
                <AccordionTrigger className="bg-gradient-to-r from-[#E99C3D] to-white bg-clip-text text-transparent">
                  Apakah harga bisa dinegosiasi?
                </AccordionTrigger>
                <AccordionContent>
                  Bisa. Harga disesuaikan dengan material, ukuran, tingkat
                  kesulitan, dan anggaran pelanggan.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </footer>
    </>
  );
}
