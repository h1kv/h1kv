import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// ─────────────────────────────────────────────────────────────────────────────
//  Content collections. Each key here must match a section `slug` in
//  src/config/site.ts and a folder name under src/content/.
//
//  Two reusable helpers cover every section type:
//    writing(...) → long-form posts (frontmatter + Markdown body → its own page)
//    list(...)    → short entries (frontmatter only, rendered together on a page)
//
//  Adding a section = add ONE line to the `collections` object below.
// ─────────────────────────────────────────────────────────────────────────────

const writingSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  description: z.string().optional(),
  draft: z.boolean().default(false),
});

const listSchema = z.object({
  title: z.string(),
  date: z.coerce.date().optional(),
  url: z.string().url().optional(),
  meta: z.string().optional(), // e.g. author, rating, source
  note: z.string().optional(), // a short one-line note
});

const pageSchema = z.object({
  title: z.string().optional(), // falls back to the section title in the nav
});

const writing = (folder: string) =>
  defineCollection({
    loader: glob({ pattern: '**/*.md', base: `./src/content/${folder}` }),
    schema: writingSchema,
  });

const list = (folder: string) =>
  defineCollection({
    loader: glob({ pattern: '**/*.md', base: `./src/content/${folder}` }),
    schema: listSchema,
  });

const page = (folder: string) =>
  defineCollection({
    loader: glob({ pattern: '**/*.md', base: `./src/content/${folder}` }),
    schema: pageSchema,
  });

export const collections = {
  about: page('about'),
  advice: page('advice'),
  people: page('people'),
  projects: page('projects'),
  blog: writing('blog'),
};
