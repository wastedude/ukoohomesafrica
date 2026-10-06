"use client";

import Image from "next/image";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { siteContact } from "@/lib/site-contact";

const navItems = [
  ["Projects", "/projects"],
  ["Site Visit", "/site-visit"],
  ["About", "/about"],
  ["Blog", "/blog"],
  ["FAQs", "/faqs"],
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const phoneHref = `tel:${siteContact.phoneNumber.replace(/\s+/g, "")}`;

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-forest/95 text-white shadow-lg shadow-forest/10 backdrop-blur-md">
      <div className="mx-auto flex min-h-20 max-w-[1200px] items-center justify-between gap-4 px-5 py-4 md:px-10">
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="Ukoo Africa Homes home">
          <Image src="/TAG1.png" alt="Ukoo Africa Homes" width={150} height={58} priority className="h-12 w-auto rounded bg-white object-contain p-1" />
        </Link>
        <nav className="hidden items-center gap-6 text-sm lg:flex" aria-label="Main navigation">
          {navItems.map(([label, href]) => {
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return <Link key={label} href={href} className={`border-b-2 py-2 transition ${active ? "border-earth text-earth" : "border-transparent text-white/75 hover:text-white"}`}>{label}</Link>;
          })}
        </nav>
        <div className="hidden items-center gap-4 lg:flex">
          <a href={phoneHref} className="text-sm text-white/75 transition hover:text-white">{siteContact.phoneNumber}</a>
          <Link href="/site-visit" className="flex min-h-11 items-center gap-2 rounded-lg bg-earth px-4 py-3 text-sm font-semibold text-ink transition hover:bg-earth-light active:translate-y-px">Book a visit <ArrowUpRight size={16} /></Link>
        </div>
        <button type="button" className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/30 text-white transition hover:border-earth hover:text-earth lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
      </div>
      <div className={`overflow-hidden border-t border-white/10 bg-forest transition-[max-height,opacity] duration-200 lg:hidden ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <nav className="mx-auto grid max-w-[1200px] gap-1 px-5 py-3 md:px-10" aria-label="Mobile navigation">
          {navItems.map(([label, href]) => <Link key={label} href={href} onClick={() => setMenuOpen(false)} className="flex min-h-12 items-center rounded-lg px-3 text-base text-white/85 hover:bg-white/10 hover:text-earth">{label}</Link>)}
          <a href={phoneHref} className="flex min-h-12 items-center rounded-lg px-3 text-base text-white/85 hover:bg-white/10 hover:text-earth">Call {siteContact.phoneNumber}</a>
          <Link href="/site-visit" onClick={() => setMenuOpen(false)} className="mt-2 flex min-h-12 items-center justify-center gap-2 rounded-lg bg-earth px-4 py-3 text-sm font-semibold text-ink">Book a visit <ArrowUpRight size={16} /></Link>
        </nav>
      </div>
    </header>
  );
}
