import {defineField, defineType} from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({name: 'name', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'role', type: 'string', description: 'For example: Quantity Surveyor or Home Owner'}),
    defineField({name: 'photo', type: 'image', options: {hotspot: true}}),
    defineField({name: 'quote', type: 'text', rows: 4, validation: (rule) => rule.required()}),
    defineField({name: 'rating', type: 'number', validation: (rule) => rule.min(1).max(5)}),
    defineField({name: 'order', type: 'number', description: 'Display order'}),
  ],
  preview: {select: {title: 'name', subtitle: 'role', media: 'photo'}},
})