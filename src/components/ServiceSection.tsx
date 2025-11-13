import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function ServiceSection() {
  return (
    <section className="bg-gray-50">
      <div className="px-4 sm:px-6 py-6">
        <h2 className="text-3xl font-bold text-[#171717] text-center">
          Layanan Kami
        </h2>
        <div className="grid lg:grid-cols-3 gap-4 py-4">
          <Card>
            <CardHeader>Kanopi</CardHeader>
            <CardContent>Image</CardContent>
          </Card>
          <Card>
            <CardHeader>Kanopi</CardHeader>
            <CardContent>Image</CardContent>
          </Card>
          <Card>
            <CardHeader>Kanopi</CardHeader>
            <CardContent>Image</CardContent>
          </Card>
          <Card>
            <CardHeader>Kanopi</CardHeader>
            <CardContent>Image</CardContent>
          </Card>
          <Card>
            <CardHeader>Kanopi</CardHeader>
            <CardContent>Image</CardContent>
          </Card>
          <Card>
            <CardHeader>Kanopi</CardHeader>
            <CardContent>Image</CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
