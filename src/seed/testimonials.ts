import { getPayload } from 'payload';
import config from '../payload.config';

const testimonials = [
  {
    author: 'Chilango',
    content: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [{ text: 'En esta página stickycovers.com puedes encontrar diferentes diseños de stickers para la tarjeta del Metro y otros más. Podrás personalizar tu tarjeta con tus personajes favoritos o con una imagen tuya.' }]
          }
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1
      }
    },
    rating: 5,
    source: 'Chilango',
    publishedDate: new Date('2024-01-01'),
    featured: true,
    avatar: 'https://res.cloudinary.com/dbrfcwdnb/image/upload/v1708123456/testimonials/chilango-logo.png',
  },
  {
    author: 'La Verdad Noticias',
    content: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [{ text: 'Sticky Covers ofrece la personalización más creativa para tus tarjetas bancarias y de transporte. Con diseños únicos que reflejan tu estilo personal.' }]
          }
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1
      }
    },
    rating: 5,
    source: 'La Verdad Noticias',
    publishedDate: new Date('2024-01-15'),
    featured: true,
    avatar: 'https://res.cloudinary.com/dbrfcwdnb/image/upload/v1708123456/testimonials/laverdad-logo.png',
  },
  {
    author: 'Ethian O.',
    content: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [{ text: 'La experiencia de entrega fue excelente. Los stickers llegaron en perfectas condiciones y exactamente como los quería. ¡Totalmente satisfecho con el servicio!' }]
          }
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1
      }
    },
    rating: 5,
    publishedDate: new Date('2024-02-01'),
    featured: false,
    avatar: 'https://res.cloudinary.com/dbrfcwdnb/image/upload/v1708123456/testimonials/ethian-avatar.jpg',
  },
  {
    author: 'Paula R.',
    content: {
      root: {
        type: 'root',
        children: [
          {
            type: 'paragraph',
            children: [{ text: 'Me encantan🥰🥰🥰. Están divinaaaasss' }]
          }
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1
      }
    },
    rating: 5,
    publishedDate: new Date('2024-02-10'),
    featured: true,
    avatar: 'https://res.cloudinary.com/dbrfcwdnb/image/upload/v1708123456/testimonials/paula-avatar.jpg',
  },
];

export async function seedTestimonials() {
  try {
    const payload = await getPayload({ config });

    console.log('🌱 Seeding testimonials...');

    for (const testimonial of testimonials) {
      // Check if testimonial already exists
      const existing = await payload.find({
        collection: 'testimonials',
        where: {
          author: { equals: testimonial.author }
        }
      });

      if (existing.docs.length > 0) {
        console.log(`⏭️  Testimonial for "${testimonial.author}" already exists, skipping...`);
        continue;
      }

      await payload.create({
        collection: 'testimonials',
        data: testimonial,
      });

      console.log(`✅ Created testimonial for "${testimonial.author}"`);
    }

    console.log('🎉 All testimonials seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding testimonials:', error);
    throw error;
  }
}

// Execute if run directly
if (process.argv[1].includes('testimonials.ts')) {
  seedTestimonials();
}