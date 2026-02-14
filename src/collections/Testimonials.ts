import type { CollectionConfig } from "payload";

const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'author',
    defaultColumns: ['author', 'rating', 'featured', 'publishedDate'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => user?.role === 'admin',
    update: ({ req: { user } }) => user?.role === 'admin',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'author',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'rating',
      type: 'number',
      required: false,
      defaultValue: 5,
      min: 1,
      max: 5,
      admin: {
        step: 1,
      },
    },
    {
      name: 'source',
      type: 'text',
      required: false,
      description: 'Media outlet names like "Chilango", "La Verdad Noticias"',
    },
    {
      name: 'publishedDate',
      type: 'date',
      required: true,
    },
    {
      name: 'featured',
      type: 'checkbox',
      required: false,
      defaultValue: false,
    },
  ],
};

export default Testimonials;