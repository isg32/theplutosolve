import { Page } from "@/components/layout/page";
import { Button } from "@/components/ui";
import { CoverBlocks } from "@/components/art/cover-blocks";
import { ctas } from "@/lib/content";

export default function NotFound() {
  return (
    <Page>
      <section className="page-hero">
        <div className="ps-container page-hero__inner">
          <div className="page-hero__copy">
            <p className="ps-eyebrow">404</p>
            <h1 className="ps-display">This page isn&apos;t part of the system.</h1>
            <div className="hero__ctas">
              <Button href="/">Return to PlutoSolve</Button>
              <Button href={ctas.build.href} variant="secondary">
                {ctas.build.label}
              </Button>
            </div>
          </div>
          <CoverBlocks className="page-hero__art" />
        </div>
      </section>
    </Page>
  );
}
