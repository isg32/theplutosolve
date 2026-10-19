import Link from "next/link";
import { brand, footer, plutoJokes } from "@/lib/content";
import { Pluto } from "@/components/art/pluto";
import { Eyebrow, Wordmark } from "@/components/ui";
import { GiantWordmark } from "./giant-wordmark";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="ps-container">
        <div className="site-footer__top">
          <div>
            <p className="ps-wordmark">
              <Wordmark />
            </p>
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
        <GiantWordmark text={brand.name} accentFrom={brand.name.indexOf("Solve")} />
        <div className="site-footer__legal">
          <p>{footer.copyright}</p>
          <p className="pluto-footnote">
            <Pluto size={16} />
            {plutoJokes.footer}
          </p>
        </div>
      </div>
    </footer>
  );
}
