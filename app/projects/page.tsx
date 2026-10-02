/* eslint-disable @next/next/no-html-link-for-pages */
import { ArrowRight, MapPin } from "lucide-react";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { ALL_PROPERTIES_QUERY } from "@/sanity/lib/queries";

export default async function ProjectsPage() {
  const properties = await client.fetch(ALL_PROPERTIES_QUERY);

  return (
    <main className="min-h-screen bg-stone">
      <div className="bg-forest px-5 pb-20 pt-32 text-white md:px-10">
        <div className="mx-auto max-w-[1200px]">
          <a href="/" className="text-sm text-white/70 hover:text-earth">Ukoo Africa Homes</a>
          <p className="mt-16 text-xs font-semibold uppercase tracking-[0.18em] text-earth">Available properties</p>
          <h1 className="mt-4 max-w-[650px] font-display text-5xl leading-none md:text-7xl">Find your<br /><em className="text-earth">foundation.</em></h1>
        </div>
      </div>
      <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-10 md:py-24">
        <div className="mb-10 flex flex-wrap gap-3">
          <button className="rounded-lg bg-forest px-4 py-3 text-sm font-semibold text-white">All properties</button>
          {Array.from(new Set((properties as any[]).map((property) => property.type).filter(Boolean))).slice(0, 4).map((type) => (
            <button key={type} className="rounded-lg border border-mist bg-chalk px-4 py-3 text-sm text-slate">{type}</button>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {(properties as any[]).map((property) => {
            const imageUrl = property.mainImage ? urlFor(property.mainImage).width(900).url() : "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80";

            return (
              <article key={property._id} className="grid overflow-hidden rounded-lg bg-chalk md:grid-cols-[0.8fr_1fr]">
                <div className="min-h-64 bg-cover bg-center" style={{ backgroundImage: `url(${imageUrl})` }} />
                <div className="p-6">
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
