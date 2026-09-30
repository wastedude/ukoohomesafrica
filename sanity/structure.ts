import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('property').title('Properties'),
      S.documentTypeListItem('testimonial').title('Testimonials'),
      S.documentTypeListItem('blogPost').title('Blog posts'),
      S.divider(),
      S.listItem()
        .title('Site settings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
    ])
