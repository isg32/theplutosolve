import type { Metadata } from "next";
import { Page } from "@/components/layout/page";
import { Section } from "@/components/ui";
import { ClientStrip } from "@/components/art/misc";
import { FinalCta, PageHero } from "@/components/sections";
import { WorkGrid } from "@/components/work/work-grid";
import { Testimonials } from "@/components/work/testimonials";
import { clients } from "@/lib/content";
import { projects, workPage } from "@/lib/work";

export const metadata: Metadata = {
  title: "Our Work",
  description: `${projects.length} projects for real clients — storefronts, scholarship platforms, real-estate launches and community websites.`,
};

export default function Work() {
  return (
    <Page>
      <PageHero eyebrow={workPage.eyebrow} title={workPage.headline} lead={workPage.lead} />

      <Section className="pt-0">
        <WorkGrid />
      </Section>

      <section className="ps-section work-quotes" aria-label="Testimonials">
        <div className="ps-container">
          <Testimonials />
        </div>
      </section>

      <Section tight>
        <ClientStrip eyebrow={clients.eyebrow} names={clients.names} />
      </Section>

      <FinalCta />
    </Page>
  );
}
