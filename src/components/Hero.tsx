import { Phone } from "lucide-react";

import { Button } from "@/components/ui/button";

interface Hero1Props {
  badge?: string;
  heading: string;
  description: string;
  buttons?: {
    primary?: {
      text: string;
      url: string;
    };
    secondary?: {
      text: string;
      url: string;
    };
  };
  image: {
    src: string;
    alt: string;
  };
}

const Hero1 = ({
  badge = "✨ Your Website Builder",
  heading = "Blocks Built With Shadcn & Tailwind",
  description = "Finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.",
  buttons = {
    primary: {
      text: "Tanyakan Kebutuhan Anda Sekarang",
      url: "https://www.shadcnblocks.com",
    },
    secondary: {
      text: "View on GitHub",
      url: "https://www.shadcnblocks.com",
    },
  },
  image = {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
    alt: "Hero section demo image showing interface components",
  },
}: Hero1Props) => {
  return (
    <section className="px-4 sm:px-6 py-6 ">
      <div className="">
        <div className="grid items-center gap-4 lg:grid-cols-2 ">
          <div className="flex gap-4 flex-col items-center text-center lg:items-start lg:text-left">
            <h1 className="text-[#171717] drop-shadow-sm text-3xl font-semibold lg:text-3xl tracking-tight text-balance">
              Bengkel Las Terdekat & Berpengalaman
            </h1>
            <p className="text-gray-900/80 text-xl max-w-xl">
              Hadir sebagai solusi bengkel las terdekat dan terpercaya di
              wilayah Anda. Kami melayani segala kebutuhan konstruksi dan
              renovasi — mulai dari rumah tinggal, gedung perkantoran,
              apartemen, hingga fasilitas umum
            </p>
            <div className="flex w-full bg-red flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              {buttons.primary && (
                <Button
                  asChild
                  className="w-auto p-6"
                  style={{ backgroundColor: "#075E54", fontSize: "16px" }}
                >
                  <a href={buttons.primary.url}>
                    {buttons.primary.text}
                    <Phone className="size-5" />
                  </a>
                </Button>
              )}
            </div>
          </div>
          {/* <img
            src={image.src}
            alt={image.alt}
            className="h-full w-full rounded-md object-cover"
          /> */}
        </div>
      </div>
    </section>
  );
};

export { Hero1 };
