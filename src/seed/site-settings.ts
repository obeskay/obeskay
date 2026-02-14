import config from '../payload.config'
import { getPayload } from 'payload'

export const seedSiteSettings = async () => {
  try {
    const payload = await getPayload({ config });

    await payload.updateGlobal({
      slug: 'site-settings',
      data: {
        siteName: 'Sticky Covers',
        siteDescription: 'Stickers para personalizar tarjetas de débito o del metro',
        logo: '', // Will be uploaded later
        favicon: '', // Placeholder
        socialLinks: {
          instagram: 'https://instagram.com/stickycovers',
          facebook: 'https://facebook.com/stickycovers',
          tiktok: 'https://tiktok.com/@stickycovers',
          whatsapp: '5215512345678'
        },
        contactEmail: 'hola@stickycovers.com',
        phoneNumber: '+52 55 1234 5678',
        seoKeywords: 'sticky covers, tarjetas personalizadas, calcomanías para tarjetas, stickers para tarjetas',
        announcementBanner: {
          enabled: false,
          message: '',
          link: ''
        }
      }
    })

    console.log('✅ SiteSettings seeded successfully')
  } catch (error) {
    console.error('❌ Error seeding SiteSettings:', error)
    throw error
  }
}

// Execute if run directly
if (process.argv[1].includes('site-settings.ts')) {
  seedSiteSettings()
}