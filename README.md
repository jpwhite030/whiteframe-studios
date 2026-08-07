# Whiteframe Studios

Marketing site for Whiteframe Studios — an independent product studio founded
by Jack White, Sydney.

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Motion · Lenis · Lucide.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

## Structure

```
app/
  layout.tsx            Manrope, metadata, JSON-LD, Lenis + Motion providers
  page.tsx              homepage — composes the section components
  privacy/ terms/       minimal legal pages (linked from the footer)
  opengraph-image.png   static social card (twitter-image.png duplicates it)
  icon.png              static favicon
  robots.ts sitemap.ts  crawler files
  globals.css           design tokens, base styles, shell/label/grain utilities
components/             one file per section, plus shared primitives
data/                   projects, capabilities, process
lib/site-config.ts      copy, contact, navigation, socials, SEO strings
lib/lenis-provider.tsx  smooth scroll (off under prefers-reduced-motion)
```

Copy is data, not markup: edit `lib/site-config.ts` and `data/*` rather than
components.

## Design system

Premium monochrome, ~50% Bakken & Bæck / 35% Metalab / 15% Cuberto:

| Token | Value | Use |
| --- | --- | --- |
| `cream` / `cream-100` | `#f3f1eb` / `#eae7df` | page ground |
| `ink` / `ink-soft` / `ink-faint` | `#0d0d0d` / `#57544e` / `#8b877e` | text on light |
| `dark` / `dark-100` | `#0a0a0a` / `#141412` | founder band, CTA, footer |
| `light` / `light-soft` / `light-faint` | `#f5f3ee` … | text on dark |
| `cobalt` / `cobalt-600` | `#315cff` / `#2547d0` | the single accent |

Type: Manrope throughout (800 display, 500–700 UI). Product tiles carry the
colour; the page stays monochrome. A fixed `grain` overlay sits at 2.5%.

Signature pieces:

- **Whiteframe Window** (`whiteframe-window.tsx`) — the hero's draggable,
  pointer-tilting white frame with layered product previews.
- **Project reel** (`project-reel.tsx`) — native horizontal scrolling with
  mouse drag-to-scroll layered on top, so wheel/touch/keyboard still work.
- **Navigation** — `mix-blend-difference` on the fixed header itself, so it
  inverts over dark sections with no scroll detection. The cobalt CTA lives
  in a separate non-blending fixed layer.
- **Studio statement** — scroll-scrubbed word reveal (rewinds on scroll-up).

All motion resolves instantly under `prefers-reduced-motion` (Lenis is never
created, MotionConfig strips transforms, a `noscript` rule uncovers
`data-reveal` content).

## Placeholder assets to replace

1. **Domain** — `siteConfig.url` (drives canonical, OG, sitemap, robots).
2. **Social handles** — `siteConfig.socials` point at unregistered accounts.
3. **Scaffold Visualiser & Seat View tiles** — coded mockups in
   `project-tile.tsx`; swap for real captures when the products have UI.
4. **Case-study links** — every project's `href` in `data/projects.ts` is
   null; set it and cards/blocks link through automatically.
5. **OG card** — `app/opengraph-image.png` is generated from the headline;
   regenerate if the headline changes (any 1200×630 PNG works).

## Gotchas

- `app/opengraph-image.png` and `app/icon.png` are static on purpose: the
  dynamic `ImageResponse` routes were unstable in dev on this machine
  (satori→sharp handoff). Don't reintroduce `.tsx` metadata images without
  checking `/icon?v=x` in dev.
- Never run `npm run build` while `next dev` is serving — they share `.next`
  and the dev server starts returning empty responses.
