/* eslint-disable @next/next/no-html-link-for-pages */
import { ArrowLeft, ArrowUpRight, Check, MapPin } from "lucide-react";
import { PortableText } from "@portabletext/react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { ALL_PROPERTIES_QUERY, PROPERTY_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { SiteHeader } from "@/components/site-header";
import { absoluteUrl } from "@/lib/seo";
import { PropertyGallery } from "./property-gallery";

type PropertySummary = {
  _id: string;
  slug?: { current: string };
};

type GalleryImage = Parameters<typeof urlFor>[0];

export async function generateStaticParams() {
  const properties = await client.fetch(ALL_PROPERTIES_QUERY);
  return (properties as PropertySummary[]).map((property) => ({ slug: property.slug?.current ?? property._id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const property = await client.fetch(PROPERTY_BY_SLUG_QUERY, { slug });

  return property
    ? {
        title: `${property.title} | ${property.type} in ${property.location} | Ukoo Africa Homes`,
        description: `${property.priceLabel || property.price || "Property details"} - ${property.type} in ${property.location}. Explore location, features, pricing and ownership details.`,
        alternates: { canonical: `/projects/${slug}` },
        openGraph: {
          title: `${property.title} | Ukoo Africa Homes`,
          description: `${property.type} in ${property.location}.`,
          url: absoluteUrl(`/projects/${slug}`),
          type: "website",
          images: property.mainImage
            ? [{ url: urlFor(property.mainImage).width(1200).url(), alt: property.title }]
            : [{ url: absoluteUrl("/TAG1.png"), alt: "Ukoo Africa Homes" }],
        },
      }
    : {};
}

export default async function PropertyPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ submitted?: string }> }) {
  const { slug } = await params;
  const { submitted } = await searchParams;
  const property = await client.fetch(PROPERTY_BY_SLUG_QUERY, { slug });
  if (!property) notFound();

  const imageUrl = property.mainImage ? urlFor(property.mainImage).width(1200).url() : "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85";
  const galleryImages = (property.gallery ?? []) as GalleryImage[];
  const propertyImages = [
    ...(property.mainImage ? [imageUrl] : []),
    ...galleryImages.map((image) => urlFor(image).width(1200).url()),
  ];

  return (
    <main className="min-h-screen bg-stone">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        name: property.title,
        description: `${property.type} in ${property.location}.`,
        image: propertyImages.length > 0 ? propertyImages : [imageUrl],
        url: absoluteUrl(`/projects/${slug}`),
        brand: { "@type": "Brand", name: "Ukoo Africa Homes" },
        offers: property.price ? {
          "@type": "Offer",
          price: property.price,
          priceCurrency: "KES",
          availability: property.status === "Sold"
            ? "https://schema.org/SoldOut"
            : "https://schema.org/InStock",
          url: absoluteUrl(`/projects/${slug}`),
        } : undefined,
        address: property.address ? {
          "@type": "PostalAddress",
          streetAddress: property.address,
          addressCountry: "KE",
        } : undefined,
        geo: property.coordinates ? {
          "@type": "GeoCoordinates",
          latitude: property.coordinates.lat,
          longitude: property.coordinates.lng,
        } : undefined,
      }) }} />
      <SiteHeader />
      <div className="bg-forest px-5 pb-16 pt-10 text-white md:px-10 md:pb-24">
        <div className="mx-auto max-w-[1200px]">
          <a href="/projects" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-earth"><ArrowLeft size={15} /> All projects</a>
          <div className="mt-14 max-w-[750px] md:mt-16">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-earth">{property.type}</p>
            <h1 className="mt-5 font-display text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.92]">{property.title}</h1>
          </div>
        </div>
      </div>
      <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-16 md:grid-cols-[1.2fr_0.8fr] md:gap-12 md:px-10 md:py-24">
        <div>
          <PropertyGallery images={propertyImages} title={property.title} />
          {property.coordinates?.lat != null && property.coordinates?.lng != null ? (
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${property.coordinates.lat},${property.coordinates.lng}`}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-forest hover:text-canopy"
            >
              <MapPin size={16} className="text-earth" /> Show on Google Maps
            </a>
          ) : null}
          <div className="mt-10">
            <p className="flex items-center gap-2 text-sm text-slate"><MapPin size={16} className="text-earth" /> {property.location} <span className="text-mist">|</span> {property.size}</p>
            <h2 className="mt-6 font-display text-4xl text-forest">A place to build from.</h2>
            {property.description ? <div className="mt-5 max-w-[650px] leading-7 text-slate"><PortableText value={property.description} /></div> : null}
            {property.features ? (
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">{property.features.map((feature: string) => <li key={feature} className="flex items-center gap-3 text-sm text-ink"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-earth-light text-canopy"><Check size={14} /></span>{feature}</li>)}</ul>
            ) : null}
          </div>
        </div>
        <aside className="h-fit rounded-lg bg-chalk p-6 md:sticky md:top-8 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-canopy">Available now</p>
          <p className="mt-3 font-display text-4xl text-forest">{property.priceLabel || (property.price ? `KSh ${property.price.toLocaleString()}` : "Contact us")}</p>
          <div className="mt-7 border-t border-mist pt-6">
            <h2 className="font-display text-2xl text-forest">Interested in this property?</h2>
            <p className="mt-3 text-sm leading-6 text-slate">Leave your details and our team will get back to you within 24 hours.</p>
            <form action="/api/contact" method="post" className="mt-6 grid gap-4"><input type="hidden" name="formType" value="property-enquiry" /><input type="hidden" name="property" value={property.title} />{submitted === "success" ? <p className="rounded-lg bg-earth-light px-4 py-3 text-sm text-forest">Thank you. We received your enquiry and will contact you soon.</p> : null}{submitted === "error" ? <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">We could not send your enquiry. Please try again or contact us directly.</p> : null}<input name="name" required className="rounded-lg border border-mist bg-white px-4 py-3 text-sm text-ink outline-none focus:border-canopy" placeholder="Full name" /><input name="email" type="email" required className="rounded-lg border border-mist bg-white px-4 py-3 text-sm text-ink outline-none focus:border-canopy" placeholder="Email address" /><input name="phone" required className="rounded-lg border border-mist bg-white px-4 py-3 text-sm text-ink outline-none focus:border-canopy" placeholder="Phone number" /><button type="submit" className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-earth px-5 py-3 text-sm font-semibold text-ink hover:bg-earth-light">Request details <ArrowUpRight size={16} /></button></form>
          </div>
        </aside>
      </div>
    </main>
  );
}
