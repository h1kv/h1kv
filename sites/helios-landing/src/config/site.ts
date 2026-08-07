// ─────────────────────────────────────────────────────────────────────────────
//  Site configuration — this is the main file you edit.
//
//  • Change your name / bio below.
//  • Add or remove a section by editing the `sections` array. Each section needs:
//        title  — what shows in the nav and as the page heading
//        slug   — the URL (/<slug>/) AND the content folder name
//                 (src/content/<slug>/) AND the collection name in
//                 src/content.config.ts. Keep all three the same.
//        type   — 'writing'  → long-form posts, each Markdown file is its own page
//                 'list'     → short entries shown together on one page
//                 'page'     → a single standalone page (e.g. About)
//                 'custom'   → a hand-built route under src/pages/<slug>/ (the
//                              dynamic section route skips these; you write the page)
//
//  To add a section you touch exactly 3 things:
//    1. add a line here,
//    2. add a matching line in src/content.config.ts,
//    3. create the folder src/content/<slug>/ with some .md files.
//  No template code changes needed. See README.md.
// ─────────────────────────────────────────────────────────────────────────────

export type SectionType = 'writing' | 'list' | 'page' | 'custom';

export type Section = {
  title: string;
  slug: string;
  type: SectionType;
  /** Optional line shown under the heading on a 'writing'/'list' index page. */
  intro?: string;
  /** Optional bold notes, each shown on its own line under the intro. */
  notes?: string[];
};

export type SiteConfig = {
  name: string;
  bio: string;
  email?: string;
  /** Optional. Put an image in /public and set e.g. '/me.jpg'. Leave '' to hide. */
  avatar?: string;
  sections: Section[];
};

export const site: SiteConfig = {
  name: 'Adam Bell',
  bio: "I'm Adam 👋",
  email: '',
  avatar: '',
  sections: [
    { title: 'About', slug: 'about', type: 'page' },
    { title: 'Advice', slug: 'advice', type: 'page' },
    { title: 'People', slug: 'people', type: 'page' },
    { title: 'Projects', slug: 'projects', type: 'page' },
    {
      title: 'Blog',
      slug: 'blog',
      type: 'writing',
      intro:
        "When I find the urge to post something I'll probably post it here. I do imagine that I'll cringe at some posts as time goes on. There are some private ones that I'm debating with myself: “Do I make these public?”",
      notes: [
        'FYI: some of the times are fucked. Blame that on my terrible system design back then.',
        'FYI 2: any post with [unredacted] used to be private.',
      ],
    },
    { title: 'Words from the world', slug: 'words', type: 'custom' },
  ],
};
