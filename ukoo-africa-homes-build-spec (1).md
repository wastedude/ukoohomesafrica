# Ukoo Africa Homes — Full Build Specification
> **For AI-assisted development.** Read this entire file before writing any code. Every decision here is intentional. Do not substitute defaults.

---

## 0. Project Overview

**Client:** Ukoo Africa Homes Ltd  
**Domain:** `ukooafricahomes.co.ke`  
**Current site:** WordPress + Elementor + WooCommerce (being replaced entirely)  
**Hosting target:** Vercel  
**CMS:** Sanity.io (no-code admin for client)  
**Purpose:** Real estate lead generation — affordable homes and land for sale across Kenya (Juja, Thika, Ngoingwa, Thika Superhighway corridor)  
**Primary audience:** Kenyan home buyers and land investors, majority on mobile, majority on relatively slow mobile data  
**Primary goal:** Drive WhatsApp enquiries and site visit bookings. No payments, no cart.

---

## 1. Tech Stack

| Layer | Technology | Version / Notes |
|---|---|---|
| Framework | **Next.js** | v14+ with App Router |
| Language | **TypeScript** | Strict mode on |
| Styling | **Tailwind CSS** | v3, with custom design tokens in `tailwind.config.ts` |
| Animation | **Framer Motion** | v11 — used sparingly, only where it adds meaning |
| CMS | **Sanity.io** | v3, Studio embedded at `/studio` route |
| CMS Query | **GROQ + next-sanity** | `@sanity/client`, `next-sanity` |
| Forms | **React Hook Form + Formspree** | No backend — submissions go to email |
| Images | **Next.js `<Image>`** | WebP, lazy loading, blur placeholder |
| Icons | **Lucide React** | Consistent, lightweight |
| Fonts | **Next.js font optimisation** | Self-hosted via `next/font/google` — no external font requests |
| Deployment | **Vercel** | Standard Next.js production deployment |
| DNS | **HostPinnacle Kenya** | Custom domain on Vercel |
| Analytics | **Google Analytics 4** | Via `@next/third-parties/google` |
| SEO | **next-seo + JSON-LD** | Per-page metadata + RealEstateListing schema |
| Version Control | **Git + GitHub** | Main branch protected; deploy on push to `main` |

---

## 2. Design System

### 2.1 Design Philosophy
The site should feel like a **trusted Kenyan institution** — grounded, confident, warm. Not corporate-cold, not startup-flashy. Think: the feeling of a well-built home in a mature estate. Clean lines, natural materials, sunlight.

Avoid:
- Generic SaaS card grids
- Terracotta/cream "AI default" palettes
- Excessive motion or parallax
- Uppercase labels on everything
- Cards with identical rounded corners and box shadows everywhere

### 2.2 Color Palette

Define all as CSS custom properties in `globals.css` AND as Tailwind tokens in `tailwind.config.ts`.

```
--color-forest:    #1A4D2E   /* Primary — deep green, main CTAs, nav */
--color-canopy:    #2E7D52   /* Secondary green — hover states, accents */
--color-earth:     #C49A3C   /* Gold — trust signals, highlights, badges */
--color-earth-light: #F5E9C8 /* Gold tint — backgrounds for callout blocks */
--color-stone:     #F2EFE9   /* Page background — warm off-white, not pure white */
--color-chalk:     #FFFFFF   /* Card backgrounds */
--color-ink:       #1C1C1C   /* Body text */
--color-slate:     #4A4A4A   /* Secondary text */
--color-mist:      #DDD8CF   /* Borders, dividers */
--color-alert:     #B84040   /* Error states only */
```

### 2.3 Typography

Use **two typefaces only**. Load both via `next/font/google`.

| Role | Family | Weights | Usage |
|---|---|---|---|
| Display / Headings | `DM Serif Display` | 400, 400 italic | H1, H2, hero headlines, section titles |
| Body / UI | `Inter` | 400, 500, 600 | Body text, nav, buttons, labels, captions |

**Type scale (Tailwind custom):**

```js
fontSize: {
  'display':  ['clamp(2.2rem, 5vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
  'heading':  ['clamp(1.5rem, 3vw, 2.2rem)',  { lineHeight: '1.2' }],
  'subhead':  ['1.125rem', { lineHeight: '1.4' }],
  'body':     ['0.9375rem', { lineHeight: '1.7' }],
  'small':    ['0.8125rem', { lineHeight: '1.6' }],
  'label':    ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.06em' }],
}
```

Max line length: 68 characters on body text (`max-w-[68ch]`).

### 2.4 Spacing & Layout

- Max content width: `1200px` (`max-w-[1200px] mx-auto`)
- Section vertical padding: `py-20 md:py-28`
- Horizontal page padding: `px-5 md:px-10`
- Card border radius: `rounded-lg` (8px) — use consistently, do not mix with `rounded-2xl` or `rounded-full` on containers
- Grid gap: `gap-6 md:gap-8`

### 2.5 Motion (Framer Motion) — Rules

**Less is more.** Motion must earn its place.

Allowed:
- `fadeInUp` on section entry (once, on scroll into view) — `y: 24, opacity: 0` → `y: 0, opacity: 1`, duration `0.5s`, ease `easeOut`
- Staggered children in property card grids — `staggerChildren: 0.08`
- Smooth modal/drawer open-close
- WhatsApp button pulse (subtle, 2s loop) to draw attention
- Page transition: simple `opacity` fade, `0.3s`

Not allowed:
- Parallax scrolling
- Hover animations on every card
- Entrance animations on every element
- Scroll-triggered counters or number animations (feels gimmicky for real estate)

Always wrap motion in `useReducedMotion()` check and skip animation if true.

---

## 3. Project Structure

```
ukoo-africa-homes/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout — fonts, analytics, WhatsApp button
│   ├── page.tsx                  # Homepage
│   ├── projects/
│   │   ├── page.tsx              # All listings grid with filter
│   │   └── [slug]/page.tsx       # Individual property detail page
│   ├── site-visit/
│   │   └── page.tsx              # Site visit booking form
│   ├── about/
│   │   └── page.tsx              # About page
│   ├── blog/
│   │   ├── page.tsx              # Blog listing
│   │   └── [slug]/page.tsx       # Individual blog post
│   ├── faqs/
│   │   └── page.tsx              # FAQs with accordion
│   ├── privacy-policy/
│   │   └── page.tsx
│   ├── terms/
│   │   └── page.tsx
│   └── studio/[[...tool]]/
│       └── page.tsx              # Sanity Studio (CMS admin)
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx            # Responsive nav with mobile drawer
│   │   ├── Footer.tsx
│   │   └── WhatsAppButton.tsx    # Fixed floating WhatsApp CTA
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── StatsBar.tsx          # "300+ families housed · 5 active developments"
│   │   ├── FeaturedProperties.tsx
│   │   ├── Services.tsx
│   │   ├── Testimonials.tsx
│   │   ├── LocationMap.tsx
│   │   └── CallToAction.tsx
│   ├── properties/
│   │   ├── PropertyCard.tsx
│   │   ├── PropertyGrid.tsx
│   │   ├── PropertyFilter.tsx    # Type, location, price range
│   │   └── PropertyDetail.tsx
│   ├── forms/
│   │   ├── EnquiryForm.tsx       # Inline on property pages
│   │   └── SiteVisitForm.tsx     # Full page booking form
│   └── ui/
│       ├── Button.tsx
│       ├── Badge.tsx             # "For Sale" / "Sold" / "New"
│       ├── SectionHeader.tsx
│       ├── Accordion.tsx         # For FAQs
│       └── ImageGallery.tsx      # Lightbox for property photos
│
├── sanity/
│   ├── lib/
│   │   ├── client.ts             # Sanity client config
│   │   ├── queries.ts            # All GROQ queries
│   │   └── image.ts              # urlFor() helper
│   └── schemas/
│       ├── index.ts              # Schema registry
│       ├── property.ts           # Property listing schema
│       ├── testimonial.ts
│       ├── blogPost.ts
│       └── siteSettings.ts       # Global settings (phone, WhatsApp, socials)
│
├── lib/
│   ├── constants.ts              # Site-wide constants
│   └── utils.ts                  # cn(), formatPrice(), etc.
│
├── public/
│   ├── logo.svg
│   ├── logo-white.svg
│   └── og-image.jpg              # 1200×630 Open Graph image
│
├── types/
│   └── index.ts                  # TypeScript types for all Sanity documents
│
├── .env.local                    # Sanity project ID, dataset, tokens
├── next.config.ts                # Next.js runtime config for Vercel
├── tailwind.config.ts
├── sanity.config.ts              # Sanity Studio config
└── tsconfig.json
```

---

## 4. Sanity CMS — Schema Definitions

### 4.1 Property Schema (`sanity/schemas/property.ts`)

```ts
// Fields the client fills in via Sanity Studio
{
  name: 'property',
  title: 'Property',
  type: 'document',
  fields: [
    { name: 'title',        type: 'string',   title: 'Property Name',         validation: Required },
    { name: 'slug',         type: 'slug',     title: 'URL Slug',              options: { source: 'title' } },
    { name: 'status',       type: 'string',   title: 'Status',                options: { list: ['For Sale', 'Sold', 'Coming Soon'] } },
    { name: 'type',         type: 'string',   title: 'Property Type',         options: { list: ['Residential Home', 'Residential Plot', 'Commercial Plot', 'Investment Package'] } },
    { name: 'price',        type: 'number',   title: 'Price (KSh)' },
    { name: 'priceLabel',   type: 'string',   title: 'Price Label',           description: 'e.g. "From KSh 3M" or "KSh 6.5M"' },
    { name: 'location',     type: 'string',   title: 'Location',              options: { list: ['Juja', 'Thika', 'Ngoingwa', 'Thika Superhighway', 'Other'] } },
    { name: 'address',      type: 'string',   title: 'Full Address / Description' },
    { name: 'coordinates',  type: 'geopoint', title: 'GPS Coordinates' },
    { name: 'size',         type: 'string',   title: 'Plot/House Size',       description: 'e.g. "50×100 ft" or "3 bedrooms, 120 sqm"' },
    { name: 'description',  type: 'array',    title: 'Description',           of: [{ type: 'block' }] },
    { name: 'features',     type: 'array',    title: 'Key Features',          of: [{ type: 'string' }], description: 'e.g. "Freehold title deed", "Gated community"' },
    { name: 'mainImage',    type: 'image',    title: 'Main Photo',            options: { hotspot: true } },
    { name: 'gallery',      type: 'array',    title: 'Photo Gallery',         of: [{ type: 'image', options: { hotspot: true } }] },
    { name: 'featured',     type: 'boolean',  title: 'Featured on Homepage?' },
    { name: 'publishedAt',  type: 'datetime', title: 'Date Listed' },
  ],
  preview: {
    select: { title: 'title', subtitle: 'location', media: 'mainImage' }
  }
}
```

### 4.2 Testimonial Schema (`sanity/schemas/testimonial.ts`)

```ts
{
  name: 'testimonial',
  fields: [
    { name: 'name',       type: 'string' },
    { name: 'role',       type: 'string',  description: 'e.g. "Quantity Surveyor" or "Home Owner"' },
    { name: 'photo',      type: 'image' },
    { name: 'quote',      type: 'text' },
    { name: 'rating',     type: 'number', validation: min(1).max(5) },
    { name: 'order',      type: 'number', description: 'Display order' },
  ]
}
```

### 4.3 Blog Post Schema (`sanity/schemas/blogPost.ts`)

```ts
{
  name: 'blogPost',
  fields: [
    { name: 'title',       type: 'string' },
    { name: 'slug',        type: 'slug',     options: { source: 'title' } },
    { name: 'excerpt',     type: 'text' },
    { name: 'mainImage',   type: 'image' },
    { name: 'body',        type: 'array',    of: [{ type: 'block' }, { type: 'image' }] },
    { name: 'publishedAt', type: 'datetime' },
    { name: 'category',    type: 'string',   options: { list: ['Buying Guide', 'Market News', 'Company News', 'Tips'] } },
  ]
}
```

### 4.4 Site Settings Schema (`sanity/schemas/siteSettings.ts`)

```ts
// Singleton document — client can update contact info without a developer
{
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  __experimental_actions: ['update', 'publish'], // no create/delete — singleton
  fields: [
    { name: 'whatsappNumber',  type: 'string', description: 'Format: 2547XXXXXXXX' },
    { name: 'phoneNumber',     type: 'string' },
    { name: 'email',           type: 'string' },
    { name: 'officeAddress',   type: 'string' },
    { name: 'facebook',        type: 'url' },
    { name: 'instagram',       type: 'url' },
    { name: 'tiktok',          type: 'url' },
    { name: 'formspreeId',     type: 'string', description: 'Formspree form ID for enquiry submissions' },
  ]
}
```

---

## 5. Page Specifications

### 5.1 Homepage (`/`)

**Sections in order:**

1. **Hero**
   - Full-viewport height on desktop, 85vh on mobile
   - Background: large aerial/drone photo of a development, dark overlay `rgba(0,0,0,0.45)`
   - Headline (DM Serif Display, display size, white): `"Own Land. Build Home. Live Free."`
   - Subheadline (Inter, white/80%): `"Affordable plots and homes in Juja, Thika and the Superhighway corridor — with genuine title deeds and flexible payment plans."`
   - Two CTAs side by side: `[View Properties]` (filled, forest green) and `[Book a Site Visit]` (outlined, white)
   - Framer Motion: headline and CTAs `fadeInUp` staggered on load

2. **Stats Bar**
   - Full-width, forest green background
   - 4 stats in a row: `300+ Families Housed · 5 Active Developments · Freehold Title Deeds · Flexible Payment Plans`
   - Do NOT animate these as counting numbers — just render them statically

3. **Featured Properties**
   - Section title: `"Available Properties"`
   - Show 4–6 properties where `featured === true` from Sanity
   - 3-column grid on desktop, 2-column on tablet, 1-column on mobile
   - Each `PropertyCard` shows: main image, badge (status), type, location, size, price, `[Enquire Now]` button
   - `[View All Properties →]` link at the bottom

4. **Services**
   - 3 service blocks: Residential Property Sales, Land Investment, Real Estate Advisory
   - Layout: alternating image-left / image-right on desktop, stacked on mobile
   - Each has bullet features (✅ list) and a `[Book a Visit]` CTA

5. **Why Choose Ukoo Africa Homes**
   - 4 trust pillars in a 2×2 grid: Genuine Title Deeds, Flexible Payment Plans, Prime Locations, Trusted by 300+ Families
   - Use simple icons (Lucide) + short paragraph each
   - Background: `stone` (off-white), no card shadows here — use spacing and typography to separate

6. **Testimonials**
   - Horizontal scroll carousel on mobile, 3-column grid on desktop
   - Each card: photo, name, role, star rating, quote
   - Pull all testimonials from Sanity ordered by `order`

7. **Locations Map**
   - Embed Google Maps iframe showing pins for Juja, Thika, Ngoingwa
   - Fallback: static image map if iframe blocked
   - Below map: `"All our developments are within 1 hour of Nairobi CBD"`

8. **CTA Banner**
   - Full-width, canopy green background
   - Headline: `"Ready to stop renting?"`
   - Sub: `"Talk to our team today — no pressure, just honest answers."`
   - Button: `[Chat on WhatsApp]` → opens `wa.me/2547XXXXXXXX`

9. **Footer**
   - Logo (white SVG), tagline, nav links, social icons, contact details
   - Copyright line

---

### 5.2 Projects / Listings Page (`/projects`)

- **Filter bar** (sticky on scroll): filter by Type, Location, Price Range (KSh)
  - Type: All / Residential Home / Residential Plot / Commercial Plot / Investment Package
  - Location: All / Juja / Thika / Ngoingwa / Superhighway
  - Price: All / Under 3M / 3M–7M / 7M–15M / Above 15M
- All filtering done client-side (no page reload) — fetch all properties once from Sanity at build time via `generateStaticParams`
- Grid of `PropertyCard` components
- Empty state: `"No properties match your filters — try adjusting the search."` with a WhatsApp prompt

---

### 5.3 Property Detail Page (`/projects/[slug]`)

Layout (desktop: 60/40 split):

**Left column:**
- `ImageGallery` — main image large, thumbnail strip below, click to open lightbox
- Full property description (Portable Text rendered with `@portabletext/react`)
- Features list (✅ bullets from Sanity `features` array)

**Right column (sticky on scroll):**
- Price badge
- Property summary (type, location, size, status)
- `EnquiryForm` component:
  - Fields: Full Name (required), Phone Number (required), Email (optional), Message (pre-filled: `"I'm interested in [property name]"`)
  - Submit via Formspree
  - Success state: `"Thank you! We'll be in touch within 24 hours."` + `[Chat on WhatsApp Instead]` link
- Share buttons: WhatsApp share link, copy URL

**SEO:** Each property page must have:
```tsx
// In generateMetadata()
title: `${property.title} | ${property.location} | Ukoo Africa Homes`
description: `${property.priceLabel} — ${property.type} in ${property.location}. Freehold title deed. ${property.size}.`

// JSON-LD structured data
{
  "@type": "RealEstateListing",
  "name": property.title,
  "description": ...,
  "offers": { "@type": "Offer", "price": property.price, "priceCurrency": "KES" },
  "address": { "@type": "PostalAddress", "addressLocality": property.location, "addressCountry": "KE" }
}
```

---

### 5.4 Site Visit Booking Page (`/site-visit`)

- Headline: `"Book a Free Site Visit"`
- Short intro: what to expect on the visit
- `SiteVisitForm`:
  - Full Name (required)
  - Phone Number (required)
  - Email (optional)
  - Which property / development interested in (dropdown from Sanity properties)
  - Preferred visit date (date picker)
  - How did you hear about us? (dropdown: WhatsApp, Facebook, Friend/Family, Google, TikTok, Other)
  - Message (optional)
- Below form: `"Prefer to call? +254 XXX XXX XXX"` and `"Chat on WhatsApp"` link

---

### 5.5 About Page (`/about`)

- Company mission and story paragraph
- Team section (if team photos provided)
- Values: 3 pillars (Integrity, Affordability, Quality)
- Registration / compliance info (company registration number, location)
- Google Maps embed of office

---

### 5.6 Blog Page (`/blog`)

- Grid of blog post cards: main image, category badge, title, excerpt, date, `[Read More →]`
- Individual post (`/blog/[slug]`): full Portable Text render, related posts at bottom

---

### 5.7 FAQs Page (`/faqs`)

- Accordion component (Framer Motion `AnimatePresence` for smooth open/close)
- Pre-populate with at minimum:
  - How do I know the title deeds are genuine?
  - What payment plans are available?
  - Can I visit a site before buying?
  - Do you help with financing?
  - What areas do you operate in?
  - How long does the purchase process take?

---

## 6. Components — Key Implementation Notes

### `Navbar.tsx`
- Transparent on homepage hero, solid `forest` green on scroll (`useScroll` + `useMotionValueEvent`)
- Mobile: hamburger → full-screen drawer (`AnimatePresence`, slides in from right)
- Logo: white SVG on transparent/dark nav, coloured SVG on solid white nav
- Active link: underline with `earth` gold colour
- Nav items: Projects, Site Visit, About, Blog, FAQs
- Right side: phone number (desktop only) + `[Book a Visit]` button

### `WhatsAppButton.tsx`
- Fixed bottom-right, `z-50`
- WhatsApp green `#25D366` background, white WhatsApp icon
- Subtle pulse animation (Framer Motion keyframes, 2s loop, `scale: [1, 1.08, 1]`)
- Tooltip on hover: `"Chat with us"`
- Link: `https://wa.me/2547XXXXXXXX?text=Hi%2C%20I'm%20interested%20in%20your%20properties`
- On mobile: always visible. On desktop: visible after 3s delay on page load

### `PropertyCard.tsx`
```tsx
// Props
interface PropertyCardProps {
  title: string
  slug: string
  status: 'For Sale' | 'Sold' | 'Coming Soon'
  type: string
  location: string
  size: string
  priceLabel: string
  mainImage: SanityImageSource
  featured?: boolean
}
// Status badge colours:
// 'For Sale'     → bg-forest text-white
// 'Sold'         → bg-slate text-white  
// 'Coming Soon'  → bg-earth text-ink
```

### `EnquiryForm.tsx`
- Use `react-hook-form` for validation
- Submit to Formspree endpoint (ID from `siteSettings`)
- Phone field: validate Kenyan format (`/^(\+?254|0)[17]\d{8}$/`)
- Loading state on submit button
- Never clear form on error — preserve user input

### `ImageGallery.tsx`
- Main image with `next/image`, `fill` layout, `objectFit: cover`
- Thumbnail row below — clicking swaps main image
- Lightbox: simple modal with prev/next arrows, keyboard navigation (ArrowLeft/Right, Escape)
- Framer Motion: `AnimatePresence` fade between images

---

## 7. GROQ Queries (`sanity/lib/queries.ts`)

```ts
// All published properties
export const ALL_PROPERTIES_QUERY = groq`
  *[_type == "property"] | order(publishedAt desc) {
    _id, title, slug, status, type, location, size, priceLabel, price,
    mainImage, featured, publishedAt
  }
`

// Featured properties for homepage
export const FEATURED_PROPERTIES_QUERY = groq`
  *[_type == "property" && featured == true] | order(publishedAt desc)[0...6] {
    _id, title, slug, status, type, location, size, priceLabel,
    mainImage
  }
`

// Single property by slug
export const PROPERTY_BY_SLUG_QUERY = groq`
  *[_type == "property" && slug.current == $slug][0] {
    _id, title, slug, status, type, location, address, coordinates,
    size, price, priceLabel, description, features, mainImage, gallery,
    publishedAt
  }
`

// All testimonials
export const TESTIMONIALS_QUERY = groq`
  *[_type == "testimonial"] | order(order asc) {
    _id, name, role, photo, quote, rating
  }
`

// Blog posts
export const BLOG_POSTS_QUERY = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id, title, slug, excerpt, mainImage, publishedAt, category
  }
`

// Site settings (singleton)
export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0] {
    whatsappNumber, phoneNumber, email, officeAddress,
    facebook, instagram, tiktok, formspreeId
  }
`
```

---

## 8. Vercel & Next.js Config

### `next.config.ts`
```ts
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' }
    ]
  }
}
```

> **Note on Sanity Studio:** The Studio route works in the standard Vercel deployment and should remain in the same app. The app does not need a static export.

---

## 9. Environment Variables

```bash
# .env.local
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_READ_TOKEN=your_read_token        # For ISR / on-demand revalidation (future)

NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FORMSPREE_ID=your_formspree_id
NEXT_PUBLIC_WHATSAPP_NUMBER=254700000000    # No + prefix
NEXT_PUBLIC_SITE_URL=https://www.ukooafricahomes.co.ke
```

---

## 10. SEO Checklist (Implement on Every Page)

- [ ] Unique `<title>` tag — never "My front page"
- [ ] Unique `<meta name="description">` — 150–160 characters
- [ ] `<meta property="og:image">` — use `/public/og-image.jpg` (1200×630) as default
- [ ] Canonical URL
- [ ] `robots.txt` — allow all, disallow `/studio/`
- [ ] `sitemap.xml` — auto-generated via `next-sitemap`, include all property slugs
- [ ] JSON-LD: `RealEstateListing` on property pages, `LocalBusiness` on homepage
- [ ] `alt` text on every `<Image>` — descriptive, not "image1.jpg"
- [ ] `lang="en"` on `<html>`
- [ ] Google Search Console — verify domain, submit sitemap

---

## 11. Accessibility

- All interactive elements keyboard-focusable with visible focus ring (`outline-2 outline-earth outline-offset-2`)
- Color contrast: all text must pass WCAG AA (use `forest` on `stone`, `chalk` on `forest`)
- `aria-label` on icon-only buttons (WhatsApp button, gallery arrows, mobile menu toggle)
- Framer Motion: wrap all animations in `useReducedMotion()` check
- Form fields: always have associated `<label>`, error messages use `aria-describedby`
- Images: meaningful `alt` text; decorative images get `alt=""`

---

## 12. Performance Targets

| Metric | Target |
|---|---|
| Lighthouse Performance (mobile) | ≥ 90 |
| Lighthouse SEO | ≥ 95 |
| Lighthouse Accessibility | ≥ 90 |
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Total Blocking Time | < 200ms |
| Image format | WebP via Sanity CDN |
| Fonts | Self-hosted via `next/font`, no CLS |

---

## 13. Content to Migrate from Old Site

The following content exists on the current WordPress site and must be carried over:

### Properties (from WooCommerce products):
- Investment Packages for Diaspora & Groups — KSh 6,500,000
- House Construction Packages — KSh 35,000
- Commercial Plots — KSh 10,000,000
- Residential Plots in Controlled Developments — KSh 3,000,000
- Residential Homes for Sale — KSh 6,500,000

### Testimonials:
- Nyambura Kibugu (Quantity Surveyor)
- Stephen Kagai (Banker – Credit Section)
- Sieva Owendi (Home Owner)

### Pages to recreate:
- About, Blog, FAQs, Privacy Policy, Terms

### URLs to redirect (301) on the live site:
```
/product/investment-packages-for-diaspora-groups/ → /projects/investment-packages-diaspora-groups
/product/house-construction-packages/              → /projects/house-construction-packages
/product/commercial-plots/                         → /projects/commercial-plots
/product/residential-plots-in-controlled-developments/ → /projects/residential-plots
/product/residential-homes-for-sale/              → /projects/residential-homes
/my-blog-page/                                     → /blog
/my-account/                                       → /
/site-visit/                                       → /site-visit
```

---

## 14. Development Order (Recommended)

Build in this order to unblock progress at each stage:

1. **Project scaffold** — `npx create-next-app@latest`, install Tailwind, Framer Motion, Lucide, configure `tailwind.config.ts` with design tokens
2. **Sanity setup** — `npm create sanity@latest`, define all schemas, seed with existing property data
3. **Layout components** — `Navbar`, `Footer`, `WhatsAppButton`
4. **Homepage** — Hero → StatsBar → FeaturedProperties → Services → Testimonials → CTA
5. **Projects listing page** — PropertyCard, PropertyGrid, PropertyFilter
6. **Property detail page** — ImageGallery, EnquiryForm, JSON-LD
7. **Site Visit form page**
8. **About, Blog, FAQs pages**
9. **SEO** — metadata, sitemap, robots.txt, JSON-LD
10. **Vercel project config** — environment variables, custom domain, production deploy
11. **DNS** — configure HostPinnacle custom domain routing and SSL
12. **QA** — Lighthouse audit, mobile test, form submission test, all redirects verified

---

## 15. Handover Checklist

Before handing to client:

- [ ] Sanity Studio deployed at `studio.ukooafricahomes.co.ke`
- [ ] Client admin account created in Sanity with Editor role
- [ ] CMS walkthrough video recorded (add/edit/remove property, mark as sold)
- [ ] All 5 original properties migrated into Sanity with photos
- [ ] All 3 testimonials in Sanity
- [ ] Vercel production deployment live with custom domain and SSL ✅
- [ ] All old WordPress URLs redirect correctly (test each one)
- [ ] Google Analytics 4 property connected
- [ ] Google Search Console domain verified, sitemap submitted
- [ ] Formspree form tested — submission arrives in client email
- [ ] WhatsApp button tested — opens correct number with pre-filled message
- [ ] `.env.local` values stored securely (share via password manager, not email)
- [ ] GitHub repo access transferred or shared with client (optional)

---

*End of specification. Build exactly as described. When in doubt, refer back to Section 2 (Design System) and Section 5 (Page Specs) before making any assumptions.*
