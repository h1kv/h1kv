# Authoring guide

How to add and edit content on this site. Everything is Markdown files plus one
config file — no database, no admin panel.

- Run `npm run dev` and leave it running; the browser refreshes as you save.
- Content lives in `src/content/<section>/`.
- The site's structure (name, bio, nav, sections) lives in `src/config/site.ts`.

---

## The four section types

Each entry in `src/config/site.ts` → `sections` has a `type`. The type decides
how that section renders — you never touch template code.

| type      | What it is                            | Example              | Per-entry page? |
| --------- | ------------------------------------- | -------------------- | --------------- |
| `writing` | Long-form posts, dated index          | Essays, Notes        | Yes             |
| `list`    | Short entries on one page             | Bookshelf, Questions | No              |
| `page`    | A single standalone page              | About, Now           | n/a             |

---

## Add an essay (a `writing` post)

1. Create a file in the section's folder, e.g. `src/content/essays/my-idea.md`.
   The filename (minus `.md`) becomes the URL: `/essays/my-idea`.
2. Add frontmatter + your Markdown:

   ```markdown
   ---
   title: 'My idea'
   date: 2026-07-11
   description: 'Optional one-liner used for search/preview meta tags.'
   draft: false # set true to keep it hidden from the site
   ---

   Write the post in Markdown here.
   ```

3. Save. It appears at the top of `/essays/` (sorted newest first) and in
   "Recent writing" on the homepage.

**Fields:** `title` (required), `date` (required), `description` (optional),
`draft` (optional, default `false`).

---

## Add a bookshelf / questions entry (a `list` entry)

`list` entries are just frontmatter — no body needed. One file per entry.

Example `src/content/bookshelf/dune.md`:

```markdown
---
title: 'Dune' # required
url: 'https://…' # optional — makes the title a link
meta: 'Frank Herbert · ★★★★★' # optional — shown next to the title
note: 'One-line thought about it.' # optional — shown underneath
---
```

A questions entry can be just a title:

```markdown
---
title: 'A question I keep thinking about?'
---
```

All entries in the folder show together on the section's page (e.g.
`/bookshelf/`). If a `date` is present they sort newest first; otherwise they
keep file order.

---

## Edit a single page (a `page` section, e.g. About)

A `page` section renders one Markdown file. Edit its body directly:

- About lives at `src/content/about/index.md`.
- The heading comes from the section's `title` in `site.ts`; the body is
  whatever Markdown you write in the file.

---

## Add a whole new section

Three small steps. No template code changes.

1. **`src/config/site.ts`** — add one line to `sections`. Pick a `type`:

   ```ts
   { title: 'Now',   slug: 'now',   type: 'page' },     // single page
   { title: 'Links', slug: 'links', type: 'list' },     // list of entries
   { title: 'Notes', slug: 'notes', type: 'writing' },  // dated posts
   ```

2. **`src/content.config.ts`** — add one matching line to `collections`, using
   the helper for that type:

   ```ts
   now: page('now'),
   links: list('links'),
   notes: writing('notes'),
   ```

3. **Create the folder** `src/content/<slug>/` and add Markdown files:
   - `page`  → a single `index.md`
   - `list`  → one file per entry
   - `writing` → one file per post

**Keep the three names identical** — the `slug` in `site.ts`, the key in
`content.config.ts`, and the folder name under `src/content/`. That's the whole
contract: the nav link, the `/slug/` URL, and the pages all wire up
automatically.

To **reorder** the nav, reorder the `sections` array. To **remove** a section,
delete its line in both config files (and optionally its content folder).

---

## Add your photo

1. Drop an image in `public/`, e.g. `public/me.jpg`.
2. In `src/config/site.ts` set `avatar: '/me.jpg'`. Leave it `''` to hide.

---

## Publish

```bash
npm run build     # outputs a static site to ./dist
```

Set your real domain in `astro.config.mjs` (the commented `site:` line) before
building so URLs and meta tags are correct. Host `./dist` anywhere static
(Vercel, Netlify, GitHub Pages, Cloudflare Pages).
