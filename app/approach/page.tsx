import type { Metadata } from "next";
import { Page } from "@/components/layout/page";
import { Section, SectionHeader, Statement } from "@/components/ui";
import { ProcessScene } from "@/components/art/process";
import { WhyList } from "@/components/art/why-list";
import { FinalCta, PageHero } from "@/components/sections";
import { approach, why } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our Approach",
  description: `${approach.headline} ${approach.lead}`,
};

export default function Approach() {
  return (
    <Page>
      <PageHero eyebrow={approach.eyebrow} title={[approach.headline]} lead={approach.lead} />

      <ProcessScene />

      <Section tight>
        <Statement lines={approach.closing} />
      </Section>

      <Section className="border-t border-line">
        <SectionHeader eyebrow={why.eyebrow} title={why.headline} />
        <div className="mt-16">
          <WhyList />
        </div>
      </Section>

      <FinalCta />
    </Page>
  );
}
