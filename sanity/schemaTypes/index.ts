import { type SchemaTypeDefinition } from 'sanity'
import { blogPost } from './blogPost'
import { property } from './property'
import { siteSettings } from './siteSettings'
import { testimonial } from './testimonial'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [property, testimonial, blogPost, siteSettings],
}
