import type { CollectionConfig } from "payload";

const FAQs: CollectionConfig = {
  slug: 'faqs',
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'category', 'order', 'featured'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => user?.role === 'admin',
    update: ({ req: { user } }) => user?.role === 'admin',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
    },
    {
      name: 'answer',
      type: 'richText',
      required: true,
    },
    {
      name: 'order',
      type: 'number',
      required: false,
      defaultValue: 0,
      admin: {
        step: 1,
      },
    },
    {
      name: 'category',
      type: 'select',
      required: false,
      defaultValue: 'general',
      options: [
        { label: 'General', value: 'general' },
        { label: 'Shipping', value: 'shipping' },
        { label: 'Payment', value: 'payment' },
        { label: 'Products', value: 'products' },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      required: false,
      defaultValue: false,
    },
  ],
};

export default FAQs;