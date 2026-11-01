export type Service = {
  letter: string
  name: string
  short: string
  covers: string
  headline: string
  body: string
  items: string[]
  closing: string
}

export const services: Service[] = [
  {
    letter: 'M',
    name: 'Marketing',
    short: 'Get noticed. Reach the right people. Turn interest into enquiries.',
    covers: 'SEO, Google Ads, Meta Ads, social media, content, campaigns and lead generation.',
    headline: 'Help the right people find you.',
    body: 'Good marketing gives people a reason to notice your business—and a clear next step when they do. We help plan and run digital marketing that builds visibility, attracts relevant audiences and brings in potential customers.',
    items: ['SEO', 'Google Ads', 'Meta Ads', 'Performance Marketing', 'Social Media Management', 'Content Planning', 'Lead Generation', 'Digital Campaigns', 'Marketing Strategy & Consulting'],
    closing: 'From building awareness to generating enquiries, we help your marketing work towards a clear business goal.',
  },
  {
    letter: 'W',
    name: 'Websites & Technology',
    short: 'Give your business the digital tools it needs.',
    covers: 'Business websites, landing pages, web applications, dashboards, portals and custom platforms.',
    headline: 'Build the digital experience your business needs.',
    body: 'Your website is often where a first impression becomes a decision. And sometimes your business needs more than a website. We design and develop digital platforms and tools that help customers interact with you and help your team get work done.',
    items: ['Business Websites', 'Landing Pages', 'Web Applications', 'Custom Dashboards', 'Admin Panels', 'Customer Portals', 'Education Platforms', 'Internal Business Tools', 'Custom Digital Products'],
    closing: 'From a simple business website to a custom platform, the work starts with what you need it to do.',
  },
  {
    letter: 'B',
    name: 'Branding & Creative',
    short: 'Make your business clear, consistent and memorable.',
    covers: 'Brand strategy, visual identity, creative design, content planning and campaign communication.',
    headline: 'Give your business a voice and a look people remember.',
    body: 'A strong brand makes it easier for people to recognise you, understand what you offer and remember your business. We help shape how your business looks, sounds and communicates across its digital touchpoints.',
    items: ['Brand Strategy', 'Brand Identity', 'Creative Design', 'Social Media Content', 'Content Planning', 'Campaign Creatives', 'Website Copywriting'],
    closing: 'Clear communication builds recognition. Consistency helps it last.',
  },
  {
    letter: 'A',
    name: 'Business Tools & Automation',
    short: 'Make everyday work easier to manage.',
    covers: 'CRM and lead management, reporting dashboards, workflow automation, integrations and internal tools.',
    headline: 'Make the work behind the business easier.',
    body: 'As a business grows, keeping track of leads, information and everyday tasks can become difficult. We help create practical tools and workflows that organise information, reduce repetitive work and give teams a clearer view of what is happening.',
    items: ['CRM & Lead Management', 'Business Dashboards', 'Reporting Systems', 'Workflow Automation', 'Marketing Automation', 'Data Workflows', 'System Integrations', 'Custom Internal Tools'],
    closing: 'Less time managing scattered information. More clarity for the people doing the work.',
  },
]

export const clients = [
  'Amar Ujala / AUNO',
  'The Honest Home Company',
  'News First',
  'Exemplar Point',
  'Chain & Wire',
  'Temple of Learning',
  'Programming Hub',
  'Adornn Herbal',
  'People For Animals Uttarakhand',
  'CospaceZ',
  'Maverick Minds Connexion',
  'Gourmet Organic Kitchen',
  'Moondust Cafe',
]

export const industries: [string, string][] = [
  ['Education & EdTech', 'Websites, student journeys, education platforms, Olympiad initiatives and dashboards.'],
  ['Media & Publishing', 'Digital initiatives, campaigns, audience engagement and supporting platforms.'],
  ['FMCG & Consumer Brands', 'Brand identity, digital presence, social media and customer acquisition.'],
  ['E-commerce & D2C', 'Websites, product journeys, online campaigns and customer growth.'],
  ['Hospitality & Food', 'Digital presence, social media, local campaigns and customer acquisition.'],
  ['Professional Services', 'Business websites, lead generation, dashboards and digital tools.'],
  ['Technology', 'Web applications, digital products, dashboards and custom development.'],
  ['Healthcare', 'Digital communication, online presence and customer acquisition support.'],
  ['Real Estate', 'Websites, digital marketing, lead generation and enquiry management.'],
  ['Retail', 'Brand communication, digital presence and customer acquisition.'],
  ['Startups & Emerging Businesses', 'Brand building, websites, digital products and early customer acquisition.'],
]

export type Project = { slug: string; name: string; category: string; text: string; tags: string[]; url?: string; links?: { label: string; href: string }[] }

export const projects: Project[] = [
  { slug: 'hemm', name: 'HEMM', category: 'Commerce', text: 'A storefront for a women’s label whose trousers, skirts and co-ords are embroidered, beaded and finished by hand.', tags: ['Storefront design', 'E-commerce development', 'Made-to-order flow'], url: 'https://hemm-storefront.vercel.app' },
  { slug: 'nava-dishe', name: 'Nava Dishe', category: 'Education', text: 'A free, statewide talent exam for Class 10, 11 and 12 students across all 31 districts of Karnataka, presented by News First.', tags: ['Website design & development', 'Campaign landing page'], url: 'https://navadishe.vercel.app' },
  { slug: 'india-today-schools', name: 'India Today × Schools', category: 'Education', text: 'An exclusive preview invitation for school principals and coordinators to Eyewitness to a Nation — five decades of India Today’s journalism on the big screen.', tags: ['Website design & development', 'Event registration'], url: 'https://indiatodayxschools.vercel.app' },
  { slug: 'prima', name: 'Prima', category: 'Property & stays', text: 'A bilingual website for two residential projects in Ahmedabad: Prima Sky, 3 BHK homes and shops off S.P. Ring Road, and Prima Residency.', tags: ['Website design & development', 'English & Gujarati', 'Lead capture'], url: 'https://prima-sky-one.vercel.app' },
  { slug: 'sumaani', name: 'Sumaani', category: 'Commerce', text: 'An online store for Sumaani’s alcohol-free attars, sold singly and in curated two- and four-pack combinations.', tags: ['Website design & development', 'E-commerce', 'Customer accounts'], url: 'https://www.sumaani.in' },
  { slug: 'educators-federation', name: 'Educators Federation', category: 'Education', text: 'The website for a collaborative platform of educators, school leaders, institutions and innovators working towards Viksit Bharat @2047.', tags: ['Website design & development', 'Content structure', 'Membership'], url: 'https://educatorsfederation.vercel.app' },
  { slug: 'shia-bazaar', name: 'Shia Bazaar', category: 'Commerce', text: 'An online store for Islamic books and religious gifts, with a catalogue of more than 1,300 items in Urdu, Hindi, Bengali and Arabic.', tags: ['Website design & development', 'E-commerce', 'Catalogue'], url: 'https://shiabazaar.vercel.app' },
  { slug: 'amar-ujala-disha', name: 'DISHA Scholarship', category: 'Education', text: 'The website for DISHA, Amar Ujala’s annual scholarship exam for Classes 10 to 12, along with a partner dashboard for information sharing and coordination.', tags: ['Website design & development', 'Partner dashboard', 'Tech solutions'], url: 'https://disha.amarujaladigital.com' },
  { slug: 'national-olympiads', name: 'National Olympiads', category: 'Education', text: 'The website for National Olympiads by Amar Ujala, and the printed student registration form that goes with it.', tags: ['Website development', 'Registration form design'] },
  { slug: 'chains-and-spares', name: 'Chains & Spares', category: 'Commerce', text: 'A lead-generation website with a structured product catalogue for a Hyderabad supplier of industrial chains, lifting equipment and spares.', tags: ['Website design & development', 'Product catalogue', 'Lead generation'], url: 'https://www.chainsandspares.com' },
  { slug: 'cf-design', name: 'CF Design', category: 'Brands & causes', text: 'A website and a printed brochure for CF Design — two brothers doing custom carpentry, fencing, decking and outdoor builds in the Bay Area.', tags: ['Website design & development', 'Brochure design'], url: 'https://cf.design' },
  { slug: 'adelphia', name: 'Adelphia Girls Hostel', category: 'Property & stays', text: 'A website, Instagram management and lead-generating Meta Ads for a girls’ hostel in Dehradun, close to UPES and BFIT.', tags: ['Website design & development', 'Instagram management', 'Meta Ads'], url: 'https://www.adelphiagirlshostel.com', links: [{ label: 'Instagram', href: 'https://www.instagram.com/adelphia.dehradun/' }] },
  { slug: 'adornn-herbal', name: 'Adornn Herbal', category: 'Brands & causes', text: 'Instagram, ads and packaging for Adornn Herbal’s herbal hair-care range — turning audience interaction into measurable sales.', tags: ['Social media management', 'Performance marketing', 'Packaging design'], links: [{ label: 'Instagram', href: 'https://www.instagram.com/adornnherbal/' }] },
  { slug: 'honest-home', name: 'The Honest Home Company', category: 'Brands & causes', text: 'Managing and optimising The Honest Home Company’s Instagram presence, for higher engagement, better audience interaction and stronger brand visibility.', tags: ['Social media management'], links: [{ label: 'Instagram', href: 'https://www.instagram.com/thehonesthomeco/' }] },
  { slug: 'pfa-uttarakhand', name: 'People For Animals Uttarakhand', category: 'Brands & causes', text: 'A purpose-driven website for the animal-welfare NGO, to communicate its initiatives and take donations online.', tags: ['Website design & development', 'Online donations'], url: 'https://www.pfauttarakhand.org' },
]

export const filters = ['All', 'Education', 'Commerce', 'Property & stays', 'Brands & causes']

export type Testimonial = { quote: string; name: string; role: string; service: string; photo?: string }

export const testimonials: Testimonial[] = [
  { quote: 'Plutosolve completely transformed our online presence. Our leads tripled within 3 months and the quality of enquiries improved massively. They genuinely care about results.', name: 'Sunitta Swaarup', role: 'Founder, Adornn Herbal', service: 'Performance marketing', photo: 'sunitta-swaarup' },
  { quote: 'We hired Plutosolve to help with marketing asset generation, they communicated clearly and built quality, converting assets that worked with our existing brand. Hiring Plutosolve genuinely took work off of my plate which is more than can be said for many service providers.', name: 'Cal', role: 'Founder, CF Design', service: 'Website development', photo: 'cal' },
  { quote: 'Our brand identity was outdated and confusing. Plutosolve rebuilt it from scratch — logo, colors, tone, everything. Now clients instantly understand what we stand for.', name: 'Arjun Mehta', role: 'Director, MindBridge EdTech', service: 'Branding & creative' },
  { quote: 'Their consulting team helped us restructure our entire marketing funnel. We went from scattered efforts to a tight, measurable system. The clarity they brought is priceless.', name: 'Sneha Nair', role: 'COO, HealthFirst Wellness', service: 'Business consulting' },
  { quote: 'As a startup we needed everything — social media, ads, and a website — without breaking the bank. Plutosolve delivered premium quality at a price that made sense for us.', name: 'Vikram Rao', role: 'Co-Founder, Stackly SaaS', service: 'Digital marketing' },
  { quote: 'Working with Plutosolve feels like having an in-house team fully invested in your success. They don’t just execute — they think with you. Highly recommend.', name: 'Deepika Kapoor', role: 'MD, Kapoor & Co. Services', service: 'SEO & content' },
]

export const testimonial = testimonials[0]

export const whyPoints: [string, string][] = [
  ['Marketing and technology, together.', 'Reaching customers and giving them a good digital experience are connected parts of the same business.'],
  ['Ideas backed by execution.', 'We help shape the plan and do the hands-on work to bring it to life.'],
  ['The work starts with your requirement.', 'We listen first, then recommend the services and approach that make sense for you.'],
  ['One team across different needs.', 'Bring us a marketing, website, branding or technology requirement—or a project that needs a mix.'],
]

export const process: [string, string][] = [
  ['UNDERSTAND', 'We learn about your business, your goals and what you need help with.'],
  ['PLAN', 'We agree on the right scope, priorities and way forward.'],
  ['DELIVER', 'We design, build or execute the work with you.'],
  ['IMPROVE', 'We review what’s working and identify what can be better.'],
]

export const contactOptions = ['Marketing', 'Website & Technology', 'Branding & Creative', 'Business Tools & Automation', 'A combination', 'Not sure yet']

export const EMAIL = 'contact@plutosolve.com'

export const nav = [
  { to: '/', label: 'Home' },
  { to: '/what-we-do', label: 'What We Do' },
  { to: '/our-work', label: 'Our Work' },
  { to: '/about-us', label: 'About Us' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/contact', label: 'Contact' },
]
