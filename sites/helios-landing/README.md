# Personal site

A minimal, text-first personal website — the structure and feel of a classic
personal site (homepage + linked sections like Essays, Bookshelf, Questions),
built with [Astro](https://astro.build). Ships zero JavaScript; loads instantly.

## Run it

```bash
npm install
npm run dev      # local dev server at http://localhost:4321
npm run build    # static site → ./dist
npm run preview  # serve the built ./dist locally
```

## How it's organized

```
src/
  config/site.ts        ← your name, bio, and the section list (edit this most)
  content.config.ts     ← the schema for each section
  content/
    essays/*.md         ← "writing" section: each file becomes its own page
    bookshelf/*.md      ← "list" section: entries shown together on one page
    questions/*.md      ← "list" section
  layouts/Base.astro    ← the page shell (the narrow column + <Nav/>)
  components/Nav.astro   ← the header, generated from your section list
  pages/
    index.astro          ← homepage (bio + recent writing)
    [section]/index.astro   ← every section's list page (generic)
    [section]/[slug].astro  ← every writing post's page (generic)
  styles/global.css     ← all the styling (light + dark)
```

There are **three section types**, and they cover everything:

- **`writing`** — long-form posts. Each Markdown file becomes its own page, and
  the section shows a dated index. Use for essays, notes, etc.
- **`list`** — short entries rendered together on one page (no per-entry page).
  Use for a bookshelf, questions, links, etc.
- **`page`** — a single standalone page (one Markdown file). Use for About, Now,
  a colophon, etc.

> **Full authoring guide:** see [`docs/authoring.md`](docs/authoring.md) for
> step-by-step instructions on adding essays, list entries, pages, and whole new
> sections.

## Add a new post

Drop a new `.md` file into the section's folder.

**Writing post** (`src/content/essays/my-post.md`):

```markdown
---
title: 'My post title'
date: 2026-07-11
description: 'Optional one-liner for SEO / previews.'
draft: false # set true to hide it
---

Write in Markdown here.
```

**List entry** (`src/content/bookshelf/some-book.md`) — frontmatter only:

```markdown
---
title: 'The book / item title' # required
url: 'https://…' # optional — makes the title a link
meta: 'Author · ★★★★☆' # optional — shown next to the title
note: 'A short one-line note.' # optional — shown underneath
---
```

## Add a whole new section

Three small steps, no template code to touch:

1. **`src/config/site.ts`** — add a line to `sections`:
   ```ts
   { title: 'Links', slug: 'links', type: 'list' },
   ```
2. **`src/content.config.ts`** — add a matching line to `collections`:
   ```ts
   links: list('links'),
   ```
   (use `writing('links')` instead if it's a `writing` section)
3. Create the folder **`src/content/links/`** and add `.md` files.

Keep the three names identical: the `slug`, the collection key, and the folder
name. That's it — the nav, the URL (`/links/`), and the pages all appear
automatically.

## Before you deploy

Set your real domain in `astro.config.mjs` (the commented `site:` line) so URLs
and metadata are correct. `npm run build` outputs a plain static site to
`./dist` that you can host anywhere (Vercel, Netlify, GitHub Pages, Cloudflare
Pages, …).
