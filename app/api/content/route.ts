import { NextResponse } from "next/server";

import { client } from "@/sanity/lib/client";
import { ALL_PROPERTIES_QUERY, SITE_SETTINGS_QUERY, TESTIMONIALS_QUERY } from "@/sanity/lib/queries";

export const dynamic = "force-dynamic";

export async function GET() {
  const [properties, testimonials, settings] = await Promise.all([
    client.fetch(ALL_PROPERTIES_QUERY),
    client.fetch(TESTIMONIALS_QUERY),
    client.fetch(SITE_SETTINGS_QUERY),
  ]);

  return NextResponse.json({ properties, testimonials, settings });
}
