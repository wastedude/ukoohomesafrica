"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  HeartHandshake,
  MapPin,
  Menu,
  ShieldCheck,
  Sparkles,
  Star,
  X,
} from "lucide-react";

import { urlFor } from "@/sanity/lib/image";
import { siteContact } from "@/lib/site-contact";
import { FaLinkedinIn } from "react-icons/fa6";
import { SiFacebook, SiInstagram, SiWhatsapp } from "react-icons/si";

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

type CmsSocialLinks = {
  linkedin?: string;
  instagram?: string;
  facebook?: string;
};

const navItems = [["Projects", "/projects"], ["Site Visit", "/site-visit"], ["About", "/about"], ["Blog", "/blog"], ["FAQs", "/faqs"]];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [location, setLocation] = useState("All locations");
  const [properties, setProperties] = useState<CmsProperty[]>([]);
  const [testimonials, setTestimonials] = useState<CmsTestimonial[]>([]);
  const [socialLinks, setSocialLinks] = useState<CmsSocialLinks>({});
  const [whatsappOpen, setWhatsappOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoadingContent, setIsLoadingContent] = useState(true);
  const propertiesRowRef = useRef<HTMLDivElement>(null);
  const isCarouselPausedRef = useRef(false);

  useEffect(() => {
    fetch("/api/content", { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load CMS content");
        return response.json();
      })
      .then(({ properties: propertiesResult, testimonials: testimonialsResult, settings }) => {
        setProperties(Array.isArray(propertiesResult) ? propertiesResult : []);
        setTestimonials(Array.isArray(testimonialsResult) ? testimonialsResult : []);
        setSocialLinks(settings ?? {});
        setIsLoadingContent(false);
      })
      .catch(() => {
        setProperties([]);
        setTestimonials([]);
        setSocialLinks({});
        setIsLoadingContent(false);
      });
  }, []);

  const visibleProperties = useMemo(
    () => properties.filter((property) => location === "All locations" || property.location === location),
    [location, properties],
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      const row = propertiesRowRef.current;
      if (isCarouselPausedRef.current || !row || visibleProperties.length === 0) return;

      const firstClone = row.children[visibleProperties.length] as HTMLElement | undefined;
      const cycleWidth = firstClone?.offsetLeft ?? 0;
      if (cycleWidth <= row.clientWidth) return;

      const nextPosition = row.scrollLeft + 360;
      if (nextPosition >= cycleWidth) {
        row.scrollTo({ left: nextPosition - cycleWidth, behavior: "auto" });
      } else {
        row.scrollTo({ left: nextPosition, behavior: "smooth" });
      }
    }, 3000);

    return () => window.clearInterval(interval);
  }, [visibleProperties.length]);

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 24);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  const locationOptions = useMemo(
    () => ["All locations", ...new Set(properties.map((property) => property.location).filter(Boolean) as string[])],
    [properties],
  );

  const officeLines = siteContact.officeAddress.split("\n").filter(Boolean);
  const phoneNumber = siteContact.phoneNumber;
  const email = siteContact.email;
  const whatsappHref = `https://wa.me/${siteContact.whatsappNumber}?text=${encodeURIComponent("Hi, I'm interested in your properties")}`;

  const scrollProperties = (direction: "left" | "right") => {
    const row = propertiesRowRef.current;
    if (!row || visibleProperties.length === 0) return;

    const firstClone = row.children[visibleProperties.length] as HTMLElement | undefined;
    const cycleWidth = firstClone?.offsetLeft ?? 0;
    if (cycleWidth <= row.clientWidth) return;

    const currentPosition = row.scrollLeft;
    const step = direction === "right" ? 360 : -360;
    const nextPosition = currentPosition + step;

    if (nextPosition >= cycleWidth) {
      row.scrollTo({ left: nextPosition - cycleWidth, behavior: "auto" });
    } else if (nextPosition < 0) {
      row.scrollTo({ left: cycleWidth + nextPosition, behavior: "auto" });
    } else {
      row.scrollTo({ left: nextPosition, behavior: "smooth" });
    }
  };

  const carouselItems = visibleProperties.length > 0 ? [...visibleProperties, ...visibleProperties] : [];

  return (
    <div className="min-h-screen overflow-hidden bg-stone">
      <header className={`fixed inset-x-0 top-0 z-30 transition-colors duration-200 ${isScrolled ? "bg-forest/95 shadow-lg shadow-forest/10 backdrop-blur-md" : "bg-transparent"}`}>
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-5 md:px-10 md:py-7">
          <a href="#top" className="flex items-center gap-3 text-chalk" aria-label="Ukoo Africa Homes home">
            <Image src="/TAG1.png" alt="Ukoo Africa Homes" width={150} height={58} priority className="h-12 w-auto rounded bg-white object-contain p-1" />
          </a>
          <nav className="hidden items-center gap-7 text-sm text-white/80 lg:flex">
            {navItems.map(([label, href]) => <a key={label} href={href} className="hover:text-earth">{label}</a>)}
          </nav>
          <div className="hidden items-center gap-5 lg:flex">
            {phoneNumber && <a href={`tel:${phoneNumber.replace(/\s+/g, "")}`} className="text-sm text-white/80 hover:text-white">{phoneNumber}</a>}
            <a href="#visit" className="flex items-center gap-2 rounded-lg bg-earth px-4 py-3 text-sm font-semibold text-ink hover:bg-earth-light">Book a visit <ArrowUpRight size={16} /></a>
          </div>
          <button className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/30 p-2 text-white transition hover:border-earth hover:text-earth lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
        {menuOpen && <div className="mx-5 rounded-lg border border-white/15 bg-forest p-5 shadow-xl lg:hidden"><nav className="grid gap-5 text-lg text-white">{navItems.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}<a href="#visit" className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-earth px-4 py-3 text-sm font-semibold text-ink">Book a visit <ArrowUpRight size={16} /></a></nav></div>}
      </header>

      <main id="top">
        <section className="hero-grid relative flex min-h-[650px] items-end overflow-hidden bg-forest pb-12 pt-28 md:min-h-[720px] md:pb-16 md:pt-32">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,35,21,0.96)_0%,rgba(18,57,34,0.78)_44%,rgba(26,77,46,0.3)_100%),url('https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2200&q=90')] bg-cover bg-center" />
          <div className="relative mx-auto w-full max-w-[1200px] px-5 md:px-10">
            <div className="max-w-[680px]">
              <p className="mb-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-earth"><span className="h-px w-10 bg-earth" /> Built for belonging</p>
              <h1 className="reveal-up text-balance font-display text-[clamp(2.75rem,5.4vw,5.25rem)] leading-[0.9] text-white">Affordable land<br /><em className="text-earth">&amp; homes</em><br />across Kenya.</h1>
              <p className="reveal-up mt-6 max-w-[40rem] text-lg leading-7 text-white/90 md:mt-7 md:text-xl">Secure and affordable real estate investment opportunities in Juja, Thika and along Thika Superhighway, with genuine freehold title deeds and flexible payment plans.</p>
              <div className="reveal-up mt-8 flex flex-col gap-3 sm:flex-row"><a href="#projects" className="flex min-h-12 items-center justify-center gap-3 rounded-lg bg-earth px-6 py-3 text-sm font-semibold text-ink transition hover:bg-earth-light active:translate-y-px">Explore properties <ArrowRight size={17} /></a><a href="#visit" className="flex min-h-12 items-center justify-center gap-3 rounded-lg border border-white/60 px-6 py-3 text-sm font-semibold text-white transition hover:border-earth hover:text-earth active:translate-y-px">Book a site visit <MapPin size={17} /></a></div>
              <div className="mt-10 flex items-center gap-4 text-sm text-white/80"><span className="flex -space-x-2"><span className="h-8 w-8 rounded-full border-2 border-forest bg-[#b47e62]" /><span className="h-8 w-8 rounded-full border-2 border-forest bg-[#d2a07e]" /><span className="h-8 w-8 rounded-full border-2 border-forest bg-[#694b3a]" /></span><span><strong className="text-white">300+ families</strong> have found their place</span></div>
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
          <div className="relative">
            <button type="button" onClick={() => scrollProperties("left")} className="absolute -left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-mist bg-chalk/95 text-forest shadow-md transition hover:border-canopy hover:bg-earth-light" aria-label="Show previous properties"><ChevronLeft size={20} /></button>
            <div
              ref={propertiesRowRef}
              className="hide-scrollbar flex snap-x scroll-smooth gap-6 overflow-x-auto pb-4"
              onMouseEnter={() => {
                isCarouselPausedRef.current = true;
              }}
              onMouseLeave={() => {
                isCarouselPausedRef.current = false;
              }}
              onFocusCapture={() => {
                isCarouselPausedRef.current = true;
              }}
              onBlurCapture={() => {
                isCarouselPausedRef.current = false;
              }}
            >
            {isLoadingContent ? Array.from({ length: 3 }).map((_, index) => <div key={`property-skeleton-${index}`} className="h-[390px] w-[82vw] min-w-[280px] max-w-[360px] shrink-0 animate-pulse rounded-lg bg-chalk/70 sm:w-[320px]" />) : carouselItems.map((property, index) => {
              const imageUrl = property.mainImage ? urlFor(property.mainImage).width(900).url() : "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85";

              return (
                <article key={`${property._id}-${index}`} className="group w-[82vw] min-w-[280px] max-w-[360px] shrink-0 snap-start overflow-hidden rounded-lg bg-chalk sm:w-[320px]">
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
            <button type="button" onClick={() => scrollProperties("right")} className="absolute -right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-mist bg-chalk/95 text-forest shadow-md transition hover:border-canopy hover:bg-earth-light" aria-label="Show more properties"><ChevronRight size={20} /></button>
          </div>
        </section>

        <section className="bg-earth-light"><div className="mx-auto grid max-w-[1200px] gap-12 px-5 py-16 md:grid-cols-[0.9fr_1.1fr] md:px-10 md:py-24"><div><p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-canopy">More than a transaction</p><h2 className="font-display text-4xl leading-tight text-forest md:text-5xl">A clearer path to<br /><em className="text-earth">home.</em></h2><p className="mt-6 max-w-[470px] leading-7 text-slate">Whether you are buying your first plot, planning a family home, or investing from abroad, our team makes the next step feel simple.</p><a href="#about" className="mt-8 inline-flex items-center gap-2 font-semibold text-forest hover:text-canopy">Why Ukoo <ArrowRight size={17} /></a></div><div className="grid gap-0 sm:grid-cols-2"><div className="border-b border-mist px-0 py-6 sm:border-r sm:pr-8"><ShieldCheck className="text-canopy" size={28} strokeWidth={1.5} /><h3 className="mt-4 font-display text-2xl text-forest">Genuine title deeds</h3><p className="mt-2 text-sm leading-6 text-slate">Clear documentation and guidance at every stage of your purchase.</p></div><div className="border-b border-mist px-0 py-6 sm:pl-8"><HeartHandshake className="text-canopy" size={28} strokeWidth={1.5} /><h3 className="mt-4 font-display text-2xl text-forest">Plans that work</h3><p className="mt-2 text-sm leading-6 text-slate">Flexible payment options built around real life and real goals.</p></div><div className="border-b border-mist px-0 py-6 sm:border-b-0 sm:border-r sm:pr-8"><MapPin className="text-canopy" size={28} strokeWidth={1.5} /><h3 className="mt-4 font-display text-2xl text-forest">Prime locations</h3><p className="mt-2 text-sm leading-6 text-slate">Well-connected developments within reach of Nairobi and opportunity.</p></div><div className="border-b border-mist px-0 py-6 sm:border-b-0 sm:pl-8"><Sparkles className="text-canopy" size={28} strokeWidth={1.5} /><h3 className="mt-4 font-display text-2xl text-forest">People first</h3><p className="mt-2 text-sm leading-6 text-slate">A trusted team that listens, plans and stands beside you.</p></div></div></div></section>

        <section id="about" className="mx-auto max-w-[1200px] px-5 py-20 md:px-10 md:py-28"><div className="grid gap-12 md:grid-cols-[1fr_1.15fr] md:items-center"><div className="relative aspect-[0.9] overflow-hidden rounded-lg bg-forest"><div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=85)" }} /><div className="absolute bottom-5 left-5 max-w-[200px] rounded-lg bg-forest p-5 text-white"><p className="font-display text-3xl text-earth">14 yrs</p><p className="mt-1 text-xs leading-5 text-white/70">of helping Kenyans put down roots</p></div></div><div><p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-canopy">The Ukoo difference</p><h2 className="font-display text-4xl leading-tight text-forest md:text-5xl">Home is more than<br /><em className="text-earth">four walls.</em></h2><p className="mt-6 max-w-[520px] leading-7 text-slate">It is the morning light, the neighbour who becomes family, the confidence that what you are building will last. Ukoo Africa Homes brings that feeling within reach through carefully selected land and homes across Kenya.</p><ul className="mt-8 grid gap-4 text-sm text-ink sm:grid-cols-2"><li className="flex items-center gap-3"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-earth-light text-canopy"><Check size={14} /></span> Honest advice, always</li><li className="flex items-center gap-3"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-earth-light text-canopy"><Check size={14} /></span> Sites you can visit</li><li className="flex items-center gap-3"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-earth-light text-canopy"><Check size={14} /></span> Verified documentation</li><li className="flex items-center gap-3"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-earth-light text-canopy"><Check size={14} /></span> Clear next steps</li></ul></div></div></section>

        <section className="border-y border-mist bg-chalk"><div className="mx-auto max-w-[1200px] px-5 py-16 md:px-10 md:py-24"><div className="flex flex-col gap-5"><div><p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-canopy">Stories from home</p><h2 className="font-display text-4xl text-forest md:text-5xl">Good decisions feel<br /><em className="text-earth">even better.</em></h2><div className="mt-4 flex gap-1 text-earth" aria-label="Five star rating"><Star size={17} fill="currentColor" /><Star size={17} fill="currentColor" /><Star size={17} fill="currentColor" /><Star size={17} fill="currentColor" /><Star size={17} fill="currentColor" /></div></div></div><div className="mt-10 grid items-stretch gap-5 md:grid-cols-3">{isLoadingContent ? Array.from({ length: 3 }).map((_, index) => <div key={`testimonial-skeleton-${index}`} className="min-h-[250px] animate-pulse rounded-lg bg-stone" />) : testimonials.map((testimonial) => <figure key={testimonial._id} className="flex min-h-[250px] flex-col rounded-lg border border-mist bg-stone p-6 transition hover:-translate-y-1 hover:border-earth hover:shadow-lg focus-within:border-earth"><blockquote className="font-display text-2xl leading-snug text-forest">&ldquo;{testimonial.quote}&rdquo;</blockquote><figcaption className="mt-auto border-t border-mist pt-5 text-sm text-slate"><strong className="text-ink">{testimonial.name}</strong><br />{testimonial.role || "Home Owner"}</figcaption></figure>)}</div></div></section>

        <section id="visit" className="relative overflow-hidden bg-canopy"><div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/10" /><div className="absolute -right-5 -top-5 h-44 w-44 rounded-full border border-white/10" /><div className="relative mx-auto flex max-w-[1200px] flex-col justify-between gap-10 px-5 py-20 md:flex-row md:items-center md:px-10 md:py-24"><div><p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-earth-light">Your next chapter starts here</p><h2 className="max-w-[600px] font-display text-4xl leading-tight text-white md:text-6xl">Ready to stop<br /><em className="text-earth-light">renting?</em></h2><p className="mt-5 max-w-[470px] leading-7 text-white/75">Come see the possibilities for yourself. No pressure, just honest answers and a team that listens.</p></div>{whatsappHref && <a href={whatsappHref} className="flex w-fit items-center gap-3 rounded-lg bg-[#25D366] px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-[#128C7E]/20 transition hover:bg-[#20bd5a]"><SiWhatsapp size={20} /> Chat on WhatsApp <ArrowUpRight size={17} /></a>}</div></section>
      </main>

      <footer className="bg-forest text-white"><div className="mx-auto grid max-w-[1200px] gap-12 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:px-10"><div><div className="flex items-center gap-3"><Image src="/TAG1.png" alt="Ukoo Africa Homes" width={150} height={58} className="h-12 w-auto rounded bg-white object-contain p-1" /></div><p className="mt-5 max-w-[280px] text-sm leading-6 text-white/60">Building more than homes. Creating places to belong, grow and live free.</p></div><div><p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-earth">Explore</p><div className="grid gap-3 text-sm text-white/70"><a href="#projects" className="hover:text-white">Projects</a><a href="#visit" className="hover:text-white">Book a site visit</a><a href="#about" className="hover:text-white">About Ukoo</a><a href="#faqs" className="hover:text-white">FAQs</a></div></div><div><p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-earth">Contact</p><div className="grid gap-3 text-sm text-white/70">{phoneNumber && <a href={`tel:${phoneNumber.replace(/\s+/g, "")}`} className="hover:text-white">{phoneNumber}</a>}{email && <a href={`mailto:${email}`} className="hover:text-white">{email}</a>}<div className="text-white/70">{officeLines.map((line) => <div key={line}>{line}</div>)}</div><div className="mt-3 flex items-center gap-3">{socialLinks.linkedin && <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-white/70 transition hover:text-white"><FaLinkedinIn size={18} /></a>}{socialLinks.instagram && <a href={socialLinks.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="text-white/70 transition hover:text-white"><SiInstagram size={18} /></a>}{socialLinks.facebook && <a href={socialLinks.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="text-white/70 transition hover:text-white"><SiFacebook size={18} /></a>}</div></div></div></div><div className="border-t border-white/10"><div className="mx-auto flex max-w-[1200px] flex-col justify-between gap-3 px-5 py-5 text-xs text-white/45 md:flex-row md:px-10"><p>© 2026 Ukoo Africa Homes Ltd. All rights reserved.</p><p>Integrity. Affordability. Quality.</p></div></div></footer>
      {whatsappHref && <div className="group fixed bottom-5 right-5 z-40"><div className={`flex h-14 overflow-hidden rounded-full bg-[#25D366] shadow-lg shadow-[#128C7E]/35 transition-[width,transform] duration-300 ease-out ${whatsappOpen ? "w-[174px]" : "w-14 group-hover:w-[174px]"}`}><a href={whatsappHref} className={`flex min-w-0 flex-1 items-center justify-center overflow-hidden whitespace-nowrap text-sm font-semibold text-white transition-opacity duration-200 ${whatsappOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>Chat with us</a><button type="button" onClick={() => setWhatsappOpen(!whatsappOpen)} className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white transition hover:bg-[#20bd5a]" aria-label={whatsappOpen ? "Close WhatsApp contact" : "Open WhatsApp contact"} aria-expanded={whatsappOpen}><SiWhatsapp size={28} /></button></div></div>}
    </div>
  );
}
