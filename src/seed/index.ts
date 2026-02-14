import { seedTestimonials } from './testimonials';
import { seedFAQs } from './faqs';
import { seedSiteSettings } from './site-settings';

console.log('🌱 Starting seed process...');

async function runSeeds() {
  try {
    console.log('\n📝 Step 1: Seeding testimonials...');
    await seedTestimonials();

    console.log('\n❓ Step 2: Seeding FAQs...');
    await seedFAQs();

    console.log('\n⚙️  Step 3: Seeding site settings...');
    await seedSiteSettings();

    console.log('\n🎉 All seeds completed successfully!');
  } catch (error) {
    console.error('\n❌ Seed process failed:', error);
    process.exit(1);
  }
}

runSeeds();