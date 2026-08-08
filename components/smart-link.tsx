"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { scrollToHash, useLenis } from "@/lib/lenis-provider";

/**
 * One link component for a site that mixes real routes with in-page anchors.
 *
 * A "/path" is a Next route, so it prefetches and navigates client-side and
 * — importantly for crawling — renders as a plain <a href>. A "#hash" is
 * handed to Lenis so the smooth scroll matches the rest of the page. External
 * links get the usual rel treatment.
 */
export function SmartLink({
  href,
  children,
  className,
  onNavigate,
  ...rest
}: {
  href: string;
  children: ReactNode;
  className?: string;
  /** Lets a parent close a menu when a link is followed. */
  onNavigate?: () => void;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  const lenis = useLenis();

  if (href.startsWith("#")) {
    return (
      <a
        href={href}
        className={className}
        onClick={(event) => {
          event.preventDefault();
          onNavigate?.();
          scrollToHash(lenis, href);
        }}
        {...rest}
      >
        {children}
      </a>
    );
  }

  if (href.startsWith("http") || href.startsWith("mailto:")) {
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        className={className}
        onClick={() => onNavigate?.()}
        {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={() => onNavigate?.()} {...rest}>
      {children}
    </Link>
  );
}
