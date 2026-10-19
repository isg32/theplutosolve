import type { Metadata } from "next";
import Link from "next/link";
import { Page } from "@/components/layout/page";
import { Section, SectionHeader, Statement } from "@/components/ui";
import { Stagger, StaggerItem } from "@/components/motion/primitives";
import { ClientStrip } from "@/components/art/misc";
import { GrowthSystems } from "@/components/art/growth-systems";
import { FinalCta, PageHero } from "@/components/sections";
import { clients, industries, systems } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our Work",
  description: clients.lead,
};

export default function Work() {
  return (
    <Page>
      <PageHero eyebrow={clients.eyebrow} title={clients.headline} lead={clients.lead} />

      <Section tight className="pt-0">
        <ClientStrip names={clients.names} label={clients.eyebrow} />
      </Section>

      <Section className="dotfield">
        <SectionHeader eyebrow={systems.eyebrow} title={systems.headline} />
        <div className="mt-12">
          <GrowthSystems />
        </div>
        <div className="mt-24">
          <Statement lines={systems.closing} />
        </div>
      </Section>

      <Section className="border-t border-line">
        <SectionHeader eyebrow={industries.eyebrow} title={industries.headline} lead={industries.lead} />
        <Stagger as="ul" className="work-industries" stagger={0.05}>
          {industries.items.map((it) => (
            <StaggerItem as="li" key={it.title}>
              <Link href="/industries">{it.title}</Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <FinalCta />
    </Page>
  );
}
