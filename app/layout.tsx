import type { Metadata } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";
import "./globals.css";
import { siteContact } from "@/lib/site-contact";
import { absoluteUrl, defaultDescription, siteName, siteUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

const display = DM_Serif_Display({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ukoo Africa Homes | Own Land. Build Home. Live Free.",
  description: defaultDescription,
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        type: "image/x-icon",
        sizes: "16x16 32x32 48x48 64x64 128x128 256x256",
      },
      { url: "/TAG1.png", type: "image/png", sizes: "1200x1200" },
    ],
    shortcut: "/favicon.ico",
    apple: "/TAG1.png",
  },
  openGraph: {
    title: "Ukoo Africa Homes | Own Land. Build Home. Live Free.",
    description: "Affordable land and homes for sale across Kenya.",
    type: "website",
    url: siteUrl,
    images: [{ url: "/TAG1.png", alt: "Ukoo Africa Homes" }],
  },
  twitter: {
    card: "summary",
    images: ["/TAG1.png"],
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${display.variable} ${inter.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "RealEstateAgent",
                  "@id": `${siteUrl}/#organization`,
                  name: "Ukoo Africa Homes Ltd",
                  url: siteUrl,
                  logo: absoluteUrl("/TAG1.png"),
                  image: absoluteUrl("/TAG1.png"),
                  areaServed: ["Juja", "Thika", "Thika Superhighway", "Kenya"],
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Juja",
                    addressRegion: "Kiambu County",
                    addressCountry: "KE",
                  },
                  telephone: siteContact.phoneNumber,
                  email: siteContact.email,
                  sameAs: [],
                },
                {
                  "@type": "WebSite",
                  "@id": `${siteUrl}/#website`,
                  name: siteName,
                  url: siteUrl,
                  publisher: { "@id": `${siteUrl}/#organization` },
                  potentialAction: {
                    "@type": "SearchAction",
                    target: `${siteUrl}/projects?query={search_term_string}`,
                    "query-input": "required name=search_term_string",
                  },
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
