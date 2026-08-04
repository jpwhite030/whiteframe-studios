"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import {
  budgetRanges,
  projectStages,
  timeframes,
  type EnquiryPayload,
} from "@/data/enquiry";
import { siteConfig } from "@/lib/site-config";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * INTEGRATION POINT
 * ─────────────────
 * Replace the body of this function with the real transport — a route handler
 * at `app/api/enquiry/route.ts`, Resend, Formspree, a CRM webhook, etc. The
 * form already validates and shapes the payload, so only this call changes.
 */
async function submitEnquiry(payload: EnquiryPayload): Promise<void> {
  if (process.env.NODE_ENV === "development") {
    console.info("Enquiry ready to send:", payload);
  }
  await new Promise((resolve) => setTimeout(resolve, 700));
}

const fieldClass =
  "w-full border-b border-line-strong bg-transparent pb-3 text-base text-bone outline-offset-2 transition-colors duration-200 focus:border-accent md:text-lg";

function Field({
  label,
  htmlFor,
  children,
  className = "",
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="label block text-faint">
        {label}
      </label>
      <div className="mt-3.5">{children}</div>
    </div>
  );
}

function Select({
  id,
  name,
  options,
  placeholder,
}: {
  id: string;
  name: string;
  options: readonly string[];
  placeholder: string;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        required
        defaultValue=""
        className={`${fieldClass} cursor-pointer pr-8`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden
        strokeWidth={1.5}
        className="pointer-events-none absolute right-0 bottom-4 size-4 text-muted"
      />
    </div>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const confirmationRef = useRef<HTMLHeadingElement>(null);

  // Move focus to the confirmation so keyboard and screen-reader users are
  // told the enquiry went through, rather than landing on empty space.
  useEffect(() => {
    if (status === "success") confirmationRef.current?.focus();
  }, [status]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot — real people never fill this in.
    if (data.get("website")) return;

    const payload: EnquiryPayload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      company: String(data.get("company") ?? ""),
      brief: String(data.get("brief") ?? ""),
      stage: String(data.get("stage") ?? "") as EnquiryPayload["stage"],
      budget: String(data.get("budget") ?? "") as EnquiryPayload["budget"],
      timeframe: String(
        data.get("timeframe") ?? "",
      ) as EnquiryPayload["timeframe"],
    };

    setStatus("submitting");
    try {
      await submitEnquiry(payload);
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="shell scroll-mt-24 py-28 md:py-36 lg:py-44">
      <SectionHeading
        number="06"
        label="Contact"
        headline="Have something worth building?"
        variant="display"
      />

      {/* Form leads on the left; the direct details sit out to the right. */}
      <div className="mt-16 grid gap-14 md:mt-24 lg:grid-cols-12 lg:gap-x-16">
        <Reveal className="lg:col-span-7">
          {status === "success" ? (
            <div
              role="status"
              className="flex h-full min-h-80 flex-col justify-center border-t border-line pt-10"
            >
              <span className="flex size-9 items-center justify-center border border-accent text-accent">
                <Check aria-hidden strokeWidth={1.5} className="size-4" />
              </span>
              <h3
                ref={confirmationRef}
                tabIndex={-1}
                className="mt-8 text-[clamp(1.75rem,3.4vw,2.75rem)]"
              >
                Enquiry received.
              </h3>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
                Thanks for the detail — {siteConfig.founder} will read it
                personally and reply from {siteConfig.email}.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="label mt-10 self-start border-b border-line-strong pb-1.5 text-bone transition-colors duration-200 hover:border-accent hover:text-accent"
              >
                Send another enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
                <Field label="Name" htmlFor="name">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    className={fieldClass}
                  />
                </Field>

                <Field label="Email" htmlFor="email">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@company.com"
                    className={fieldClass}
                  />
                </Field>

                <Field label="Company" htmlFor="company">
                  <input
                    id="company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    placeholder="Optional"
                    className={fieldClass}
                  />
                </Field>

                <Field label="Current stage" htmlFor="stage">
                  <Select
                    id="stage"
                    name="stage"
                    options={projectStages}
                    placeholder="Select a stage"
                  />
                </Field>

                <Field
                  label="What are you building?"
                  htmlFor="brief"
                  className="sm:col-span-2"
                >
                  <textarea
                    id="brief"
                    name="brief"
                    required
                    rows={4}
                    placeholder="The problem, the product, and what is currently in the way."
                    className={`${fieldClass} resize-y`}
                  />
                </Field>

                <Field label="Approximate budget" htmlFor="budget">
                  <Select
                    id="budget"
                    name="budget"
                    options={budgetRanges}
                    placeholder="Select a range"
                  />
                </Field>

                <Field label="Desired launch timeframe" htmlFor="timeframe">
                  <Select
                    id="timeframe"
                    name="timeframe"
                    options={timeframes}
                    placeholder="Select a timeframe"
                  />
                </Field>
              </div>

              {/* Honeypot */}
              <div aria-hidden className="sr-only">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="group inline-flex items-center gap-3 border border-bone bg-bone px-7 py-4 text-sm tracking-tight text-canvas transition-colors duration-300 ease-editorial hover:border-accent hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "submitting"
                    ? "Sending…"
                    : "Start the conversation"}
                  <ArrowRight
                    aria-hidden
                    strokeWidth={1.5}
                    className="size-4 transition-transform duration-300 ease-editorial group-hover:translate-x-1"
                  />
                </button>

                <p aria-live="polite" className="label text-muted">
                  {status === "error"
                    ? "Something went wrong — email us directly."
                    : `Read by ${siteConfig.founder}.`}
                </p>
              </div>
            </form>
          )}
        </Reveal>

        <Reveal delay={0.05} className="lg:col-span-4 lg:col-start-9">
          <p className="max-w-md text-lg leading-relaxed text-bone-700">
            Tell us what you are working on, where it currently stands and what
            is preventing it from moving forward.
          </p>

          <dl className="mt-12 space-y-6">
            <div className="border-t border-line pt-4">
              <dt className="label text-faint">Direct</dt>
              <dd className="mt-2.5">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="group inline-flex items-center gap-2 text-base text-bone transition-colors duration-200 hover:text-accent"
                >
                  <span className="relative">
                    {siteConfig.email}
                    <span
                      aria-hidden
                      className="absolute -bottom-1 left-0 h-px w-full bg-line-strong transition-colors duration-300 group-hover:bg-accent"
                    />
                  </span>
                </a>
              </dd>
            </div>
            <div className="border-t border-line pt-4">
              <dt className="label text-faint">Studio</dt>
              <dd className="mt-2.5 text-base text-bone-700">
                {siteConfig.location}
              </dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
