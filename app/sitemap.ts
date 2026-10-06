import type { MetadataRoute } from "next";

import { client } from "@/sanity/lib/client";
import { ALL_PROPERTIES_QUERY, BLOG_POST_SLUGS_QUERY } from "@/sanity/lib/queries";

type SitemapProperty = {
  _id: string;
  slug?: { current: string };
};

type SitemapPost = {
  _id: string;
  slug?: { current: string };
};

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [properties, posts] = await Promise.all([
    client.fetch(ALL_PROPERTIES_QUERY),
    client.fetch(BLOG_POST_SLUGS_QUERY),
  ]);
  const baseUrl = "https://www.ukooafricahomes.co.ke";
  const routes = ["", "/projects", "/site-visit", "/about", "/blog", "/faqs"];
  return [
    ...routes.map((route) => ({ url: `${baseUrl}${route}`, lastModified: new Date() })),
    ...(properties as SitemapProperty[]).map((property) => ({
      url: `${baseUrl}/projects/${property.slug?.current ?? property._id}`,
      lastModified: new Date(),
    })),
    ...(posts as SitemapPost[]).map((post) => ({
      url: `${baseUrl}/blog/${post.slug?.current ?? post._id}`,
      lastModified: new Date(),
    })),
  ];
}
