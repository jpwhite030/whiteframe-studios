import { ArrowRight } from "lucide-react";
import type { ComponentProps } from "react";

type ActionLinkProps = ComponentProps<"a"> & {
  variant?: "solid" | "outline";
};

const base =
  "group inline-flex items-center justify-center gap-2.5 border px-5 py-3.5 text-sm tracking-tight transition-colors duration-300 ease-editorial md:gap-3 md:px-7 md:py-4";

const variants = {
  solid: "border-bone bg-bone text-canvas hover:border-accent hover:bg-accent",
  outline: "border-line-strong text-bone hover:border-bone hover:bg-canvas-100",
} as const;

/** Shared call-to-action treatment: square, quiet, with a travelling arrow. */
export function ActionLink({
  variant = "solid",
  className = "",
  children,
  ...props
}: ActionLinkProps) {
  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
      <ArrowRight
        aria-hidden
        className="size-4 transition-transform duration-300 ease-editorial group-hover:translate-x-1"
        strokeWidth={1.5}
      />
    </a>
  );
}
