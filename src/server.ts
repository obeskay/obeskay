import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url'; // Import fileURLToPath

// Calculate __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables FIRST
dotenv.config({
  path: path.resolve(__dirname, '../.env'), // Use calculated __dirname
});

// THEN import other dependencies
import express from 'express';
import payload from 'payload'; // Static import
import config from './payload.config'; // Explicitly import config

const app = express();

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin');
});

const start = async () => {
  // Initialize Payload first
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    config,
    onInit: async (cms) => {
      cms.logger.info(`Payload Admin URL: ${cms.getAdminURL()}`);
    },
  });

  // Then attach Payload's Express middleware
  app.use(payload.express);

  // Add your own express routes here (ensure they don't conflict with Payload's routes)

  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    payload.logger.info(`Server started on http://localhost:${port}`);
  });
};

start();
