// components/KeunggulanSection.tsx
export function KeunggulanSection() {
  return (
    <section className="py-4 bg-gray-50">
      <div className="text-center">
        {/* Judul */}
        <h2 className="py-2">Keunggulan Kami</h2>
        <div className="grid lg:grid-cols-2">
          <div className="grid grid-cols-2">
            <div className="border p-5">1</div>
            <div className="border p-5">2</div>
            <div className="border p-5">3</div>
            <div className="border p-5">4</div>
          </div>
        </div>
      </div>
    </section>
  );
}
