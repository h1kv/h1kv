import { defineMiddleware } from 'astro:middleware';

// Runs at the Vercel edge on every request (deployed via edgeMiddleware in
// astro.config). Logs one JSON line per page/route view to Vercel's runtime
// logs — filter them in the Vercel dashboard by the "[x-ip]" tag.
//
// Privacy note: this records visitor IP + coarse geo. IPs are personal data
// under GDPR. Retention is whatever Vercel's log retention is for your plan;
// nothing is stored by us beyond the log line.
export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);
  const path = url.pathname;

  // Only log real page/route views: skip static assets (anything with a file
  // extension, e.g. .css/.js/.png/.json) and Astro internals (/_astro, /_image).
  const isAsset = /\.[a-z0-9]+$/i.test(path) || path.startsWith('/_');
  if (!isAsset) {
    const h = context.request.headers;
    const ip =
      (h.get('x-forwarded-for') || '').split(',')[0].trim() ||
      h.get('x-real-ip') ||
      'unknown';
    const city = h.get('x-vercel-ip-city');

    console.log(
      '[x-ip]',
      JSON.stringify({
        t: new Date().toISOString(),
        ip,
        path,
        country: h.get('x-vercel-ip-country') || '',
        region: h.get('x-vercel-ip-country-region') || '',
        city: city ? decodeURIComponent(city) : '',
        ua: h.get('user-agent') || '',
        ref: h.get('referer') || '',
      })
    );
  }

  return next();
});
