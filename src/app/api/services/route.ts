// app/api/services/route.ts
import { getAllServices } from "@/lib/strapi/service/service.service";
import { NextResponse } from "next/server";

export async function GET() {
  const services = await getAllServices(); // token aman karena jalan di server
  console.log(services);
  return NextResponse.json(services);
}

export const revalidate = 3600; // cache 1 jam
