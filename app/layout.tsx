import type { Metadata } from "next";
import { SiteNav } from "@/components/layout/site-nav";
import { Footer } from "@/components/layout/footer";
import { MotionProvider } from "@/components/layout/motion-provider";
import { brand } from "@/lib/content";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://plutosolve.com"),
  title: {
    default: `${brand.name} — ${brand.tagline}`,
    template: `%s — ${brand.name}`,
  },
  description: brand.supporting,
  openGraph: {
    siteName: brand.name,
    title: `${brand.name} — ${brand.social}`,
    description: brand.supporting,
    type: "website",
  },
};

// Runs before paint so the stored or OS theme applies without a flash.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <MotionProvider>
          <SiteNav />
          {children}
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
