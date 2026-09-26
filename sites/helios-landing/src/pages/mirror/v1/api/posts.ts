import type { APIRoute } from 'astro';
import { getPublishedPosts, summarize, jsonOk, jsonError } from '../../../../lib/mirror';

// GET /mirror/v1/api/posts — every published post, newest first, no bodies.
export const GET: APIRoute = async ({ request }) => {
  try {
    const posts = (await getPublishedPosts()).map(summarize);
    return jsonOk(request, { generated: new Date().toISOString(), posts }, posts);
  } catch (err) {
    console.error('[mirror] list failed', err);
    return jsonError(503, 'unavailable');
  }
};
