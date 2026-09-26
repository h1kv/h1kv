import type { APIRoute } from 'astro';
import { getPublishedPosts, summarize, jsonOk, jsonError } from '../../../../../lib/mirror';

// GET /mirror/v1/api/posts/:slug — one post with raw markdown + rendered html.
// Drafts and unknown slugs both 404 identically.
export const GET: APIRoute = async ({ request, params }) => {
  try {
    const entry = (await getPublishedPosts()).find((e) => e.id === params.slug);
    if (!entry) return jsonError(404, 'not found');
    return jsonOk(request, {
      ...summarize(entry),
      markdown: entry.body ?? '',
      html: entry.rendered?.html ?? '',
    });
  } catch (err) {
    console.error('[mirror] post failed', err);
    return jsonError(503, 'unavailable');
  }
};
