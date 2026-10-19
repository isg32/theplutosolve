import type { Metadata } from "next";
import { Page } from "@/components/layout/page";
import { Section, SectionHeader, Statement } from "@/components/ui";
import { CountUp, Reveal, Stagger, StaggerItem } from "@/components/motion/primitives";
import { CapabilityGlyph } from "@/components/art/capability-glyph";
import { GrowthSystems } from "@/components/art/growth-systems";
import { FinalCta, PageHero } from "@/components/sections";
import { capabilities, capabilitiesIntro, slug, systems } from "@/lib/content";

export const metadata: Metadata = {
  title: "What We Do",
  description: `${capabilitiesIntro.headline} ${capabilitiesIntro.lead.join(" ")}`,
};

export default function WhatWeDo() {
  return (
    <Page>
      <PageHero
        eyebrow={capabilitiesIntro.eyebrow}
        title={[capabilitiesIntro.headline]}
        lead={
          <>
            {capabilitiesIntro.lead[0]} <strong>{capabilitiesIntro.lead[1]}</strong>
          </>
        }
      />

      <Section className="pt-0">
        <div className="capabilities">
          {capabilities.map((c) => (
            <div key={c.index} id={slug(c.title)} className="capability-group">
              <article className="ps-capability capability">
                <CountUp to={Number(c.index)} className="ps-capability__index" />
                <div>
                  <Reveal y={16}>
                    <h2 className="ps-capability__title">{c.title}</h2>
                    <p className="ps-capability__sub">{c.sub}</p>
                    {c.desc.map((d) => (
                      <p key={d} className="ps-capability__desc">
                        {d}
                      </p>
                    ))}
                  </Reveal>
                  <Stagger as="ul" className="ps-capability__list" stagger={0.04}>
                    {c.list.map((l) => (
                      <StaggerItem as="li" key={l}>
                        {l}
                      </StaggerItem>
                    ))}
                  </Stagger>
                </div>
                <div className="capability__glyph">
                  <CapabilityGlyph kind={c.glyph} />
                </div>
              </article>
              {c.highlight && <Statement lines={c.highlight} className="capability__highlight" />}
            </div>
          ))}
        </div>
      </Section>

      <Section className="border-t border-line dotfield">
        <SectionHeader eyebrow={systems.eyebrow} title={systems.headline} />
        <div className="mt-12">
          <GrowthSystems />
        </div>
        <div className="mt-24">
          <Statement lines={systems.closing} />
        </div>
      </Section>

      <FinalCta />
    </Page>
  );
}
