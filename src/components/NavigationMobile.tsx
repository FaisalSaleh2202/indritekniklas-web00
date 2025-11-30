// components/NavigationMobile.tsx
import { getAllServices } from "@/lib/strapi/service/service.service";
import NavigationMobileClient from "./NavigationMobileClient";

export const revalidate = 3600;

export default async function NavigationMobile() {
  const [services] = await Promise.all([getAllServices()]);

  return <NavigationMobileClient initialServices={services} />;
}
