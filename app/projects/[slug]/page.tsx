/* eslint-disable @next/next/no-html-link-for-pages */
import { ArrowLeft, ArrowUpRight, Check, MapPin } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { properties } from "@/lib/properties";

export function generateStaticParams() {
  return properties.map((property) => ({ slug: property.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const property = properties.find((item) => item.slug === slug);
  return property ? { title: `${property.title} | Ukoo Africa Homes`, description: `${property.price} - ${property.type} in ${property.location}.` } : {};
}

export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = properties.find((item) => item.slug === slug);
  if (!property) notFound();

  return <main className="min-h-screen bg-stone"><div className="bg-forest px-5 pb-16 pt-10 text-white md:px-10 md:pb-24"><div className="mx-auto max-w-[1200px]"><a href="/projects" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-earth"><ArrowLeft size={15} /> All projects</a><div className="mt-16 max-w-[750px]"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-earth">{property.type}</p><h1 className="mt-5 font-display text-5xl leading-none md:text-7xl">{property.title}</h1></div></div></div><div className="mx-auto grid max-w-[1200px] gap-12 px-5 py-16 md:grid-cols-[1.2fr_0.8fr] md:px-10 md:py-24"><div><div className="aspect-[1.35] rounded-lg bg-cover bg-center" style={{ backgroundImage: `url(${property.image})` }} /><div className="mt-10"><p className="flex items-center gap-2 text-sm text-slate"><MapPin size={16} className="text-earth" /> {property.location} <span className="text-mist">|</span> {property.size}</p><h2 className="mt-6 font-display text-4xl text-forest">A place to build from.</h2><p className="mt-5 max-w-[650px] leading-7 text-slate">{property.description}</p><ul className="mt-8 grid gap-4 sm:grid-cols-2">{property.features.map((feature) => <li key={feature} className="flex items-center gap-3 text-sm text-ink"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-earth-light text-canopy"><Check size={14} /></span>{feature}</li>)}</ul></div></div><aside className="h-fit rounded-lg bg-chalk p-6 md:sticky md:top-8 md:p-8"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-canopy">Available now</p><p className="mt-3 font-display text-4xl text-forest">{property.price}</p><div className="mt-7 border-t border-mist pt-6"><h2 className="font-display text-2xl text-forest">Interested in this property?</h2><p className="mt-3 text-sm leading-6 text-slate">Leave your details and our team will get back to you within 24 hours.</p><form className="mt-6 grid gap-4"><input required className="rounded-lg border border-mist bg-stone px-4 py-3 text-sm outline-none focus:border-canopy" placeholder="Full name" /><input required className="rounded-lg border border-mist bg-stone px-4 py-3 text-sm outline-none focus:border-canopy" placeholder="Phone number" /><input type="email" className="rounded-lg border border-mist bg-stone px-4 py-3 text-sm outline-none focus:border-canopy" placeholder="Email address" /><button type="submit" className="flex items-center justify-center gap-2 rounded-lg bg-forest px-5 py-4 text-sm font-semibold text-white hover:bg-canopy">Enquire now <ArrowUpRight size={16} /></button></form><a href="https://wa.me/254700000000" className="mt-4 block text-center text-sm font-semibold text-canopy">Chat on WhatsApp instead</a></div></aside></div></main>;
}