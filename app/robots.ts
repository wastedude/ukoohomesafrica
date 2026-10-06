import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/studio/", "/studio-ukoo-africa-homes/"] },
    sitemap: "https://www.ukooafricahomes.co.ke/sitemap.xml",
  };
}