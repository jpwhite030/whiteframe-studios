"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";

/**
 * An accessible disclosure list.
 *
 * Built on native <button> elements rather than a div with a click handler,
 * so Enter and Space work without being reimplemented and focus order is the
 * browser's. Each button owns its panel through aria-controls, reports state
 * through aria-expanded, and the panel is removed from the tree when closed
 * rather than merely hidden — otherwise screen readers and find-in-page still
 * reach text nobody can see.
 *
 * The heading level is a prop because these appear under different parents:
 * an h2 on a service page section, an h3 elsewhere. Hardcoding it would break
 * heading order on one of them.
 */
export function FaqList({
  faqs,
  headingLevel = 3,
}: {
  faqs: readonly { question: string; answer: string }[];
  headingLevel?: 2 | 3 | 4;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();
  const Heading = `h${headingLevel}` as const;

  return (
    <dl className="max-w-3xl border-t border-ink/10">
      {faqs.map((faq, index) => {
        const open = openIndex === index;
        const buttonId = `${baseId}-q-${index}`;
        const panelId = `${baseId}-a-${index}`;

        return (
          <div key={faq.question} className="border-b border-ink/10">
            <dt>
              <Heading className="text-base font-extrabold tracking-tight">
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(open ? null : index)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors duration-200 hover:text-cobalt focus-visible:outline-2 focus-visible:outline-cobalt focus-visible:outline-offset-2"
                >
                  <span>{faq.question}</span>
                  <Plus
                    aria-hidden
                    strokeWidth={2}
                    className={`size-4 shrink-0 text-ink-soft transition-transform duration-300 ease-editorial ${
                      open ? "rotate-45" : ""
                    }`}
                  />
                </button>
              </Heading>
            </dt>
            {open ? (
              <dd
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="pb-7"
              >
                <p className="max-w-2xl text-base leading-relaxed font-medium text-ink-soft">
                  {faq.answer}
                </p>
              </dd>
            ) : null}
          </div>
        );
      })}
    </dl>
  );
}
