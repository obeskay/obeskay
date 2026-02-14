import { GlobalConfig } from "payload/types";

const SiteSettingsConfig: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
    update: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      defaultValue: 'Sticky Covers',
      admin: {
        description: 'The main name of your website',
      },
    },
    {
      name: 'siteDescription',
      type: 'textarea',
      required: true,
      admin: {
        description: 'A brief description of your website',
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Upload your site logo',
      },
    },
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Upload your site favicon',
      },
    },
    {
      name: 'socialLinks',
      type: 'group',
      fields: [
        {
          name: 'facebook',
          type: 'text',
          required: false,
          admin: {
            description: 'Facebook page URL',
          },
        },
        {
          name: 'instagram',
          type: 'text',
          required: false,
          admin: {
            description: 'Instagram profile URL',
          },
        },
        {
          name: 'tiktok',
          type: 'text',
          required: false,
          admin: {
            description: 'TikTok profile URL',
          },
        },
        {
          name: 'whatsapp',
          type: 'text',
          required: false,
          admin: {
            description: 'WhatsApp phone number with country code',
          },
        },
      ],
      admin: {
        description: 'Social media links',
      },
    },
    {
      name: 'contactEmail',
      type: 'email',
      required: true,
      admin: {
        description: 'Primary contact email address',
      },
    },
    {
      name: 'phoneNumber',
      type: 'text',
      required: false,
      admin: {
        description: 'Primary contact phone number',
      },
    },
    {
      name: 'seoKeywords',
      type: 'text',
      required: false,
      admin: {
        description: 'SEO keywords separated by commas',
      },
    },
    {
      name: 'announcementBanner',
      type: 'group',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: false,
          required: true,
          admin: {
            description: 'Enable or disable the announcement banner',
          },
        },
        {
          name: 'text',
          type: 'textarea',
          required: false,
          admin: {
            description: 'Announcement text to display',
          },
        },
        {
          name: 'link',
          type: 'text',
          required: false,
          admin: {
            description: 'Optional link for the announcement',
          },
        },
        {
          name: 'backgroundColor',
          type: 'text',
          defaultValue: '#000000',
          required: true,
          admin: {
            description: 'Background color in hex format (e.g., #000000)',
          },
        },
        {
          name: 'textColor',
          type: 'text',
          defaultValue: '#ffffff',
          required: true,
          admin: {
            description: 'Text color in hex format (e.g., #ffffff)',
          },
        },
      ],
      admin: {
        description: 'Site-wide announcement banner settings',
      },
    },
  ],
};

const SiteSettings = SiteSettingsConfig;

export default SiteSettings;