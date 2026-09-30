import {defineArrayMember, defineField, defineType} from 'sanity'

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog post',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'slug', type: 'slug', options: {source: 'title'}, validation: (rule) => rule.required()}),
    defineField({name: 'excerpt', type: 'text', rows: 3}),
    defineField({name: 'mainImage', type: 'image', options: {hotspot: true}}),
    defineField({name: 'body', type: 'array', of: [defineArrayMember({type: 'block'}), defineArrayMember({type: 'image', options: {hotspot: true}})]}),
    defineField({name: 'publishedAt', type: 'datetime'}),
    defineField({name: 'category', type: 'string', options: {list: ['Buying Guide', 'Market News', 'Company News', 'Tips']}}),
  ],
  preview: {select: {title: 'title', subtitle: 'category', media: 'mainImage'}},
})