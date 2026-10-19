import Link from "next/link";
import { Page } from "@/components/layout/page";
import { Button, Section, SectionHeader, Statement } from "@/components/ui";
import { CountUp, Magnetic, Reveal, SplitHeadline, Stagger, StaggerItem } from "@/components/motion/primitives";
import { ClientStrip, Descriptor, HeroArt } from "@/components/art/misc";
import { ScaleRange } from "@/components/art/scale-range";
import { Pluto } from "@/components/art/pluto";
import { WorkBand } from "@/components/work/work-band";
import { Testimonials } from "@/components/work/testimonials";
import { IdeaScene } from "@/components/art/idea-scene";
import { CapabilityGlyph } from "@/components/art/capability-glyph";
import { ProcessSteps } from "@/components/art/process";
import { PrincipleScene } from "@/components/art/principle-scene";
import { FinalCta } from "@/components/sections";
import { approach, capabilities, capabilitiesIntro, ctas, hero, idea, nav, scale, slug, trusted } from "@/lib/content";

export default function Home() {
  return (
    <Page>
      <section className="hero">
        <HeroArt />
        <div className="ps-container hero__inner">
          <div className="hero__copy">
            <Descriptor />
            <SplitHeadline lines={[hero.headline]} as="h1" className="ps-display hero__title" onMount delay={0.25} />
            <Reveal delay={0.7}>
              <p className="ps-lead">{hero.lead}</p>
            </Reveal>
            <Reveal delay={0.85} className="hero__lines">
              <p>{hero.lines[0]}</p>
              <p className="hero__strong">{hero.lines[1]}</p>
            </Reveal>
            <Reveal delay={1} className="hero__ctas">
              <Magnetic>
                <Button href={ctas.build.href}>{ctas.build.label}</Button>
              </Magnetic>
              <Button href={ctas.work.href} variant="secondary">
                {ctas.work.label}
              </Button>
            </Reveal>
            <Reveal delay={1.15}>
              <p className="hero__support">{hero.supporting}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <Section tight label={trusted.heading}>
        <div className="trusted">
          <div>
            <SplitHeadline lines={[trusted.heading]} className="trusted__heading" />
            <Reveal delay={0.2}>
              <p className="trusted__copy">{trusted.copy}</p>
            </Reveal>
          </div>
          <ClientStrip names={trusted.clients} label="Clients" />
        </div>
      </Section>

      <Section className="border-t border-line" label={scale.eyebrow}>
        <div className="scale">
          <SectionHeader eyebrow={scale.eyebrow} title={scale.headline} lead={scale.lead} />
          <Reveal delay={0.2} className="scale__body">
            <p>{scale.body}</p>
          </Reveal>
        </div>
        <ScaleRange />
        <Reveal className="pluto-note" y={8}>
          <Pluto size={28} />
          <p className="m-0">{scale.pluto}</p>
        </Reveal>
        <Statement lines={scale.closing} className="scale__closing" />
      </Section>

      <Section className="pb-0">
        <SectionHeader eyebrow={idea.eyebrow} title={idea.headline} />
      </Section>
      <IdeaScene />
      <Section className="pt-0">
        <div className="idea-after">
          <Reveal>
            <p className="ps-lead">
              <strong>{idea.body}</strong>
            </p>
          </Reveal>
          <Stagger as="ul" className="idea-builds" stagger={0.07}>
            {idea.builds.map((b) => (
              <StaggerItem as="li" key={b}>
                {b}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
        <Statement lines={idea.closing} />
      </Section>

      <Section className="border-t border-line">
        <SectionHeader
          eyebrow={capabilitiesIntro.eyebrow}
          title={capabilitiesIntro.headline}
          lead={
            <>
              {capabilitiesIntro.lead[0]} <strong>{capabilitiesIntro.lead[1]}</strong>
            </>
          }
        />
        <ul className="cap-index">
          {capabilities.map((c) => (
            <li key={c.index}>
              <Reveal>
                <Link href={`/what-we-do#${slug(c.title)}`} className="cap-index__row">
                  <CountUp to={Number(c.index)} className="cap-index__num" />
                  <span className="cap-index__text">
                    <span className="cap-index__title">{c.title}</span>
                    <span className="cap-index__sub">{c.sub}</span>
                  </span>
                  <span className="cap-index__glyph">
                    <CapabilityGlyph kind={c.glyph} />
                  </span>
                  <span className="cap-index__arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <WorkBand />

      <Section>
        <SectionHeader eyebrow={approach.eyebrow} title={approach.headline} lead={approach.lead} />
        <div className="mt-16">
          <ProcessSteps />
        </div>
        <div className="mt-16">
          <Statement lines={approach.closing} />
        </div>
        <Reveal className="mt-8">
          <Button href="/approach" variant="link">
            {nav[2].label}
          </Button>
        </Reveal>
      </Section>

      <PrincipleScene />

      <section className="ps-section" aria-label="Testimonials">
        <div className="ps-container">
          <Testimonials />
        </div>
      </section>

      <FinalCta />
    </Page>
  );
}
