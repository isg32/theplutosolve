import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Page } from "@/components/layout/page";
import { Section } from "@/components/ui";
import { Reveal, SplitHeadline, Stagger, StaggerItem } from "@/components/motion/primitives";
import { FinalCta } from "@/components/sections";
import { BrowserFrame, Chip, PhoneFrame, ProjectMonogram } from "@/components/work/frame";
import { testimonials } from "@/lib/people";
import { getProject, projects, size } from "@/lib/work";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: `${p.name} — Our Work`,
    description: p.summary,
    openGraph: p.cover ? { images: [{ url: p.cover, ...size(p.cover) }] } : undefined,
  };
}

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const idx = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(idx + 1) % projects.length];
  const quote = testimonials.find((t) => t.project === p.slug);
  const live = [...(p.url ? [{ label: "Live site", href: p.url }] : []), ...(p.links ?? [])];
  // The cover already fills the hero window, so the gallery starts after it.
  const gallery = p.shots.filter((s) => s.src !== p.cover);

  return (
    <Page>
      <section className="project-hero">
        <div className="ps-container">
          <Reveal y={8}>
            <Link href="/work" className="project-back">
              <span aria-hidden="true">←</span> Our Work
            </Link>
          </Reveal>
          <div className="project-hero__head">
            <div>
              <Reveal y={10}>
                <p className="ps-eyebrow project-hero__eyebrow">
                  <Chip colour={p.colour} />
                  {p.sector}
                </p>
              </Reveal>
              <SplitHeadline lines={[p.name]} as="h1" className="ps-display" onMount delay={0.1} />
              <Reveal delay={0.35}>
                <p className="ps-lead">{p.summary}</p>
              </Reveal>
            </div>
            <Reveal delay={0.45} className="project-meta">
              <dl>
                <div>
                  <dt>Client</dt>
                  <dd>{p.client}</dd>
                </div>
                <div>
                  <dt>What it is</dt>
                  <dd>{p.kind}</dd>
                </div>
                <div>
                  <dt>Services</dt>
                  <dd>{p.services.join(" · ")}</dd>
                </div>
              </dl>
              {live.length > 0 && (
                <div className="project-meta__links">
                  {live.map((l, k) => (
                    <a key={l.href} href={l.href} {...ext} className={k === 0 ? "ps-btn ps-btn--primary" : "ps-btn ps-btn--secondary"}>
                      {k === 0 && p.url ? "Visit the Live Site" : `Open ${l.label}`}{" "}
                      <span className="ps-arrow" aria-hidden="true">
                        →
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </Reveal>
          </div>

          <Reveal delay={0.3} y={40} className="project-stage">
            {p.cover ? (
              <div className="frame-hover project-stage__desktop">
                <BrowserFrame project={p} priority sizes="(max-width: 900px) 92vw, 80vw" />
              </div>
            ) : (
              <div className="project-stage__desktop">
                <div className="frame">
                  <div className="frame__view frame__view--banner">
                    <ProjectMonogram project={p} />
                  </div>
                </div>
              </div>
            )}
            {p.mobile && (
              <div className="project-stage__phone">
                <PhoneFrame project={p} />
              </div>
            )}
          </Reveal>
        </div>
      </section>

      <Section className="border-t border-line">
        <div className="project-story">
          <div>
            <Reveal y={10}>
              <p className="ps-eyebrow">The brief</p>
            </Reveal>
            {p.intro.map((para, k) => (
              <Reveal key={para} delay={0.1 + k * 0.1}>
                <p className={k === 0 ? "project-story__lead" : "project-story__para"}>{para}</p>
              </Reveal>
            ))}
          </div>
          <div>
            <Reveal y={10}>
              <p className="ps-eyebrow">What we built</p>
            </Reveal>
            <Stagger as="ol" className="project-built" stagger={0.06}>
              {p.built.map((b, k) => (
                <StaggerItem as="li" key={b}>
                  <span className="project-built__index">{String(k + 1).padStart(2, "0")}</span>
                  {b}
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </Section>

      {gallery.length > 0 && (
        <Section className="border-t border-line">
          <Reveal y={10}>
            <p className="ps-eyebrow">{p.url ? "Pages we built" : "The work"}</p>
          </Reveal>
          <Stagger as="ul" className="project-gallery" stagger={0.08}>
            {gallery.map((s) => {
              const body = (
                <>
                  <span className="project-gallery__img">
                    <Image src={s.src} {...size(s.src)} alt={`${p.name}: ${s.caption}`} sizes="(max-width: 900px) 92vw, 45vw" />
                  </span>
                  <span className="project-gallery__caption">
                    {s.caption}
                    {s.href && (
                      <span className="project-gallery__go" aria-hidden="true">
                        →
                      </span>
                    )}
                  </span>
                </>
              );
              return (
                <StaggerItem as="li" key={s.src}>
                  {s.href ? (
                    <a href={s.href} {...ext} className="project-gallery__item">
                      {body}
                      <span className="sr-only"> (opens the live page)</span>
                    </a>
                  ) : (
                    <div className="project-gallery__item">{body}</div>
                  )}
                </StaggerItem>
              );
            })}
          </Stagger>
        </Section>
      )}

      {p.pages && (
        <Section className="border-t border-line">
          <div className="project-pages">
            <div>
              <Reveal y={10}>
                <p className="ps-eyebrow">Every page</p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="project-pages__intro">
                  The pages of {p.name}, as they are live today. Each one opens the real page.
                </p>
              </Reveal>
            </div>
            <div className="project-pages__groups">
              {p.pages.map((g) => (
                <Reveal key={g.group} className="project-pages__group">
                  <h3>{g.group}</h3>
                  <ul>
                    {g.items.map((it) => (
                      <li key={it.href}>
                        <a href={it.href} {...ext}>
                          <span>{it.label}</span>
                          <span className="project-pages__path">{new URL(it.href).pathname}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </Section>
      )}

      {quote && (
        <Section className="border-t border-line">
          <Reveal className="project-quote">
            <blockquote>“{quote.quote}”</blockquote>
            <p>
              <strong>{quote.name}</strong> · {quote.role}
            </p>
          </Reveal>
        </Section>
      )}

      <Link href={`/work/${next.slug}`} className="project-next frame-hover">
        <span className="ps-container project-next__inner">
          <span className="ps-eyebrow">Next project</span>
          <span className="project-next__name">
            <Chip colour={next.colour} />
            {next.name}
            <span className="project-next__arrow" aria-hidden="true">
              →
            </span>
          </span>
          <span className="project-next__kind">{next.kind}</span>
        </span>
      </Link>

      <FinalCta />
    </Page>
  );
}
