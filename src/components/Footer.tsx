import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import NavigationDropdown from "./NavigationDropdown";

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
                <div className="">
                  <ul className="space-y-4 text-base">
                    <li>
                      <strong>📍 Alamat:</strong>
                      <br />
                      Pekayon Jaya, Kec. Bekasi Sel., jl.masjid jami nurul
                      mutaqin, RT.03/RW.04, Kota Bks, Jawa Barat 17148
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
                    {/* <li>
                      <strong>✉ Email:</strong>
                      <br />
                      <a
                        href="mailto:info@indritekniklas.com"
                        className="text-blue-600 hover:underline"
                      >
                        info@indritekniklas.com
                      </a>
                    </li> */}
                    <li>
                      <strong>🕒 Jam Operasional:</strong>
                      <br />
                      Senin – Sabtu: 08.00 – 17.00
                    </li>
                  </ul>
                </div>
              </div>

              {/* Layanan */}
              <div className="space-y-3 text-red">
                <NavigationDropdown />
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
