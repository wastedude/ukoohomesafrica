# Ukoo Africa Homes

Ukoo Africa Homes is a Next.js real-estate marketing site for affordable homes and land in Kenya. The project uses the App Router, Tailwind CSS, Sanity CMS, and Vercel hosting.

## Stack

- Next.js 16
- TypeScript
- Tailwind CSS
- Sanity Studio
- Framer Motion
- Lucide React
- Vercel deployment

## Local development

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Required environment variables

Create a local `.env.local` file with values similar to:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_READ_TOKEN=your_read_token
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FORMSPREE_ID=your_formspree_id
NEXT_PUBLIC_WHATSAPP_NUMBER=254700000000
NEXT_PUBLIC_SITE_URL=https://www.ukooafricahomes.co.ke
```

## Sanity Studio

The Studio is available at:

```bash
/app/studio-ukoo-africa-homes/[[...tool]]/page.tsx
```

This can be deployed as part of the Vercel app or exposed under a studio subdomain if needed.

## Deployment to Vercel

1. Push the repository to GitHub.
2. Import the project into Vercel.
3. Set the same environment variables in the Vercel dashboard.
4. Use the default Next.js build settings.
5. Point the production domain to the Vercel deployment.

## Production notes

- Keep Sanity credentials in Vercel environment variables.
- Use the live site URL and WhatsApp number in the app metadata and contact CTAs.
- Ensure forms and analytics are configured before launch.

## Useful commands

```bash
npm run lint
npm run build
npm run start
```
