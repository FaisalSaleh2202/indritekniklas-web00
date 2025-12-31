import NavigationDropdown from "./NavigationDropdown";

import { BUSINESS, FAQ_ITEMS } from "@/lib/site-content";

export default function Footer() {
  return (
    <footer className="px-4 sm:px-6 py-10 mt-10 bg-[#212121] text-white">
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-8">
        <div className="lg:col-span-4">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <span className="text-xl font-light block">{BUSINESS.name}</span>
              <ul className="space-y-4 text-base">
                <li>
                  <strong>Alamat:</strong>
                  <br />
                  <address className="not-italic">{BUSINESS.addressFull}</address>
                </li>
                <li>
                  <strong>Telepon:</strong>
                  <br />
                  <a
                    href={`tel:${BUSINESS.phoneE164}`}
                    className="text-blue-300 hover:underline"
                  >
                    {BUSINESS.phoneDisplay}
                  </a>
                </li>
                <li>
                  <strong>Jam Operasional:</strong>
                  <br />
                  {BUSINESS.openingHoursDisplay}
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <NavigationDropdown variant="list" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-4">
          <h3 className="text-lg font-semibold">
            Pertanyaan yang Sering Diajukan (F.A.Q)
          </h3>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item) => (
              <details
                key={item.question}
                className="rounded-md border border-white/10 p-3"
              >
                <summary className="cursor-pointer bg-gradient-to-r from-[#E99C3D] to-white bg-clip-text text-transparent font-medium">
                  {item.question}
                </summary>
                <p className="mt-2 text-sm text-gray-200">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
