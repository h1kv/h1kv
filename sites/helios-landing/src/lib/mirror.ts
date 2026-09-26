import { getCollection } from 'astro:content';

// Public read-only mirror of the blog for adam.lol. See /mirror/v1/api/posts.
// Drafts are never listed and never resolvable by slug.

export const SITE_ORIGIN = 'https://h1k.sh';

export type MirrorPostSummary = {
  slug: string;
  title: string;
  date: string;
  description: string | null;
  url: string;
};

export const getPublishedPosts = async () => {
  const entries = await getCollection('blog');
  return entries
    .filter((e) => !e.data.draft)
    .sort((a, b) => +b.data.date - +a.data.date);
};

export const summarize = (e: Awaited<ReturnType<typeof getPublishedPosts>>[number]): MirrorPostSummary => ({
  slug: e.id,
  title: e.data.title,
  date: e.data.date.toISOString().replace(/\.\d{3}Z$/, 'Z'),
  description: e.data.description ?? null,
  url: `${SITE_ORIGIN}/blog/${e.id}`,
});

const sha256 = async (s: string) => {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, '0')).join('');
};

const baseHeaders = {
  'content-type': 'application/json; charset=utf-8',
  'access-control-allow-origin': '*',
};

/**
 * 200 JSON with edge caching + ETag; answers 304 to a matching If-None-Match.
 * `etagSource` lets the caller hash only the stable part of the body (e.g. the
 * post list without its `generated` timestamp) so the tag survives across calls.
 */
export const jsonOk = async (request: Request, body: unknown, etagSource: unknown = body) => {
  const text = JSON.stringify(body);
  const etag = `"${(await sha256(JSON.stringify(etagSource))).slice(0, 32)}"`;
  const headers = {
    ...baseHeaders,
    'cache-control': 'public, s-maxage=300, stale-while-revalidate=3600',
    etag,
  };
  const inm = request.headers.get('if-none-match');
  if (inm && inm.split(',').some((t) => t.trim() === etag)) {
    return new Response(null, { status: 304, headers });
  }
  return new Response(text, { status: 200, headers });
};

export const jsonError = (status: number, error: string) =>
  new Response(JSON.stringify({ error }), {
    status,
    headers: { ...baseHeaders, 'cache-control': 'no-store' },
  });
