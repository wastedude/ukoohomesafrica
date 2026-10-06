/* eslint-disable @next/next/no-html-link-for-pages */
import { ArrowLeft, ChevronDown } from "lucide-react";
import type { Metadata } from "next";

import { SiteHeader } from "@/components/site-header";

const faqs = ["How do I know the title deeds are genuine?", "What payment plans are available?", "Can I visit a site before buying?", "Do you help with financing?", "What areas do you operate in?", "How long does the purchase process take?"];

export const metadata: Metadata = {
  title: "Frequently Asked Questions About Buying Property | Ukoo Africa Homes",
  description:
    "Answers about title deeds, payment plans, site visits, financing and buying land or homes from Ukoo Africa Homes.",
  alternates: { canonical: "/faqs" },
};

export default function FaqsPage() {
  return (
    <main className="min-h-screen bg-stone">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((question) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: {
            "@type": "Answer",
            text: "Our team will walk you through the documents, process and options in plain language. Book a site visit or chat with us directly for an answer specific to your situation.",
          },
        })),
      }) }} />
      <SiteHeader />
      <div className="bg-forest px-5 pb-16 pt-10 text-white md:px-10 md:pb-20">
        <div className="mx-auto max-w-[900px]"><a href="/" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-earth"><ArrowLeft size={15} /> Back home</a><p className="mt-16 text-xs font-semibold uppercase tracking-[0.18em] text-earth md:mt-20">Questions, answered</p><h1 className="mt-5 font-display text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.92]">Let&apos;s make<br /><em className="text-earth">it clear.</em></h1></div>
      </div>
      <div className="mx-auto max-w-[900px] px-5 py-8 md:px-10 md:py-12">
        <div className="divide-y divide-mist rounded-lg bg-chalk px-5 shadow-sm md:px-10">{faqs.map((faq) => <details key={faq} className="group py-6"><summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-5 font-display text-xl text-forest"><span>{faq}</span><ChevronDown className="shrink-0 text-earth transition group-open:rotate-180" size={20} /></summary><p className="max-w-[650px] pt-4 text-sm leading-7 text-slate">Our team will walk you through the documents, process and options in plain language. Book a site visit or chat with us directly for an answer specific to your situation.</p></details>)}</div>
      </div>
    </main>
  );
}
