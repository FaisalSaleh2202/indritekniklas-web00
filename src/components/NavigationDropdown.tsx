// components/NavigationDropdownService.tsx
import { getAllServices } from "@/lib/strapi/service/service.service";
import NavigationDropdownClient from "./NavigationDropdownClient";

export default async function NavigationDropdown() {
  const services = await getAllServices();
  return <NavigationDropdownClient services={services} />;
}
