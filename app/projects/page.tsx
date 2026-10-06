/* eslint-disable @next/next/no-html-link-for-pages */
import { ArrowRight, MapPin } from "lucide-react";
import type { Metadata } from "next";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { ALL_PROPERTIES_QUERY } from "@/sanity/lib/queries";
import { SiteHeader } from "@/components/site-header";
import { defaultDescription } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Land and Homes for Sale in Kenya | Ukoo Africa Homes",
  description: defaultDescription,
  alternates: { canonical: "/projects" },
};

type PropertySummary = {
  _id: string;
  title: string;
  slug?: { current: string };
  type?: string;
  location?: string;
  priceLabel?: string;
  mainImage?: Parameters<typeof urlFor>[0];
};

export default async function ProjectsPage() {
  const properties = await client.fetch(ALL_PROPERTIES_QUERY);

  return (
    <main className="min-h-screen bg-stone">
      <SiteHeader />
      <div className="bg-forest px-5 pb-16 pt-28 text-white md:px-10 md:pb-20 md:pt-32">
        <div className="mx-auto max-w-[1200px]">
          <a href="/" className="text-sm text-white/70 hover:text-earth">Ukoo Africa Homes</a>
          <p className="mt-16 text-xs font-semibold uppercase tracking-[0.18em] text-earth">Available properties</p>
          <h1 className="mt-4 max-w-[650px] font-display text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.92]">Find your<br /><em className="text-earth">foundation.</em></h1>
        </div>
      </div>
      <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-10 md:py-24">
        <div className="mb-10 flex flex-wrap gap-3">
          <button className="min-h-11 rounded-lg bg-forest px-4 py-3 text-sm font-semibold text-white transition hover:bg-canopy">All properties</button>
          {Array.from(new Set((properties as PropertySummary[]).map((property) => property.type).filter(Boolean))).slice(0, 4).map((type) => (
            <button key={type} className="rounded-lg border border-mist bg-chalk px-4 py-3 text-sm text-slate">{type}</button>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {(properties as PropertySummary[]).map((property) => {
            const imageUrl = property.mainImage ? urlFor(property.mainImage).width(900).url() : "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80";

            return (
              <article key={property._id} className="grid overflow-hidden rounded-lg bg-chalk shadow-sm transition hover:-translate-y-1 hover:shadow-lg md:grid-cols-[0.8fr_1fr]">
                <div className="min-h-56 bg-cover bg-center md:min-h-64" style={{ backgroundImage: `url(${imageUrl})` }} />
                <div className="p-6 md:p-7">
                  <p className="text-xs font-semibold uppercase tracking-wider text-canopy">{property.type || "Property"}</p>
                  <h2 className="mt-3 font-display text-3xl text-forest">{property.title}</h2>
                  <p className="mt-3 flex items-center gap-1 text-sm text-slate"><MapPin size={14} className="text-earth" />{property.location}</p>
                  <p className="mt-8 border-t border-mist pt-4 font-semibold text-ink">{property.priceLabel || "Contact us"}</p>
                  <a href={`/projects/${property.slug?.current ?? property._id}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-forest">View details <ArrowRight size={15} /></a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
