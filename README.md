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

## Access the CMS

Start the app locally with `npm run dev`, then open the Sanity Studio in your browser:

```text
http://localhost:3000/studio-ukoo-africa-homes
```

Sign in with the Sanity account that has access to project `2551vm5m`. From the Studio sidebar you can manage:

- **Properties**: listings, prices, locations, descriptions, features, and images
- **Testimonials**: customer quotes, roles, ratings, and display order
- **Blog posts**: articles, excerpts, categories, dates, images, and body content
- **Site settings**: WhatsApp number, phone, email, office address, social links, and form settings

After publishing a change, refresh the website to see the updated CMS content. The frontend reads properties, testimonials, blog posts, and site settings from Sanity rather than from local content arrays.

When the app is deployed to Vercel, use the same path on the production domain:

```text
https://your-domain.com/studio-ukoo-africa-homes
```

Replace `your-domain.com` with the Vercel or custom domain assigned to the project.

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

The Studio route is available in the browser at:

```text
http://localhost:3000/studio-ukoo-africa-homes
```

The route implementation is located at `app/studio-ukoo-africa-homes/[[...tool]]/page.tsx`. It is deployed as part of the Next.js app and uses the Sanity project and dataset configured in `.env.local`.

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
