import { buildConfig } from "payload";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import path from "path";
import { fileURLToPath } from "url";
import * as dotenv from 'dotenv';

// Plugins
import { slateEditor } from "@payloadcms/richtext-slate";
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import sharp from 'sharp';

// Collections
import Users from "./collections/Users";
import Products from "./collections/Products";
import Media from "./collections/Media";
import Orders from "./collections/Orders";
import Boxes from "./collections/Boxes";
import Categories from "./collections/Categories";
import Clients from "./collections/Clients";
import Coupons from "./collections/Coupons";
import Testimonials from "./collections/Testimonials";
import FAQs from "./collections/FAQs";

// Globals
import MinimumStock from "./globals/MinimumStock";
import Metro from "./globals/Metro";
import SiteSettings from "./globals/SiteSettings";

// Import the nodemailer adapter
// import { nodemailerAdapter } from '@payloadcms/email-nodemailer';
// Import the resend adapter
import { resendAdapter } from '@payloadcms/email-resend';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET,
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  admin: {
    user: Users.slug,
  },
  editor: lexicalEditor(),
  collections: [
    Users,
    Products,
    Orders,
    Coupons,
    Media,
    Boxes,
    Categories,
    Clients,
    Testimonials,
    FAQs,
  ],
  globals: [MinimumStock, Metro, SiteSettings],
  // Use the nodemailer adapter
  // email: nodemailerAdapter({
  //   defaultFromAddress: process.env.EMAIL_CONTACTO,
  //   defaultFromName: 'Sticky Covers',
  //   transportOptions: {
  //     host: 'smtp.gmail.com',
  //     auth: {
  //       user: process.env.EMAIL_CONTACTO,
  //       // Add password if required by Gmail/SMTP provider
  //       pass: process.env.GMAIL_APP_PASSWORD,
  //     },
  //     // port: 587, // Check Gmail requirements
  //     // secure: false, // Use true for port 465, false for other ports
  //   },
  // }),
  // Use the resend adapter
  email: resendAdapter({
    defaultFromAddress: process.env.EMAIL_CONTACTO, // Use your verified Resend domain email
    defaultFromName: 'Sticky Covers',
    apiKey: process.env.RESEND_API_KEY,
  }),
  onInit: async (payload) => {
    payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
  },
  upload: {
    limits: {
      fileSize: 5000000, // 5MB en bytes
    },
  },
  plugins: [
  ],
  cors: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "https://dev.stickycovers.com",
    "https://www.stickycovers.com",
    "https://stickycovers.com",
  ],
  csrf: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "https://dev.stickycovers.com",
    "https://www.stickycovers.com",
    "https://stickycovers.com",
  ],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI,
  }),
  sharp: sharp,
});
