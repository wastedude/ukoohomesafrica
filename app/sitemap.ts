import type { MetadataRoute } from "next";
import { properties } from "@/lib/properties";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.ukooafricahomes.co.ke";
  const routes = ["", "/projects", "/site-visit", "/about", "/blog", "/faqs"];
  return [...routes.map((route) => ({ url: `${baseUrl}${route}`, lastModified: new Date() })), ...properties.map((property) => ({ url: `${baseUrl}/projects/${property.slug}`, lastModified: new Date() }))];
}