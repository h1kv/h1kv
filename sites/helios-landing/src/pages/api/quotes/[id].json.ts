import type { APIRoute } from 'astro';
import quotes from '../../../data/quotes.json';

// One endpoint per quote: /api/quotes/0.json, /api/quotes/1.json, ...
// Each returns only that single quote, so no endpoint exposes the whole list.
// Server-rendered: resolve the quote from the :id param, 404 if out of range.
export const GET: APIRoute = ({ params }) => {
  const id = Number(params.id);
  const quote = Number.isInteger(id) ? quotes[id] : undefined;
  if (quote === undefined) {
    return new Response(JSON.stringify({ error: 'not found' }), {
      status: 404,
      headers: { 'content-type': 'application/json; charset=utf-8' },
    });
  }
  return new Response(JSON.stringify({ quote }), {
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
};
