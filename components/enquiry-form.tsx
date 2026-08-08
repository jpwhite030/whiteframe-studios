"use client";

import { useId, useRef, useState } from "react";
import { siteConfig } from "@/lib/site-config";

/**
 * The enquiry form.
 *
 * Accessibility decisions worth keeping:
 * - Every control has a real <label>, not a placeholder standing in for one.
 * - Errors are tied to their input with aria-describedby and aria-invalid, so
 *   a screen reader reads the message when focus lands rather than leaving a
 *   red outline as the only signal.
 * - The summary is role="alert" and focus moves to it on failure, so the
 *   problem is announced instead of silently appearing above the fold.
 * - Success replaces the form and is announced, so submitting doesn't leave
 *   someone wondering whether anything happened.
 * - The submit button stays enabled but reports aria-busy while sending;
 *   disabling it on submit is a well-known way to lose keyboard focus.
 */

type Errors = Record<string, string>;

const STAGES = [
  "Just an idea",
  "Validating the idea",
  "Have designs, need a build",
  "Existing product to improve",
  "Rebuild or rescue",
] as const;

const BUDGETS = [
  "Under $25k",
  "$25k – $50k",
  "$50k – $100k",
  "$100k+",
  "Not sure yet",
] as const;

export function EnquiryForm() {
  const formId = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const summaryRef = useRef<HTMLDivElement>(null);

  const fieldId = (name: string) => `${formId}-${name}`;
  const errorId = (name: string) => `${formId}-${name}-error`;

  const describedBy = (name: string, hint?: string) =>
    [errors[name] ? errorId(name) : null, hint ?? null]
      .filter(Boolean)
      .join(" ") || undefined;

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    setErrors({});

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (!response.ok || !result.ok) {
        setErrors(result.errors ?? { form: "Something went wrong." });
        setStatus("idle");
        // Announce and move to the summary rather than leaving the person to
        // hunt for what failed.
        requestAnimationFrame(() => summaryRef.current?.focus());
        return;
      }

      setStatus("sent");
    } catch {
      setErrors({
        form: `Something went wrong sending that. Please email ${siteConfig.email} directly.`,
      });
      setStatus("idle");
      requestAnimationFrame(() => summaryRef.current?.focus());
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="max-w-xl border border-ink/12 bg-white/60 p-8 md:p-10"
      >
        <h3 className="text-2xl font-extrabold tracking-tight">
          Thanks — that&rsquo;s with us.
        </h3>
        <p className="mt-4 text-base leading-relaxed font-medium text-ink-soft">
          You&rsquo;ll hear directly from {siteConfig.founder.split(" ")[0]}{" "}
          within two business days. If it&rsquo;s urgent, email{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-ink underline underline-offset-4"
          >
            {siteConfig.email}
          </a>
          .
        </p>
      </div>
    );
  }

  const inputClass =
    "mt-2 w-full border border-ink/20 bg-white/60 px-4 py-3.5 text-base font-medium text-ink transition-colors duration-200 placeholder:text-ink-faint focus-visible:border-cobalt focus-visible:outline-2 focus-visible:outline-cobalt focus-visible:outline-offset-1 aria-[invalid=true]:border-red-700";

  return (
    <form onSubmit={onSubmit} noValidate className="max-w-xl">
      {errors.form ? (
        <div
          ref={summaryRef}
          role="alert"
          tabIndex={-1}
          className="mb-8 border-l-2 border-red-700 bg-red-50 px-5 py-4 text-base font-medium text-red-900 outline-none"
        >
          {errors.form}
        </div>
      ) : null}

      {/* Honeypot. Hidden from view and from assistive tech, and never
          autofilled, so only a bot fills it in. */}
      <div aria-hidden className="absolute h-px w-px overflow-hidden opacity-0">
        <label htmlFor={fieldId("website")}>Website</label>
        <input
          id={fieldId("website")}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          id={fieldId("name")}
          name="name"
          label="Name"
          required
          autoComplete="name"
          error={errors.name}
          errorId={errorId("name")}
          describedBy={describedBy("name")}
          className={inputClass}
        />
        <Field
          id={fieldId("email")}
          name="email"
          type="email"
          label="Work email"
          required
          autoComplete="email"
          error={errors.email}
          errorId={errorId("email")}
          describedBy={describedBy("email")}
          className={inputClass}
        />
      </div>

      <div className="mt-6">
        <Field
          id={fieldId("company")}
          name="company"
          label="Company"
          autoComplete="organization"
          error={errors.company}
          errorId={errorId("company")}
          describedBy={describedBy("company")}
          className={inputClass}
        />
      </div>

      <div className="mt-6">
        <label htmlFor={fieldId("building")} className="label text-ink">
          What are you building? <Required />
        </label>
        <textarea
          id={fieldId("building")}
          name="building"
          rows={5}
          required
          aria-required="true"
          aria-invalid={errors.building ? true : undefined}
          aria-describedby={describedBy("building")}
          className={`${inputClass} resize-y`}
        />
        <FieldError id={errorId("building")} message={errors.building} />
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <SelectField
          id={fieldId("stage")}
          name="stage"
          label="Current project stage"
          options={STAGES}
          className={inputClass}
        />
        <SelectField
          id={fieldId("budget")}
          name="budget"
          label="Approximate budget range"
          options={BUDGETS}
          className={inputClass}
        />
      </div>

      <div className="mt-6">
        <label htmlFor={fieldId("timing")} className="label text-ink">
          Desired launch date
        </label>
        <input
          id={fieldId("timing")}
          name="timing"
          type="text"
          placeholder="e.g. Q1 next year, or a specific date"
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        aria-busy={status === "sending"}
        className="mt-10 min-h-[3rem] rounded-full bg-ink px-8 py-4 text-sm font-bold text-light transition-colors duration-300 hover:bg-cobalt focus-visible:outline-2 focus-visible:outline-cobalt focus-visible:outline-offset-2"
      >
        {status === "sending" ? "Sending…" : "Send enquiry"}
      </button>

      {/* Politely announced so the wait is audible, not just visible. */}
      <p role="status" className="sr-only">
        {status === "sending" ? "Sending your enquiry." : ""}
      </p>
    </form>
  );
}

function Required() {
  return (
    <>
      <span aria-hidden className="text-cobalt">
        *
      </span>
      <span className="sr-only">(required)</span>
    </>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-sm font-medium text-red-800">
      {message}
    </p>
  );
}

function Field({
  id,
  name,
  label,
  type = "text",
  required = false,
  autoComplete,
  error,
  errorId,
  describedBy,
  className,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  error?: string;
  errorId: string;
  describedBy?: string;
  className: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="label text-ink">
        {label} {required ? <Required /> : null}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        autoComplete={autoComplete}
        className={className}
      />
      <FieldError id={errorId} message={error} />
    </div>
  );
}

function SelectField({
  id,
  name,
  label,
  options,
  className,
}: {
  id: string;
  name: string;
  label: string;
  options: readonly string[];
  className: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="label text-ink">
        {label}
      </label>
      <select id={id} name={name} defaultValue="" className={className}>
        <option value="">Select one</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
