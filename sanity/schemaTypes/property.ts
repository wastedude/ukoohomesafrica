import {defineArrayMember, defineField, defineType} from 'sanity'

export const property = defineType({
  name: 'property',
  title: 'Property',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Property name', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'slug', title: 'URL slug', type: 'slug', options: {source: 'title'}, validation: (rule) => rule.required()}),
    defineField({name: 'status', title: 'Status', type: 'string', options: {list: ['For Sale', 'Sold', 'Coming Soon']}, validation: (rule) => rule.required()}),
    defineField({name: 'type', title: 'Property type', type: 'string', options: {list: ['Residential Home', 'Residential Plot', 'Commercial Plot', 'Investment Package']}, validation: (rule) => rule.required()}),
    defineField({name: 'price', title: 'Price (KSh)', type: 'number', validation: (rule) => rule.min(0)}),
    defineField({name: 'priceLabel', title: 'Price label', type: 'string', description: 'For example: From KSh 3M or KSh 6.5M'}),
    defineField({name: 'location', title: 'Location', type: 'string', options: {list: ['Juja', 'Thika', 'Ngoingwa', 'Thika Superhighway', 'Other']}, validation: (rule) => rule.required()}),
    defineField({name: 'address', title: 'Full address or description', type: 'string'}),
    defineField({name: 'coordinates', title: 'GPS coordinates', type: 'geopoint'}),
    defineField({name: 'size', title: 'Plot or house size', type: 'string'}),
    defineField({name: 'description', title: 'Description', type: 'array', of: [defineArrayMember({type: 'block'})]}),
    defineField({name: 'features', title: 'Key features', type: 'array', of: [defineArrayMember({type: 'string'})]}),
    defineField({name: 'mainImage', title: 'Main photo', type: 'image', options: {hotspot: true}, validation: (rule) => rule.required()}),
    defineField({name: 'gallery', title: 'Photo gallery', type: 'array', of: [defineArrayMember({type: 'image', options: {hotspot: true}})]}),
    defineField({name: 'featured', title: 'Featured on homepage', type: 'boolean', initialValue: false}),
    defineField({name: 'publishedAt', title: 'Date listed', type: 'datetime'}),
  ],
  preview: {select: {title: 'title', subtitle: 'location', media: 'mainImage'}},
})