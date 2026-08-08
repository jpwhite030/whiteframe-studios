/**
 * The people behind the studio.
 *
 * `portrait` and `links` are reusable fields waiting on real assets — no
 * placeholder image or invented profile URL is rendered in their absence.
 * Biographies here state only what is verifiable; anything about prior
 * employers or credentials must come from the person themselves.
 * See CONTENT.md.
 */

export type TeamLink = {
  label: string;
  href: string;
};

export type TeamMember = {
  name: string;
  role: string;
  bio: readonly string[];
  /** Path under /public once a real photograph exists. */
  portrait?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  /** Professional profiles. Empty until confirmed accounts are supplied. */
  links: readonly TeamLink[];
};

export const team: readonly TeamMember[] = [
  {
    name: "Jack White",
    role: "Founder — strategy, design and engineering",
    bio: [
      "Jack founded Whiteframe to work the way he wanted to be worked with: directly, without an account layer, and with the same person responsible for the idea and the implementation.",
      "He works across the whole arc of a product — deciding what to build, designing how it behaves, and writing the code that ships it. Recent projects include PubCam, Tally Tax and Still.",
    ],
    // portrait: awaiting a real photograph — see CONTENT.md
    links: [],
  },
];
