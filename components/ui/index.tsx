import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal, SplitHeadline } from "@/components/motion/primitives";
import { StatementReveal } from "./statement";

export { Wordmark } from "./wordmark";

export function Section({
  children,
  id,
  inverse = false,
  className = "",
  tight = false,
  label,
}: {
  children: ReactNode;
  id?: string;
  inverse?: boolean;
  className?: string;
  tight?: boolean;
  label?: string;
}) {
  return (
    <section
      id={id}
      aria-label={label}
      className={`${tight ? "ps-section-tight" : "ps-section"} ${inverse ? "ps-inverse" : ""} ${className}`}
    >
      <div className="ps-container">{children}</div>
    </section>
  );
}

export function Eyebrow({ children, parts }: { children?: ReactNode; parts?: string[] }) {
  return (
    <p className="ps-eyebrow">
      {parts
        ? parts.map((p, i) => (
            <span key={p}>
              {i > 0 && <span className="ps-x">×</span>}
              {p}
            </span>
          ))
        : children}
    </p>
  );
}

const isInternal = (href: string) => href.startsWith("/");

export function Button({
  href,
  children,
  variant = "primary",
  size,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "link";
  size?: "sm";
}) {
  const cls =
    variant === "link"
      ? "ps-link"
      : `ps-btn ps-btn--${variant}${size === "sm" ? " ps-btn--sm" : ""}`;
  const inner = (
    <>
      {children} <span className="ps-arrow" aria-hidden="true">→</span>
    </>
  );
  return isInternal(href) ? (
    <Link className={cls} href={href}>
      {inner}
    </Link>
  ) : (
    <a className={cls} href={href}>
      {inner}
    </a>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  display = false,
  className = "",
}: {
  eyebrow: string;
  title: string | string[];
  lead?: ReactNode;
  display?: boolean;
  className?: string;
}) {
  const lines = Array.isArray(title) ? title : [title];
  return (
    <header className={`ps-section-header ${className}`}>
      <Reveal y={12}>
        <Eyebrow>{eyebrow}</Eyebrow>
      </Reveal>
      <SplitHeadline
        lines={lines}
        as={display ? "h1" : "h2"}
        className={display ? "ps-display" : "ps-h1"}
        delay={0.1}
      />
      {lead && (
        <Reveal delay={0.3}>
          <div className="ps-lead">{lead}</div>
        </Reveal>
      )}
    </header>
  );
}

export function Statement({ lines, className }: { lines: string[]; className?: string }) {
  return <StatementReveal lines={lines} className={className} />;
}
