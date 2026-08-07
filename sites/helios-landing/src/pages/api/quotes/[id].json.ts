import type { APIRoute, GetStaticPaths } from 'astro';
import quotes from '../../../data/quotes.json';

// One static file per quote: /api/quotes/0.json, /api/quotes/1.json, ...
// Each returns only that single quote, so no endpoint exposes the whole list.
export const getStaticPaths: GetStaticPaths = () =>
  quotes.map((quote, id) => ({ params: { id: String(id) }, props: { quote } }));

export const GET: APIRoute = ({ props }) =>
  new Response(JSON.stringify({ quote: (props as { quote: string }).quote }), {
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
