import { ArrowLeft } from "lucide-react";
import { PortableText } from "@portabletext/react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { BLOG_POSTS_QUERY } from "@/sanity/lib/queries";
import { SiteHeader } from "@/components/site-header";
import { absoluteUrl } from "@/lib/seo";

type BlogPostSummary = {
  _id: string;
  slug?: { current: string };
};

const POST_BY_SLUG_QUERY = `*[_type == "blogPost" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  body,
  mainImage,
  publishedAt,
  category
}`;

export async function generateStaticParams() {
  const posts = await client.fetch(BLOG_POSTS_QUERY);
  return (posts as BlogPostSummary[]).map((post) => ({ slug: post.slug?.current ?? post._id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch(POST_BY_SLUG_QUERY, { slug });

  return post
    ? {
        title: `${post.title} | Ukoo Africa Homes`,
        description: post.excerpt || "Read practical property insights from Ukoo Africa Homes.",
        alternates: { canonical: `/blog/${slug}` },
        openGraph: {
          title: post.title,
          description: post.excerpt || "Read our latest property insight.",
          url: absoluteUrl(`/blog/${slug}`),
          type: "article",
          publishedTime: post.publishedAt,
          images: post.mainImage
            ? [{ url: urlFor(post.mainImage).width(1200).url(), alt: post.title }]
            : [{ url: absoluteUrl("/TAG1.png"), alt: "Ukoo Africa Homes" }],
        },
      }
    : {};
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await client.fetch(POST_BY_SLUG_QUERY, { slug });

  if (!post) notFound();

  const imageUrl = post.mainImage ? urlFor(post.mainImage).width(1200).url() : "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80";
  const publishedAt = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-KE", { year: "numeric", month: "long", day: "numeric" }) : "Recently";

  return (
    <main className="min-h-screen bg-stone">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.excerpt,
        image: [imageUrl],
        datePublished: post.publishedAt,
        author: { "@type": "Organization", name: "Ukoo Africa Homes" },
        publisher: {
          "@type": "Organization",
          name: "Ukoo Africa Homes Ltd",
          logo: { "@type": "ImageObject", url: absoluteUrl("/TAG1.png") },
        },
        mainEntityOfPage: absoluteUrl(`/blog/${slug}`),
      }) }} />
      <SiteHeader />
      <div className="bg-earth-light px-5 pb-20 pt-10 md:px-10 md:pb-28">
        <div className="mx-auto max-w-[1200px]">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-forest"><ArrowLeft size={15} /> Back to blog</Link>
          <p className="mt-20 text-xs font-semibold uppercase tracking-[0.18em] text-canopy">{post.category || "Buying Guide"}</p>
          <h1 className="mt-5 max-w-[800px] font-display text-5xl leading-none text-forest md:text-7xl">{post.title}</h1>
          <p className="mt-5 text-sm text-slate">{publishedAt}</p>
        </div>
      </div>
      <article className="mx-auto max-w-[1000px] px-5 py-16 md:px-10 md:py-24">
        <div className="overflow-hidden rounded-lg bg-chalk">
          <div className="aspect-[16/9] bg-cover bg-center" style={{ backgroundImage: `url(${imageUrl})` }} />
        </div>
        <div className="mt-10 text-lg leading-8 text-slate">
          {post.body ? <PortableText value={post.body} /> : <p>{post.excerpt}</p>}
        </div>
      </article>
    </main>
  );
}
