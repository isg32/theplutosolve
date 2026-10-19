import type { Metadata } from "next";
import { Page } from "@/components/layout/page";
import { Button, Section, SectionHeader, Statement } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/primitives";
import { ClientStrip, VisionFlow } from "@/components/art/misc";
import { Pluto } from "@/components/art/pluto";
import { Team } from "@/components/work/team";
import { FinalCta, PageHero } from "@/components/sections";
import { about, clients, ctas, vision } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: `${about.intro} ${about.idea}`,
};

export default function About() {
  return (
    <Page>
      <PageHero
        eyebrow={about.eyebrow}
        title={about.headline}
        lead={
          <>
            {about.intro} <strong>{about.idea}</strong>
          </>
        }
      />

      <Section className="pt-0">
        <div className="about-body">
          <Reveal>
            {about.body.map((b) => (
              <p key={b} className="about-body__p">
                {b}
              </p>
            ))}
          </Reveal>
          <Stagger as="ul" className="about-beliefs" stagger={0.12}>
            {about.beliefs.map((b) => (
              <StaggerItem as="li" key={b}>
                {b}
              </StaggerItem>
            ))}
            <StaggerItem as="li" className="about-beliefs__action">
              {about.action}
            </StaggerItem>
          </Stagger>
        </div>
        <div className="mt-24">
          <Statement lines={about.highlight} />
        </div>
      </Section>

      <Section className="border-t border-line">
        <Team />
      </Section>

      <section className="ps-section ps-inverse vision-band" aria-label={vision.eyebrow}>
        <Pluto size={88} charon className="vision-band__pluto" />
        <div className="ps-container vision">
          <SectionHeader eyebrow={vision.eyebrow} title={vision.headline} lead={vision.intro} />
          <div>
            <p className="vision__where">{vision.where}</p>
            <VisionFlow />
            <Reveal>
              <p className="vision__every">{vision.every}</p>
            </Reveal>
          </div>
          <Statement lines={[vision.closing]} className="vision__closing" />
        </div>
      </section>

      <Section>
        <SectionHeader eyebrow={clients.eyebrow} title={clients.headline} lead={clients.lead} />
        <div className="mt-12">
          <ClientStrip names={clients.names} label={clients.eyebrow} />
        </div>
        <Reveal className="mt-8">
          <Button href={ctas.built.href} variant="link">
            {ctas.built.label}
          </Button>
        </Reveal>
      </Section>

      <FinalCta />
    </Page>
  );
}
