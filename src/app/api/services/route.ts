// app/api/services/route.ts
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
import { getAllServices } from "@/lib/strapi/service/service.service";
import { NextResponse } from "next/server";

export async function GET() {
  const services = await getAllServices();
  return NextResponse.json(services);
}

// export const revalidate = 3600; // cache 1 jam
