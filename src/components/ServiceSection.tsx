import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function ServiceSection() {
  return (
    <section>
      <h2>Layanan Kami</h2>
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
    </section>
  );
}
