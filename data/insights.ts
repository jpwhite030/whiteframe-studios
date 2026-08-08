/**
 * Written pieces.
 *
 * Body copy is an array of blocks so a post can carry headings and pull
 * quotes without a markdown pipeline. Adding an entry creates the route and
 * the sitemap entry; nothing else needs editing.
 *
 * These are published under Jack's name. Read anything here before it ships
 * and change whatever doesn't sound like you — see CONTENT.md.
 */

export type InsightBlock =
  | { kind: "p"; text: string }
  | { kind: "h2"; text: string }
  | { kind: "quote"; text: string };

export type Insight = {
  slug: string;
  title: string;
  /** Used on the index, in metadata, and as the standfirst. */
  summary: string;
  /** ISO date. */
  published: string;
  /** Roughly, for the reader's benefit. */
  readingMinutes: number;
  body: readonly InsightBlock[];
};

export const insights: readonly Insight[] = [
  {
    slug: "what-your-empty-states-are-telling-people",
    title: "What your empty states are telling people",
    summary:
      "A screenshot of a product with nothing in it says the product is unfinished — whatever the product actually is. The fix is rarely design work.",
    published: "2026-08-09",
    readingMinutes: 3,
    body: [
      {
        kind: "p",
        text: "Every product ships with a first screen that nobody designs on purpose: the one where there is no data yet. It is the screen a new account sees, the screen a demo account sees, and — because it is the easiest one to reach — very often the screen that ends up in the App Store listing, the pitch deck and the portfolio.",
      },
      {
        kind: "p",
        text: "That last part is the problem. An empty state is honest about a new account. It is dishonest about the product, because it shows a thing that does nothing.",
      },
      { kind: "h2", text: "The screenshot problem" },
      {
        kind: "p",
        text: "We rebuilt this site recently and went through our own work looking for captures. The one we had of Tally — our tax app — showed a profile page reading zero per cent complete, three fields marked “not set”, and an account called preview@tally.app. Every pixel of it was real. It was also the least representative screen in the entire app.",
      },
      {
        kind: "p",
        text: "Nobody had chosen it. It was simply the screen you land on when you install the app and do nothing, which is exactly the state a person is in when they open a simulator to take a screenshot.",
      },
      {
        kind: "quote",
        text: "The captures you have are the ones that were easy to take, not the ones that show the product working.",
      },
      { kind: "h2", text: "Why this is not a design problem" },
      {
        kind: "p",
        text: "The instinct is to design a better empty state. Illustration, a friendly line, a call to action. Worth doing, and it will not fix this. A well-designed screen with nothing in it still communicates nothing in it.",
      },
      {
        kind: "p",
        text: "What fixes it is having data. Not invented data — a populated account you actually use, so the screens you show are the screens people meet after the product has earned a week of their attention. That is a slower fix than a design pass, which is why it usually loses.",
      },
      { kind: "h2", text: "What we do about it now" },
      {
        kind: "p",
        text: "Three things, none of them clever. We keep an account with real history in it, and take captures from that rather than from a fresh install. We shoot from a release build, because a debug overlay in the corner of a portfolio image reads as carelessness whether or not it is. And when a screen genuinely has nothing to show, we leave it out rather than pad a grid with it.",
      },
      {
        kind: "p",
        text: "On this site there are two projects with no captures at all. Their tiles say “capture coming”. That is a worse-looking page than one filled with screens, and a more accurate one. We would rather be short than misleading, and the fix is on a list rather than hidden behind a picture of an empty screen.",
      },
    ],
  },
];
