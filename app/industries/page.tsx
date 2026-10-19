import type { Metadata } from "next";
import { Page } from "@/components/layout/page";
import { Section, SectionHeader, Statement } from "@/components/ui";
import { Stagger, StaggerItem } from "@/components/motion/primitives";
import { IndustryGrid } from "@/components/art/industry-grid";
import { FinalCta, PageHero } from "@/components/sections";
import { audiences, industries } from "@/lib/content";

export const metadata: Metadata = {
  title: "Industries",
  description: `${industries.headline.join(" ")} ${industries.lead}`,
};

export default function Industries() {
  return (
    <Page>
      <PageHero eyebrow={industries.eyebrow} title={industries.headline} lead={industries.lead} />

      <Section className="pt-0">
        <IndustryGrid />
        <div className="mt-24">
          <Statement lines={industries.closing} />
        </div>
      </Section>

      <Section className="border-t border-line">
        <SectionHeader eyebrow={audiences.eyebrow} title={audiences.headline} lead={audiences.lead} />
        <Stagger as="ol" className="audiences" stagger={0.1}>
          {audiences.items.map((a, i) => (
            <StaggerItem as="li" key={a.title} className="ps-capability">
              <div className="ps-capability__index">{String(i + 1).padStart(2, "0")}</div>
              <div>
                <h3 className="ps-capability__title">{a.title}</h3>
                <p className="ps-capability__desc">{a.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <div className="mt-24">
          <Statement lines={audiences.closing} />
        </div>
      </Section>

      <FinalCta />
    </Page>
  );
}
