import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site-config";

/**
 * Enquiry submissions.
 *
 * The forwarding endpoint lives in ENQUIRY_ENDPOINT — a server-only variable,
 * deliberately not prefixed NEXT_PUBLIC_, so the destination and any key it
 * carries never reach the browser bundle. With it unset the route still
 * validates and still returns success, and logs the enquiry server-side, so
 * the form is testable locally without wiring a provider first.
 *
 * See CONTENT.md for what to set before launch.
 */

export const runtime = "nodejs";

type Field = {
  name: string;
  /**
   * Used to build the message, so it has to read as a noun in a sentence.
   * The visible label for the textarea is a question, which would produce
   * "What are you building? is required."
   */
  label: string;
  required: boolean;
  max: number;
};

const FIELDS: readonly Field[] = [
  { name: "name", label: "Name", required: true, max: 120 },
  { name: "email", label: "Work email", required: true, max: 200 },
  { name: "company", label: "Company", required: false, max: 160 },
  { name: "building", label: "A description of what you're building", required: true, max: 4000 },
  { name: "stage", label: "Current project stage", required: false, max: 80 },
  { name: "budget", label: "Approximate budget range", required: false, max: 80 },
  { name: "timing", label: "Desired launch date", required: false, max: 80 },
];

/** Deliberately permissive: the only real test is whether a reply sends. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let payload: Record<string, unknown>;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, errors: { form: "That submission couldn't be read." } },
      { status: 400 },
    );
  }

  // Honeypot: a field hidden from people but filled by naive bots. Answered
  // with a success response so a bot learns nothing from the difference.
  if (typeof payload.website === "string" && payload.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const errors: Record<string, string> = {};
  const values: Record<string, string> = {};

  for (const field of FIELDS) {
    const raw = payload[field.name];
    const value = typeof raw === "string" ? raw.trim() : "";

    if (field.required && value === "") {
      errors[field.name] = `${field.label} is required.`;
    } else if (value.length > field.max) {
      errors[field.name] = `${field.label} is too long.`;
    } else {
      values[field.name] = value;
    }
  }

  if (!errors.email && values.email && !EMAIL.test(values.email)) {
    errors.email = "That doesn't look like an email address.";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const endpoint = process.env.ENQUIRY_ENDPOINT;

  if (!endpoint) {
    console.warn(
      "[enquiry] ENQUIRY_ENDPOINT is not set — enquiry not forwarded.",
      { ...values, receivedAt: new Date().toISOString() },
    );

    // In production an unconfigured endpoint means the enquiry is gone. Saying
    // "thanks, we'll be in touch" would lose real business silently, so it
    // fails openly and points at an address that does work. Locally it
    // succeeds, so the form can be exercised without wiring a provider.
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        {
          ok: false,
          errors: {
            form: `The enquiry form isn't accepting submissions right now. Please email ${siteConfig.email} and we'll pick it up straight away.`,
          },
        },
        { status: 503 },
      );
    }

    return NextResponse.json({ ok: true, forwarded: false });
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        ...values,
        _subject: `Whiteframe enquiry — ${values.name}`,
        _replyto: values.email,
        site: siteConfig.url,
      }),
    });

    if (!response.ok) {
      console.error("[enquiry] forwarding failed", response.status);
      return NextResponse.json(
        {
          ok: false,
          errors: {
            form: `Something went wrong sending that. Please email ${siteConfig.email} directly.`,
          },
        },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("[enquiry] forwarding threw", error);
    return NextResponse.json(
      {
        ok: false,
        errors: {
          form: `Something went wrong sending that. Please email ${siteConfig.email} directly.`,
        },
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, forwarded: true });
}
