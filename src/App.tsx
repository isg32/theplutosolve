import { Route, Routes } from 'react-router'
import Footer from './components/Footer'
import Header from './components/Header'
import { BackToTop, ScrollToTop } from './components/Utilities'
import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Testimonials from './pages/Testimonials'
import NotFound from './pages/NotFound'
import OurWork from './pages/OurWork'
import WhatWeDo from './pages/WhatWeDo'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/what-we-do" element={<WhatWeDo />} />
          <Route path="/our-work" element={<OurWork />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
