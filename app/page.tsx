"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  HeartHandshake,
  House,
  MapPin,
  Menu,
  ShieldCheck,
  Sparkles,
  Star,
  X,
} from "lucide-react";

import { urlFor } from "@/sanity/lib/image";

type CmsProperty = {
  _id: string;
  title: string;
  status?: string;
  type?: string;
  location?: string;
  size?: string;
  priceLabel?: string;
  slug?: { current: string };
  mainImage?: { _type: string; asset?: { _ref?: string } };
};

type CmsTestimonial = {
  _id: string;
  name: string;
  role?: string;
  quote: string;
};

type SiteSettings = {
  whatsappNumber?: string;
  phoneNumber?: string;
  email?: string;
  officeAddress?: string;
};

const navItems = [["Projects", "/projects"], ["Site Visit", "/site-visit"], ["About", "/about"], ["Blog", "/blog"], ["FAQs", "/faqs"]];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [location, setLocation] = useState("All locations");
  const [properties, setProperties] = useState<CmsProperty[]>([]);
  const [testimonials, setTestimonials] = useState<CmsTestimonial[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    fetch("/api/content", { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load CMS content");
        return response.json();
      })
      .then(({ properties: propertiesResult, testimonials: testimonialsResult, settings: settingsResult }) => {
        setProperties(Array.isArray(propertiesResult) ? propertiesResult : []);
        setTestimonials(Array.isArray(testimonialsResult) ? testimonialsResult : []);
        setSettings(settingsResult ?? null);
      })
      .catch(() => {
        setProperties([]);
        setTestimonials([]);
        setSettings(null);
      });
  }, []);

  const locationOptions = useMemo(
    () => ["All locations", ...new Set(properties.map((property) => property.location).filter(Boolean) as string[])],
    [properties],
  );

  const currentSettings = settings ?? {};
  const officeLines = (currentSettings.officeAddress || "").split("\n").filter(Boolean);
  const phoneNumber = currentSettings.phoneNumber || "";
  const email = currentSettings.email || "";
  const whatsappNumber = currentSettings.whatsappNumber || "";
  const whatsappHref = whatsappNumber ? `https://wa.me/${whatsappNumber.replace(/\s+/g, "")}?text=${encodeURIComponent("Hi, I'm interested in your properties")}` : undefined;

  return (
    <div className="min-h-screen overflow-hidden bg-stone">
      <header className="absolute inset-x-0 top-0 z-30">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-5 md:px-10 md:py-7">
          <a href="#top" className="flex items-center gap-3 text-chalk" aria-label="Ukoo Africa Homes home">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-earth/70 bg-forest text-earth"><House size={21} strokeWidth={1.8} /></span>
            <span className="font-display text-xl leading-none tracking-tight">ukoo<span className="text-earth">.</span><br /><span className="font-sans text-[9px] font-semibold uppercase tracking-[0.22em] text-white/70">Africa Homes</span></span>
          </a>
          <nav className="hidden items-center gap-7 text-sm text-white/80 lg:flex">
            {navItems.map(([label, href]) => <a key={label} href={href} className="hover:text-earth">{label}</a>)}
          </nav>
          <div className="hidden items-center gap-5 lg:flex">
            {phoneNumber && <a href={`tel:${phoneNumber.replace(/\s+/g, "")}`} className="text-sm text-white/80 hover:text-white">{phoneNumber}</a>}
            <a href="#visit" className="flex items-center gap-2 rounded-lg bg-earth px-4 py-3 text-sm font-semibold text-ink hover:bg-earth-light">Book a visit <ArrowUpRight size={16} /></a>
          </div>
          <button className="rounded-lg border border-white/30 p-2 text-white lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
        </div>
        {menuOpen && <div className="mx-5 rounded-lg border border-white/15 bg-forest p-5 shadow-xl lg:hidden"><nav className="grid gap-5 text-lg text-white">{navItems.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}<a href="#visit" className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-earth px-4 py-3 text-sm font-semibold text-ink">Book a visit <ArrowUpRight size={16} /></a></nav></div>}
      </header>

      <main id="top">
        <section className="hero-grid relative flex min-h-[720px] items-end overflow-hidden bg-forest pb-16 pt-36 md:min-h-[780px] md:pb-24">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,35,21,0.92)_0%,rgba(26,77,46,0.64)_48%,rgba(26,77,46,0.25)_100%),url('https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2200&q=90')] bg-cover bg-center" />
          <div className="relative mx-auto w-full max-w-[1200px] px-5 md:px-10">
            <div className="max-w-[680px]">
              <p className="mb-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-earth"><span className="h-px w-10 bg-earth" /> Built for belonging</p>
              <h1 className="text-balance font-display text-[clamp(3.2rem,7vw,6.5rem)] leading-[0.95] text-white">Affordable land<br /><em className="text-earth">&amp; homes</em><br />across Kenya.</h1>
              <p className="mt-8 max-w-[550px] text-base leading-7 text-white/75 md:text-lg">Secure and affordable real estate investment opportunities in Juja, Thika and along Thika Superhighway, with genuine freehold title deeds and flexible payment plans.</p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row"><a href="#projects" className="flex items-center justify-center gap-3 rounded-lg bg-earth px-6 py-4 text-sm font-semibold text-ink hover:bg-earth-light">Explore properties <ArrowRight size={17} /></a><a href="#visit" className="flex items-center justify-center gap-3 rounded-lg border border-white/50 px-6 py-4 text-sm font-semibold text-white hover:border-earth hover:text-earth">Book a site visit <MapPin size={17} /></a></div>
              <div className="mt-14 flex items-center gap-4 text-sm text-white/70"><span className="flex -space-x-2"><span className="h-8 w-8 rounded-full border-2 border-forest bg-[#b47e62]" /><span className="h-8 w-8 rounded-full border-2 border-forest bg-[#d2a07e]" /><span className="h-8 w-8 rounded-full border-2 border-forest bg-[#694b3a]" /></span><span><strong className="text-white">300+ families</strong> have found their place</span></div>
            </div>
          </div>
          <div className="absolute bottom-8 right-10 hidden max-w-[170px] border-l border-earth pl-4 text-xs leading-5 text-white/70 xl:block">Every plot. Every promise. Grounded in trust.</div>
        </section>

        <section className="bg-forest text-white"><div className="mx-auto grid max-w-[1200px] grid-cols-2 divide-x divide-white/15 md:grid-cols-4 md:px-10"><div className="px-5 py-7 md:px-6"><p className="font-display text-3xl text-earth">300+</p><p className="mt-1 text-xs text-white/65">families housed</p></div><div className="px-5 py-7 md:px-6"><p className="font-display text-3xl text-earth">5</p><p className="mt-1 text-xs text-white/65">active developments</p></div><div className="border-t border-white/15 px-5 py-7 md:border-t-0 md:px-6"><p className="font-display text-3xl text-earth">100%</p><p className="mt-1 text-xs text-white/65">genuine title deeds</p></div><div className="border-t border-white/15 px-5 py-7 md:border-t-0 md:px-6"><p className="font-display text-3xl text-earth">Easy</p><p className="mt-1 text-xs text-white/65">flexible payment plans</p></div></div></section>

        <section id="projects" className="mx-auto max-w-[1200px] px-5 py-20 md:px-10 md:py-28">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-canopy">Find your foundation</p>
              <h2 className="font-display text-4xl leading-tight text-forest md:text-5xl">A place to call<br /><em className="text-earth">your own.</em></h2>
            </div>
            <div className="flex items-center gap-3">
              <label htmlFor="location" className="sr-only">Filter by location</label>
              <select id="location" value={location} onChange={(e) => setLocation(e.target.value)} className="rounded-lg border border-mist bg-chalk px-4 py-3 text-sm text-slate outline-none focus:border-canopy">
                {locationOptions.map((option) => <option key={option}>{option}</option>)}
              </select>
              <a href="#all-projects" className="hidden items-center gap-2 text-sm font-semibold text-forest hover:text-canopy sm:flex">View all <ArrowRight size={16} /></a>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {properties.filter((property) => location === "All locations" || property.location === location).map((property) => {
              const imageUrl = property.mainImage ? urlFor(property.mainImage).width(900).url() : "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85";

              return (
                <article key={property._id} className="group overflow-hidden rounded-lg bg-chalk">
                  <div className="relative aspect-[1.08] overflow-hidden bg-earth-light">
                    <div className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105" style={{ backgroundImage: `url(${imageUrl})` }} />
                    <span className="absolute left-4 top-4 rounded bg-forest px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white">{property.status || "For Sale"}</span>
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-canopy">{property.type || "Property"}</p>
                    <h3 className="mt-2 font-display text-2xl text-forest">{property.title}</h3>
                    <p className="mt-2 flex items-center gap-1 text-sm text-slate"><MapPin size={14} className="text-earth" /> {property.location}</p>
                    <p className="mt-5 border-t border-mist pt-4 text-xl font-semibold text-forest">{property.priceLabel || "Contact us"}</p>
                    <div className="mt-6 flex items-center justify-between gap-3">
                      <span className="text-xs uppercase tracking-[0.16em] text-slate">{property.size || "Flexible package"}</span>
                      <a href={`/projects/${property.slug?.current ?? property._id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-forest hover:text-canopy">View details <ArrowRight size={14} /></a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="bg-earth-light"><div className="mx-auto grid max-w-[1200px] gap-12 px-5 py-20 md:grid-cols-[0.9fr_1.1fr] md:items-center md:px-10 md:py-28"><div><p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-canopy">More than a transaction</p><h2 className="font-display text-4xl leading-tight text-forest md:text-5xl">A clearer path to<br /><em className="text-earth">home.</em></h2><p className="mt-6 max-w-[470px] leading-7 text-slate">Whether you are buying your first plot, planning a family home, or investing from abroad, our team makes the next step feel simple.</p><a href="#about" className="mt-8 inline-flex items-center gap-2 font-semibold text-forest hover:text-canopy">Why Ukoo <ArrowRight size={17} /></a></div><div className="grid gap-0 sm:grid-cols-2"><div className="border-b border-earth/40 py-7 sm:border-r sm:pr-7"><ShieldCheck className="text-canopy" size={28} strokeWidth={1.5} /><h3 className="mt-5 font-display text-2xl text-forest">Genuine title deeds</h3><p className="mt-2 text-sm leading-6 text-slate">Clear documentation and guidance at every stage of your purchase.</p></div><div className="border-b border-earth/40 py-7 sm:pl-7"><HeartHandshake className="text-canopy" size={28} strokeWidth={1.5} /><h3 className="mt-5 font-display text-2xl text-forest">Plans that work</h3><p className="mt-2 text-sm leading-6 text-slate">Flexible payment options built around real life and real goals.</p></div><div className="py-7 sm:border-r sm:pr-7"><MapPin className="text-canopy" size={28} strokeWidth={1.5} /><h3 className="mt-5 font-display text-2xl text-forest">Prime locations</h3><p className="mt-2 text-sm leading-6 text-slate">Well-connected developments within reach of Nairobi and opportunity.</p></div><div className="py-7 sm:pl-7"><Sparkles className="text-canopy" size={28} strokeWidth={1.5} /><h3 className="mt-5 font-display text-2xl text-forest">People first</h3><p className="mt-2 text-sm leading-6 text-slate">A trusted team that listens, plans and stands beside you.</p></div></div></div></section>

        <section id="about" className="mx-auto max-w-[1200px] px-5 py-20 md:px-10 md:py-28"><div className="grid gap-12 md:grid-cols-[1fr_1.15fr] md:items-center"><div className="relative aspect-[0.9] overflow-hidden rounded-lg bg-forest"><div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=85)" }} /><div className="absolute bottom-5 left-5 max-w-[200px] rounded-lg bg-forest p-5 text-white"><p className="font-display text-3xl text-earth">14 yrs</p><p className="mt-1 text-xs leading-5 text-white/70">of helping Kenyans put down roots</p></div></div><div><p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-canopy">The Ukoo difference</p><h2 className="font-display text-4xl leading-tight text-forest md:text-5xl">Home is more than<br /><em className="text-earth">four walls.</em></h2><p className="mt-6 max-w-[520px] leading-7 text-slate">It is the morning light, the neighbour who becomes family, the confidence that what you are building will last. Ukoo Africa Homes brings that feeling within reach through carefully selected land and homes across Kenya.</p><ul className="mt-8 grid gap-4 text-sm text-ink sm:grid-cols-2"><li className="flex items-center gap-3"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-earth-light text-canopy"><Check size={14} /></span> Honest advice, always</li><li className="flex items-center gap-3"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-earth-light text-canopy"><Check size={14} /></span> Sites you can visit</li><li className="flex items-center gap-3"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-earth-light text-canopy"><Check size={14} /></span> Verified documentation</li><li className="flex items-center gap-3"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-earth-light text-canopy"><Check size={14} /></span> Clear next steps</li></ul></div></div></section>

        <section className="border-y border-mist bg-chalk"><div className="mx-auto max-w-[1200px] px-5 py-20 md:px-10 md:py-24"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-canopy">Stories from home</p><h2 className="font-display text-4xl text-forest md:text-5xl">Good decisions feel<br /><em className="text-earth">even better.</em></h2></div><div className="flex gap-1 text-earth"><Star size={17} fill="currentColor" /><Star size={17} fill="currentColor" /><Star size={17} fill="currentColor" /><Star size={17} fill="currentColor" /><Star size={17} fill="currentColor" /></div></div><div className="mt-12 grid gap-6 md:grid-cols-3">{testimonials.map((testimonial) => <figure key={testimonial._id} className="border-t-2 border-earth pt-6"><blockquote className="font-display text-2xl leading-snug text-forest">&ldquo;{testimonial.quote}&rdquo;</blockquote><figcaption className="mt-6 text-sm text-slate"><strong className="text-ink">{testimonial.name}</strong><br />{testimonial.role || "Home Owner"}</figcaption></figure>)}</div></div></section>

        <section id="visit" className="relative overflow-hidden bg-canopy"><div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/10" /><div className="absolute -right-5 -top-5 h-44 w-44 rounded-full border border-white/10" /><div className="relative mx-auto flex max-w-[1200px] flex-col justify-between gap-10 px-5 py-20 md:flex-row md:items-center md:px-10 md:py-24"><div><p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-earth-light">Your next chapter starts here</p><h2 className="max-w-[600px] font-display text-4xl leading-tight text-white md:text-6xl">Ready to stop<br /><em className="text-earth-light">renting?</em></h2><p className="mt-5 max-w-[470px] leading-7 text-white/75">Come see the possibilities for yourself. No pressure, just honest answers and a team that listens.</p></div>{whatsappHref && <a href={whatsappHref} className="flex w-fit items-center gap-3 rounded-lg bg-earth px-6 py-4 text-sm font-semibold text-ink hover:bg-earth-light">Chat on WhatsApp <ArrowUpRight size={17} /></a>}</div></section>
      </main>

      <footer className="bg-forest text-white"><div className="mx-auto grid max-w-[1200px] gap-12 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:px-10"><div><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-lg border border-earth/70 text-earth"><House size={21} strokeWidth={1.8} /></span><span className="font-display text-xl">ukoo<span className="text-earth">.</span></span></div><p className="mt-5 max-w-[280px] text-sm leading-6 text-white/60">Building more than homes. Creating places to belong, grow and live free.</p></div><div><p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-earth">Explore</p><div className="grid gap-3 text-sm text-white/70"><a href="#projects" className="hover:text-white">Projects</a><a href="#visit" className="hover:text-white">Book a site visit</a><a href="#about" className="hover:text-white">About Ukoo</a><a href="#faqs" className="hover:text-white">FAQs</a></div></div><div><p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-earth">Contact</p><div className="grid gap-3 text-sm text-white/70">{phoneNumber && <a href={`tel:${phoneNumber.replace(/\s+/g, "")}`} className="hover:text-white">{phoneNumber}</a>}{email && <a href={`mailto:${email}`} className="hover:text-white">{email}</a>}<div className="text-white/70">{officeLines.map((line) => <div key={line}>{line}</div>)}</div></div></div></div><div className="border-t border-white/10"><div className="mx-auto flex max-w-[1200px] flex-col justify-between gap-3 px-5 py-5 text-xs text-white/45 md:flex-row md:px-10"><p>© 2026 Ukoo Africa Homes Ltd. All rights reserved.</p><p>Integrity. Affordability. Quality.</p></div></div></footer>
    </div>
  );
}
