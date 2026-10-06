import { groq } from "next-sanity";

export const ALL_PROPERTIES_QUERY = groq`*[_type == "property"] | order(publishedAt desc) { _id, title, slug, status, type, location, size, priceLabel, price, mainImage, featured, publishedAt }`;
export const PROPERTY_BY_SLUG_QUERY = groq`*[_type == "property" && slug.current == $slug][0] { _id, title, slug, status, type, location, address, coordinates, size, price, priceLabel, description, features, mainImage, gallery, publishedAt }`;
export const TESTIMONIALS_QUERY = groq`*[_type == "testimonial"] | order(order asc) { _id, name, role, photo, quote, rating }`;
export const BLOG_POSTS_QUERY = groq`*[_type == "blogPost"] | order(publishedAt desc) { _id, title, slug, excerpt, mainImage, publishedAt, category }`;
export const BLOG_POST_SLUGS_QUERY = groq`*[_type == "blogPost" && defined(slug.current)] { _id, slug }`;
export const SITE_SETTINGS_QUERY = groq`*[_type == "siteSettings"][0] { whatsappNumber, phoneNumber, email, officeAddress, linkedin, facebook, instagram, tiktok, formspreeId }`;