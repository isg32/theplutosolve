import Page from '../components/Page'
import { Btn } from '../components/ui'

export default function NotFound() {
  return (
    <Page title="Page not found — PlutoSolve" description="The page you’re looking for doesn’t exist." path="/404">
      <section className="nf wrap">
        <span className="eyebrow" data-hero-item>Error 404</span>
        <div className="big grad" data-hero-item>404</div>
        <h1 data-hero-item style={{ fontSize: 'clamp(1.6rem,3vw,2.2rem)' }}>This page has moved on.</h1>
        <p data-hero-item>The link may be broken or the page may have been removed. Let’s get you back on track.</p>
        <div className="cta" data-hero-item>
          <Btn to="/">Back to home</Btn>
          <Btn to="/contact" variant="s" arrow={false}>Contact us</Btn>
        </div>
      </section>
    </Page>
  )
}
