/* eslint-disable @next/next/no-html-link-for-pages */
import { ArrowLeft, ArrowRight, HeartHandshake, House, Lightbulb, ShieldCheck, Sparkles, Users } from "lucide-react";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "About Ukoo Africa Homes | Trusted Property Developers in Kenya",
  description:
    "Learn how Ukoo Africa Homes helps Kenyan families and investors own secure, affordable land and homes in Juja, Thika and beyond.",
  alternates: { canonical: "/about" },
};

const values = [
  [ShieldCheck, "Integrity", "We lead with honesty, transparent communication, and documentation you can understand."],
  [HeartHandshake, "Customer first", "Every decision begins with the people and families trusting us with their next chapter."],
  [Sparkles, "Quality", "We focus on strong locations, thoughtful developments, and service that carries through to ownership."],
  [Lightbulb, "Innovation", "We look for practical, creative ways to make property ownership more accessible."],
  [House, "Excellence", "We keep raising the standard across every project, interaction, and handover."],
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-stone">
      <SiteHeader />
      <div className="bg-earth-light px-5 pb-20 pt-10 md:px-10 md:pb-28">
        <div className="mx-auto max-w-[1200px]">
          <a href="/" className="inline-flex items-center gap-2 text-sm text-forest"><ArrowLeft size={15} /> Back home</a>
          <div className="mt-20 max-w-[820px]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-canopy">About Ukoo Africa Homes</p>
            <h1 className="mt-5 font-display text-5xl leading-none text-forest md:text-7xl">Property that makes<br /><em className="text-earth">belonging possible.</em></h1>
            <p className="mt-8 max-w-[650px] text-lg leading-8 text-slate">We help individuals, families, and investors move from the burden of rent to the confidence of owning a place they can call their own.</p>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-[1200px] px-5 py-16 md:px-10 md:py-24">
        <div className="grid gap-14 md:grid-cols-[0.8fr_1.2fr]">
          <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-canopy">Who we are</p><h2 className="mt-4 font-display text-4xl leading-tight text-forest md:text-5xl">A trusted path<br />to <em className="text-earth">ownership.</em></h2></div>
          <div className="max-w-[700px] text-lg leading-8 text-slate"><p>Ukoo Africa Homes Limited is a real estate development company headquartered in Nairobi, Kenya. We create affordable, secure, and high-quality residential and commercial opportunities along the Thika Superhighway, including Juja and Thika.</p><p className="mt-6">From value-added plots to ready-to-occupy homes, our solutions are built for modern Kenyan families and investors. We pair genuine freehold title deeds with flexible payment options and a clear ownership transfer process.</p></div>
        </div>
      </section>

      <section className="bg-forest text-white"><div className="mx-auto grid max-w-[1200px] gap-12 px-5 py-20 md:grid-cols-[0.8fr_1.2fr] md:px-10 md:py-24"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-earth">Our mission</p><h2 className="mt-5 font-display text-4xl leading-tight md:text-5xl">Make ownership<br /><em className="text-earth">feel possible.</em></h2></div><div className="max-w-[700px] text-lg leading-8 text-white/75"><p>We empower individuals and families through secure real estate investments that are affordable, value-driven, and future-focused.</p><p className="mt-6">Our work is also about the communities around each project: places designed to grow sustainably and give people a stronger foundation for the future.</p></div></div></section>

      <section className="mx-auto max-w-[1200px] px-5 py-16 md:px-10 md:py-24"><div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr]"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-canopy">Our team</p><h2 className="mt-4 font-display text-4xl leading-tight text-forest md:text-5xl">People who stay<br /><em className="text-earth">close to the journey.</em></h2></div><div className="max-w-[700px] text-lg leading-8 text-slate"><div className="mb-8 flex h-14 w-14 items-center justify-center rounded-lg bg-earth-light text-canopy"><Users size={28} /></div><p>Behind Ukoo Africa Homes is a team with experience across real estate, finance, architecture, and client service. That range of expertise helps us give practical guidance at every stage.</p><p className="mt-6">We believe clients deserve personal support, clear answers, and communication that does not disappear after the first inquiry. Our role is to help turn a property goal into a decision you can make with confidence.</p></div></div></section>

      <section className="border-y border-mist bg-chalk"><div className="mx-auto max-w-[1200px] px-5 py-16 md:px-10 md:py-24"><div className="mb-12 max-w-[620px]"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-canopy">Why choose Ukoo</p><h2 className="mt-4 font-display text-4xl text-forest md:text-5xl">Clarity from the first<br /><em className="text-earth">conversation.</em></h2></div><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">{["Verified freehold title deeds", "Projects in prime locations", "Transparent transactions", "Solutions shaped around your needs", "Support from inquiry to ownership"].map((item, index) => <div key={item} className="border-t-2 border-earth pt-5"><p className="font-display text-3xl text-earth">0{index + 1}</p><p className="mt-4 text-sm leading-6 text-slate">{item}</p></div>)}</div></div></section>

      <section className="mx-auto max-w-[1200px] px-5 py-16 md:px-10 md:py-24"><div className="mb-12 max-w-[650px]"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-canopy">What guides us</p><h2 className="mt-4 font-display text-4xl text-forest md:text-5xl">Values you can<br /><em className="text-earth">feel in the process.</em></h2></div><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">{values.map(([Icon, title, description]) => <div key={title as string} className="border-t-2 border-earth pt-6"><Icon className="text-canopy" size={26} strokeWidth={1.6} /><h3 className="mt-5 font-display text-2xl text-forest">{title as string}</h3><p className="mt-3 text-sm leading-6 text-slate">{description as string}</p></div>)}</div></section>

      <section className="bg-canopy text-white"><div className="mx-auto flex max-w-[1200px] flex-col justify-between gap-8 px-5 py-16 md:flex-row md:items-center md:px-10 md:py-20"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-earth-light">Ready for your next chapter?</p><h2 className="mt-4 font-display text-4xl md:text-5xl">Let&apos;s find your<br /><em className="text-earth-light">foundation.</em></h2></div><a href="/site-visit" className="inline-flex w-fit items-center gap-2 rounded-lg bg-earth px-6 py-4 text-sm font-semibold text-ink hover:bg-earth-light">Schedule a visit <ArrowRight size={16} /></a></div></section>
    </main>
  );
}
