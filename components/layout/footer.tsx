import Link from "next/link";
import { brand, footer } from "@/lib/content";
import { Eyebrow } from "@/components/ui";
import { GiantWordmark } from "./giant-wordmark";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="ps-container">
        <div className="site-footer__top">
          <div>
            <p className="ps-wordmark">{brand.name}</p>
            <p className="site-footer__social">{brand.social}</p>
            <Eyebrow parts={brand.descriptor} />
          </div>
          <div className="site-footer__cols">
            {footer.columns.map((col) => (
              <div key={col.title}>
                <p className="ps-eyebrow">{col.title}</p>
                <ul>
                  {col.links.map((l) => (
                    <li key={l.label}>
                      {l.href.startsWith("/") ? (
                        <Link href={l.href}>{l.label}</Link>
                      ) : (
                        <a href={l.href}>{l.label}</a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <GiantWordmark text={brand.name} />
        <p className="site-footer__legal">{footer.copyright}</p>
      </div>
    </footer>
  );
}
