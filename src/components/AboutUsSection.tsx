import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

export function AboutUsSection() {
  return (
    <>
      <section className="my-12">
        <h2>Tentang Kami</h2>
        <p>
          {/* <strong> Indri Teknik Las </strong> hadir sebagai solusi bengkel las
          terdekat dan terpercaya di wilayah Anda. Kami melayani segala
          kebutuhan konstruksi dan renovasi — mulai dari rumah tinggal, gedung
          perkantoran, apartemen, hingga fasilitas umum */}
        </p>
        <Button className="my-3" variant="outline">
          Selengkapnya <ArrowRight />
        </Button>
        <div className="grid lg:grid-cols-2">
          <div>1</div>
          <div>
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader>Berpengalaman</CardHeader>
                <CardContent>Lebih dari 10 Tahun</CardContent>
              </Card>
              <Card>
                <CardHeader>Berpengalaman</CardHeader>
                <CardContent>Lebih dari 10 Tahun</CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
