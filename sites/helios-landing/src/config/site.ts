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
//
//  To add a section you touch exactly 3 things:
//    1. add a line here,
//    2. add a matching line in src/content.config.ts,
//    3. create the folder src/content/<slug>/ with some .md files.
//  No template code changes needed. See README.md.
// ─────────────────────────────────────────────────────────────────────────────

export type SectionType = 'writing' | 'list' | 'page';

export type Section = {
  title: string;
  slug: string;
  type: SectionType;
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
  ],
};
