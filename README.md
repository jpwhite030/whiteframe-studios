# Whiteframe Studios

Marketing site for Whiteframe Studios — an independent software and product
studio founded by Jack White.

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Motion · Lucide.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

## Structure

```
app/
  layout.tsx            fonts, metadata, JSON-LD, motion config
  page.tsx              homepage — composes the section components
  opengraph-image.tsx   generated 1200x630 social card (twitter-image re-exports it)
  icon.tsx              generated favicon
  robots.ts sitemap.ts  crawler files
  globals.css           design tokens, base styles, `shell` / `label` / `rule-grid` utilities
components/             one file per section, plus shared primitives
data/                   projects, services, process, studio copy, enquiry options
lib/site-config.ts      name, contact, navigation, socials, SEO strings
```

Copy is data, not markup: change `lib/site-config.ts` and `data/*` rather than
editing components.

## Design system

Defined once as Tailwind theme tokens in `app/globals.css`:

The site runs on a dark canvas; the work panels are light surfaces so they read
as lit screens against it. Both scales are defined together:

| Token | Value | Use |
| --- | --- | --- |
| `canvas` / `canvas-100` / `canvas-200` | `#0f0e0c` to `#201e1a` | page and raised surfaces |
| `bone` / `bone-700` | `#f4f1ea` / `#cbc6bc` | primary text |
| `muted` / `faint` | `#928c81` / `#6a655c` | secondary text and meta |
| `line` / `line-strong` | `#2b2926` / `#423f3a` | hairline rules and borders |
| `paper` / `paper-100` / `paper-200`, `ink`, `paper-line` | light scale | inside the product panels only |
| `accent` / `accent-deep` | `#7189ff` / `#3b54e0` | the single accent; `-deep` carries light text |

Type: Archivo (display), Instrument Sans (body), Instrument Serif italic (one
editorial moment in the founder section), JetBrains Mono (labels and numbers).
Layout: `shell` sets the page gutter; sections align to a 12-column grid. A
fixed `grain` overlay sits above everything at 4% — flat dark surfaces this
large read as machine-made without it.

Sections deliberately do not share one arrangement. `SectionHeading` has three
variants (`stacked`, `margin`, `display`) and project blocks have three layouts
(`standard`, `bleed`, `full`) with five frame proportions, set per project in
`data/projects.ts`. A repeated frame is what makes a site look like a template.

## The Living Frame

The hero's signature visual — `components/living-frame.tsx`, with its scenes in
`data/frame-scenes.ts`. A white frame that fills itself in: empty rectangle,
rough wireframe boxes drifting off-position, boxes snapping onto the grid, then
the same boxes resolving into a working product screen. The studio's argument
told by the mechanism itself.

How it works:

- **One structure per project.** A scene is a list of rectangles on a 0–100
  grid. The animation reads each rectangle twice — once as a dashed wireframe
  box offset by its `drift`, once as finished interface via the `kind`
  renderer. Adding a project means adding data, not animation.
- **Stages** are declared in `STAGES`: empty → wireframe → aligning → build →
  shipped → handover, about 13.4s a cycle, then it advances to the next
  project. The current stage is printed beside the frame as a readout.
- **Layers.** Each element has `layer` 0–2, and the three groups take different
  parallax speeds against the pointer. Rotation is capped at 2.4°.
- **`essential`** marks the elements kept below `md`; the rest are dropped so
  the mobile frame stays legible rather than shrunk.
- **`diagram: true`** draws connectors between elements during the wireframe
  stages — the "system diagram" step, currently used by Meridian.
- Reduced motion pins the stage to `shipped` and disables the sequence and
  parallax entirely. The preference is read through `useSyncExternalStore` so
  the first render matches the server.
- Numbered controls select a project directly and restart the cycle; on touch,
  swipe left/right steps between projects and a tap advances.

The frame is the brand asset: crisp white rules, corner ticks, a design grid,
and technical annotations, sized against the copy column at roughly 48% of the
hero.

## Things to replace before launch

1. **Domain** — `siteConfig.url` in `lib/site-config.ts` (drives canonical, OG,
   sitemap and robots).
2. **Social handles** — `siteConfig.socials`, currently placeholder URLs.
3. **Enquiry form transport** — `submitEnquiry()` in
   `components/contact-form.tsx` resolves locally and logs the payload. Point it
   at a route handler, Resend, or a CRM webhook; validation, submission state
   and a hidden `website` honeypot field already work.
4. **Project screenshots** — each project in `data/projects.ts` has `image` and
   `imageAlt`. Set `image` to a file in `/public` and the coded placeholder
   visual in `components/project-visual.tsx` is replaced by a responsive
   `next/image`. Set `href` to show "View project" instead of "Request details".
5. **Founder portrait** — `portrait` at the top of `components/founder.tsx`.

## Notes

- Every section renders on the server; only the header, hero, services
  accordion, process rule, contact form and reveal wrapper are client
  components.
- Motion respects `prefers-reduced-motion` through `MotionConfig` in
  `components/motion-provider.tsx`, and a `<noscript>` rule in the layout forces
  revealed content visible when JavaScript is unavailable.
- The placeholder product visuals are pure CSS/SVG sized in container units, so
  they scale like artwork and cost nothing to load.
