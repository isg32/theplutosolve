import type { ReactNode } from "react";
import { brand, ctas, finalCta } from "@/lib/content";
import { Button, Eyebrow } from "@/components/ui";
import { Magnetic, Reveal, SplitHeadline } from "@/components/motion/primitives";
import { CoverBlocks } from "@/components/art/cover-blocks";
import { SystemField } from "@/components/art/system-field";

/** Inner-page hero: the page's one display headline beside the cover composition. */
export function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: string[];
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="ps-container page-hero__inner">
        <div className="page-hero__copy">
          <Reveal y={10}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
          <SplitHeadline lines={title} as="h1" className="ps-display" onMount delay={0.15} />
          {lead && (
            <Reveal delay={0.5}>
              <div className="ps-lead">{lead}</div>
            </Reveal>
          )}
          {children}
        </div>
        <CoverBlocks className="page-hero__art" />
      </div>
    </section>
  );
}

/** "Have a growth problem worth solving?", over a quiet system field. */
export function FinalCta({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  return (
    <section className="final-cta" aria-label={finalCta.eyebrow}>
      <div className="final-cta__art">
        <SystemField variant="quiet" />
      </div>
      <div className="ps-container final-cta__inner">
        <Reveal y={10}>
          <Eyebrow>{finalCta.eyebrow}</Eyebrow>
        </Reveal>
        <SplitHeadline
          lines={[finalCta.headline]}
          as={headingLevel}
          className={headingLevel === "h1" ? "ps-display" : "ps-h1"}
          onMount={headingLevel === "h1"}
        />
        <Reveal delay={0.25}>
          <p className="ps-lead">
            <strong>{finalCta.lead}</strong> {finalCta.body}
          </p>
        </Reveal>
        <Reveal delay={0.4} className="final-cta__actions">
          <Magnetic>
            <Button href={ctas.conversation.href}>{ctas.conversation.label}</Button>
          </Magnetic>
          <Button href={ctas.work.href} variant="secondary">
            {ctas.work.label}
          </Button>
        </Reveal>
        <Reveal delay={0.55}>
          <a className="final-cta__email" href={`mailto:${brand.email}`}>
            {brand.email}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
