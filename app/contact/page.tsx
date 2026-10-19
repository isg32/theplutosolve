import type { Metadata } from "next";
import { Page } from "@/components/layout/page";
import { FinalCta } from "@/components/sections";
import { finalCta } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: `${finalCta.headline} ${finalCta.lead}`,
};

export default function Contact() {
  return (
    <Page>
      <div className="contact-page">
        <FinalCta headingLevel="h1" />
      </div>
    </Page>
  );
}
