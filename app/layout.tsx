import type { Metadata } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";
import "./globals.css";
import { siteContact } from "@/lib/site-contact";

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
  description:
    "Affordable plots and homes in Juja, Thika and the Superhighway corridor, with genuine title deeds and flexible payment plans.",
  metadataBase: new URL("https://www.ukooafricahomes.co.ke"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Ukoo Africa Homes | Own Land. Build Home. Live Free.",
    description: "Affordable land and homes for sale across Kenya.",
    type: "website",
    url: "https://www.ukooafricahomes.co.ke",
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${inter.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              name: "Ukoo Africa Homes Ltd",
              url: "https://www.ukooafricahomes.co.ke",
              areaServed: "Kenya",
              telephone: siteContact.phoneNumber,
              email: siteContact.email,
            }),
          }}
        />
      </body>
    </html>
  );
}
