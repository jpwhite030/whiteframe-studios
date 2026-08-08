# Content and configuration handover

Everything the site renders comes from four data files plus `lib/site-config.ts`.
No component contains standing copy. This document lists what is real, what is
still a placeholder, and what must be set before launch.

## Where content lives

| What | File |
| --- | --- |
| Copy, nav, CTAs, socials, SEO defaults | `lib/site-config.ts` |
| Projects and full case studies | `data/projects.ts` |
| Services and their FAQs | `data/services.ts` |
| Team biographies and profile links | `data/team.ts` |
| Written pieces | `data/insights.ts` |
| Homepage accordion summaries | `data/capabilities.ts` |

Adding a service or a case study to its data file creates the page, adds it to
the sitemap, and links it from the relevant index. Nothing else needs editing.

## Must be set before launch

**`ENQUIRY_ENDPOINT`** — server-only environment variable, set in Vercel.
The enquiry form posts to `/api/enquiry`, which validates and then forwards to
this URL. It is deliberately **not** prefixed `NEXT_PUBLIC_`, so neither the
endpoint nor any key it embeds reaches the browser.

Behaviour when unset differs by environment, on purpose:

- **Locally** the form validates and reports success, and the enquiry is
  logged server-side — so it can be exercised without wiring a provider.
- **In production** it returns 503 and tells the person to email directly.
  Reporting success for an enquiry that was never delivered would lose real
  business silently, which is worse than an honest failure.

A Formspree endpoint works as-is (the payload includes `_subject` and
`_replyto`).

**Social profile URLs** — checked 2026-08-08 by request:
`instagram.com/whiteframestudios` resolves;
`linkedin.com/company/whiteframestudios` and `github.com/whiteframestudios`
both return **404**.

Each entry in `siteConfig.socials` now carries a `confirmed` flag. Only
confirmed accounts render in the footer and appear in the `Organization`
schema's `sameAs`, so the two dead links are no longer published as either
broken outbound links or false entity signals. Create the accounts and flip
`confirmed` to `true`, or delete the entries.

## Deliberately empty — awaiting real information

Nothing in these areas has been invented. Each renders an honest absence
rather than a plausible fabrication.

**Case-study results.** `CaseStudy.results` is unset on all four projects. The
Results section does not render at all when absent. Populate only with figures
the client has confirmed and agreed to publish:

```ts
results: [{ label: "Venues onboarded", value: "40+" }]
```

**Client testimonials.** `CaseStudy.testimonial` is unset on all four. The
section is omitted entirely when absent. Add only with the client's words and
permission:

```ts
testimonial: {
  quote: "…",
  attribution: "Name",
  role: "Role, Company",
}
```

**Team photography.** `TeamMember.portrait` is unset. The Studio page renders
each person typographically rather than showing a placeholder avatar. Add a
real photograph with explicit `width` and `height` to avoid layout shift.

**Professional profile links.** `TeamMember.links` is an empty array. No
LinkedIn or GitHub URL is asserted for anyone until confirmed.

**Jack's biography.** `data/team.ts` states only what is verifiable from this
repository and the projects in it. Anything about prior employers, years of
experience or credentials needs to come from you — I have not written any.

**Case-study galleries.** Only PubCam has one, with three screens captured
from the Release build in the simulator (sign-in, age verification, venue).
`CaseStudy.gallery` is unset on Tally Tax, Still and Kingswood — the section
is omitted rather than padded. Each of those needs its own simulator session
to capture: Tally and Kingswood have no build running, and Still's would show
an empty week on a fresh install.

Deeper PubCam coverage (feed, map, events) needs either an account or a pass
through the age gate, which requires the Simulator's hardware keyboard to be
connected before a date of birth can be typed.

**Insights.** `data/insights.ts` is an empty array and `/insights` renders an
honest empty state. The individual post route does not exist yet; add
`app/insights/[slug]/page.tsx` alongside the first post.

## Content written for you — worth reviewing

These are real claims about the studio and the work, written from what is in
the codebases. Read them before launch and correct anything that misstates the
positioning:

- **Service pages** (`data/services.ts`) — intros, audiences, problems,
  deliverables, process and FAQs for all four services.
- **Case studies** (`data/projects.ts`) — problem, objective, decisions,
  design and engineering narrative for PubCam, Tally Tax, Still and Kingswood.
  All drawn from the actual product repositories.
- **Studio page** (`app/studio/page.tsx`) — the senior-team argument and the
  specialist-collaborators policy.
- **Still's tagline** — "Focus sessions that protect time for deep work" was
  written from what the Today screen shows, not from settled positioning.

One content note: the Still screenshot's "Most recent" row reads *Interactive
chopped map*, a real session name from your own use. It is now public.

## Technical notes

**Canonical hostname.** `siteConfig.url` is `https://whiteframestudios.com`.
Every canonical, Open Graph URL and sitemap entry derives from it. Vercel
already 307s `www` to the apex; a 301 would be preferable and is a project
setting rather than a code change.

**Preview deployments** return `Disallow: /` from `robots.ts` whenever
`VERCEL_ENV` is not `production`, so preview URLs cannot be indexed.

**Search Console.** Verify by DNS (the domain is on Vercel nameservers) rather
than an HTML file, then submit `https://whiteframestudios.com/sitemap.xml`.

**Label contrast.** `--color-ink-faint` was `#8b877e`, which is 3.17:1 on cream
and fails WCAG AA for the 11px uppercase labels it is mostly used for. It is
now `#6f6b62` at 4.70:1. Keep any replacement above 4.5:1 against `#f3f1eb`.

**Sticky navigation.** The header uses `mix-blend-difference` at the top of the
page, which guarantees contrast over solid light or dark but can land on a
near-invisible grey over mid-tone photography. It now switches to a solid
cream ground with a blur after 24px of scroll, so the links stay legible over
whatever passes beneath.

## Recorded results

Lighthouse 12, against a production build (`next start`), headless Chromium
151, measured 2026-08-08.

| | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Desktop | 100 | 96 | 100 | 100 | 0.4 s | 0 | 0 ms |
| Mobile | 98 | 96 | 100 | 100 | 2.5 s | 0 | 10 ms |

All three Core Web Vitals meet their targets: LCP ≤ 2.5s, CLS ≤ 0.1, and INP's
proxy TBT far below 200ms.

Three performance fixes came out of these measurements:

1. **The hero recording was the mobile LCP element.** Its poster had to arrive
   before the hero could paint. Video now plays only at ≥768px; phones get the
   optimised, responsive still instead. This also satisfies the brief's
   "avoid autoplaying heavy mobile video".
2. **Entrance animations were gating first paint.** The hero paragraph and H1
   started at `opacity: 0` / `translateY(104%)` under Motion, so they stayed
   invisible until React hydrated. Both now run as CSS animations, which start
   on the first painted frame. Scroll-triggered reveals below the fold still
   use Motion, where `whileInView` is the whole point. LCP: 3.5s → 2.5s.
3. **A below-the-fold video poster was competing for bandwidth.** Posters are
   now attached only when the recording is within 300px of the viewport.

### Remaining audit flags, and why they stand

- **Header contrast reported as 1.01.** A false positive: the header uses
  `mix-blend-difference`, which axe cannot evaluate. The computed values are
  `#f5f3ee` on `#f3f1eb`, but the blend renders near-black on cream — roughly
  19:1 in practice. Worth knowing that automated audits will always flag it.
- **Low-contrast spans inside the studio statement.** Caught mid-animation,
  at `opacity: 0.14` during the entrance. Transient, not a resting state.

`--color-light-faint` was a genuine failure and was fixed: `#6e6b64` was
3.72:1 on the dark sections, below AA for the 11px uppercase labels. It is now
`#7d7a72` at 4.62:1.
