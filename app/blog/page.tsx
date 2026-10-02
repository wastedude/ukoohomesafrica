/* eslint-disable @next/next/no-html-link-for-pages */
import { ArrowLeft, ArrowRight, CalendarDays } from "lucide-react";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { BLOG_POSTS_QUERY } from "@/sanity/lib/queries";

export default async function BlogPage() {
  const posts = await client.fetch(BLOG_POSTS_QUERY);

  return (
    <main className="min-h-screen bg-stone">
      <div className="bg-earth-light px-5 pb-20 pt-10 md:px-10 md:pb-28">
        <div className="mx-auto max-w-[1200px]">
          <a href="/" className="inline-flex items-center gap-2 text-sm text-forest"><ArrowLeft size={15} /> Back home</a>
          <p className="mt-20 text-xs font-semibold uppercase tracking-[0.18em] text-canopy">The Ukoo journal</p>
          <h1 className="mt-5 font-display text-5xl leading-none text-forest md:text-7xl">Useful things<br /><em className="text-earth">to know.</em></h1>
        </div>
      </div>
      <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-10 md:py-24">
        <div className="grid gap-6 md:grid-cols-3">
          {(posts as any[]).map((post) => {
            const imageUrl = post.mainImage ? urlFor(post.mainImage).width(900).url() : "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80";
            const publishedAt = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-KE", { year: "numeric", month: "long", day: "numeric" }) : "Recently";

            return (
              <article key={post._id} className="overflow-hidden rounded-lg bg-chalk">
                <div className="aspect-[1.5] bg-cover bg-center" style={{ backgroundImage: `url(${imageUrl})` }} />
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-canopy">{post.category || "Buying Guide"}</p>
                  <h2 className="mt-3 font-display text-2xl leading-tight text-forest">{post.title}</h2>
                  <p className="mt-4 flex items-center gap-2 text-xs text-slate"><CalendarDays size={14} className="text-earth" /> {publishedAt}</p>
                  <p className="mt-4 text-sm leading-6 text-slate">{post.excerpt || "Helpful guidance for making confident property decisions."}</p>
                  <a href={`/blog/${post.slug?.current ?? post._id}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-forest">Read more <ArrowRight size={15} /></a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
