import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function Testimonial() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="w-full max-w-6xl mx-auto">
        <h2 className="text-center text-3xl font-bold text-[#171717] mb-8">
          Apa Kata Pelanggan Kami
        </h2>

        <div className="relative">
          {/* Carousel utama */}
          <Carousel className="w-full">
            <CarouselContent className="mb-4 ml-0 px-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className="basis-full sm:basis-1/2 p-2"
                >
                  <Card className="h-full shadow-md border border-gray-200">
                    <CardContent className="flex flex-col items-center justify-center p-6 h-full text-center">
                      <p className="text-lg italic text-gray-700 mb-4">
                        “Pelayanan cepat dan hasil las sangat rapi! Sangat
                        direkomendasikan.”
                      </p>
                      <span className="font-semibold text-[#075E54]">
                        Pelanggan {index + 1}
                      </span>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Tombol panah di bawah carousel */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-4 mt-3">
              <CarouselPrevious className="relative static bg-[#075E54] text-white hover:bg-[#064d44] rounded-full p-3 shadow-md" />
              <CarouselNext className="relative static bg-[#075E54] text-white hover:bg-[#064d44] rounded-full p-3 shadow-md" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
