import ButtonFooterGroup from "./ButtonFooterGroup";

export default function Footer() {
  return (
    <>
      <footer className="bg-black text-white h-40 p-5">
        <div className="grid lg:grid-cols-6 gap-4">
          <div className="col-span-2">
            <span>Indri Teknik Las</span>
            <div className="my-3">
              <ButtonFooterGroup />
            </div>
          </div>

          <div className="col-span-4"></div>
        </div>
      </footer>
    </>
  );
}
