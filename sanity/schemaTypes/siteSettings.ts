import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({name: 'whatsappNumber', type: 'string', description: 'Format: 2547XXXXXXXX'}),
    defineField({name: 'phoneNumber', type: 'string'}),
    defineField({name: 'email', type: 'email'}),
    defineField({name: 'officeAddress', type: 'string'}),
    defineField({name: 'facebook', type: 'url'}),
    defineField({name: 'instagram', type: 'url'}),
    defineField({name: 'tiktok', type: 'url'}),
    defineField({name: 'formspreeId', type: 'string'}),
  ],
})