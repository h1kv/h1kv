import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  // Server-rendered so src/middleware.ts runs on every request (for IP logging).
  // On Vercel this deploys as a serverless/edge function per request.
  output: 'server',
  adapter: vercel(),

  // Set this to your real domain once deployed so canonical URLs/meta are correct.
  // site: 'https://your-domain.com',
});
