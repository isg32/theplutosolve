/** Copy for the Our Work page: taken from PlutoSolve_Our_Work_Page_Complete_Copy.docx. */

export const SEO = {
  title: 'Our Work | Websites, Marketing & Business Systems | PlutoSolve',
  description:
    "Explore PlutoSolve's work across website development, dashboards, business systems, digital marketing, branding and creative solutions for businesses across industries.",
}

export const hero = {
  eyebrow: 'OUR WORK',
  headline: 'More than projects. A range of possibilities.',
  support:
    'Every business has a different challenge. Some need a stronger digital presence. Some need a website or platform built from the ground up. Others need better marketing, smarter systems or a brand that stands out. At PlutoSolve, we bring marketing, technology and creative thinking together to turn those requirements into practical solutions.',
  secondary: "Explore the industries we've worked with, the solutions we build and the capabilities we bring to every engagement.",
  primary: 'Explore our capabilities',
  secondaryBtn: 'Request the complete portfolio',
}

export const client = {
  eyebrow: 'OUR CLIENT EXPERIENCE',
  headline: 'Built around different businesses. Driven by different challenges.',
  support:
    "We've had the opportunity to work with businesses, brands and organisations across different categories—from education and technology to consumer brands, hospitality and professional services. Each engagement has brought a different brief, a different audience and a different problem to solve. That variety shapes the way we think, plan and deliver.",
  logos: 'A few names from our journey',
  note: 'Selected clients and organisations',
}

export const industry = {
  eyebrow: 'INDUSTRIES',
  headline: 'Different industries. Different perspectives. One adaptable team.',
  support:
    'The way a school reaches students is different from the way a consumer brand earns attention or a service business converts enquiries. We work across varied business environments, adapting the strategy, technology and creative approach to the needs of each audience and organisation.',
  closing:
    'Our experience across sectors helps us bring useful ideas from one business context into another—while keeping every solution relevant to the people it is designed for.',
}

export type Block = { title?: string; text: string }
export type Capability = {
  id: string
  eyebrow: string
  headline: string
  intro: string
  blocks: Block[]
  tags: string[]
  visualHeading: string
  closing?: string
}

export const websites: Capability = {
  id: 'websites',
  eyebrow: 'WEBSITES & DIGITAL PLATFORMS',
  headline: 'Digital experiences built around the way your business works.',
  intro:
    'A website should do more than look good. It should explain what you offer, make it easy for people to take the next step and support the way your business operates. We plan and build digital experiences around real business requirements—from straightforward company websites to content-rich platforms and feature-led web applications.',
  blocks: [
    {
      title: 'From a strong first impression to a platform built to do more.',
      text: 'Our website work spans business and corporate websites, landing pages, e-commerce experiences, WordPress builds, content-led websites and custom web platforms. We consider structure, user journeys, responsive behaviour, content management, integrations, search visibility and performance as part of the overall build—not as afterthoughts.',
    },
    {
      title: 'How we approach a build',
      text: 'We begin by understanding the audience, business objective and functionality required. From there, we shape the site structure, user experience and visual direction, then move into development, content integration, testing and launch. We pay attention to the details that make a website useful after launch: maintainability, speed, accessibility, search readiness and room to evolve.',
    },
    {
      title: 'Technology and tools',
      text: 'Our development approach is selected around the project—not forced into a single stack. Depending on the brief, a build may involve HTML, CSS, JavaScript, WordPress, content-management systems, frontend and backend frameworks, databases, APIs, hosting and deployment services, analytics and AI-assisted development tools.',
    },
    {
      title: 'Scale and performance',
      text: 'We think beyond launch day. The right architecture, hosting setup, optimisation and testing approach matter when a website needs to support growing traffic, larger content libraries or more demanding user journeys. Where a project has load-test results or verified usage data, we can share the relevant scale and performance figures.',
    },
  ],
  tags: [
    'Business & corporate websites', 'E-commerce websites', 'WordPress & CMS-based websites', 'Landing pages', 'Campaign websites',
    'Education & learning platforms', 'Content-rich websites', 'Custom web experiences', 'Responsive design', 'Integrations & APIs', 'Website optimisation & SEO readiness',
  ],
  visualHeading: 'A selection of websites and digital experiences',
}

export const systems: Capability = {
  id: 'systems',
  eyebrow: 'DASHBOARDS & BUSINESS SYSTEMS',
  headline: "When off-the-shelf tools aren't enough, build around your process.",
  intro:
    'As a business grows, spreadsheets, disconnected tools and manual follow-ups can make everyday work harder than it needs to be. We help turn complex processes into clearer digital workflows through dashboards, portals, management systems and custom web applications.',
  blocks: [
    {
      text: 'From organising information and tracking performance to managing users, applications, leads and operations, we build systems that bring the right information into one place. Each solution is shaped around the people who use it and the decisions they need to make.',
    },
    {
      title: 'What goes into a system',
      text: 'A useful system is more than a collection of screens. We consider user roles and permissions, information structure, data flows, forms and workflows, reporting requirements, integrations, security, testing and ongoing maintainability. The aim is to make work easier to manage and information easier to act on.',
    },
    {
      title: 'Technology and implementation',
      text: "Depending on the requirement, solutions may combine frontend interfaces, backend services, databases, APIs, authentication, cloud infrastructure, reporting tools, automation and AI-enabled features. We select the architecture and tools according to the system's purpose, expected usage, data requirements and future scope.",
    },
    {
      title: 'Scale and reliability',
      text: 'We plan for the realities of use: multiple user roles, growing records, operational peaks, data accuracy and dependable access. For systems with documented performance testing or production usage, we can share relevant user, record-volume, response-time or load-test information.',
    },
  ],
  tags: [
    'Management dashboards', 'Admin panels', 'Education & student workflows', 'Counselling & admissions dashboards', 'CRM & lead management',
    'Analytics & reporting', 'Portals & web applications', 'Data management', 'Workflow automation', 'Internal operational tools', 'Integrations',
  ],
  visualHeading: 'A closer look at the systems behind the work',
}

export const marketing: Capability = {
  id: 'marketing',
  eyebrow: 'MARKETING & GROWTH',
  headline: 'Marketing that connects attention to action.',
  intro:
    'Being visible is only the beginning. Businesses need the right message, the right audience and a clear path from discovery to enquiry or purchase. We bring strategy, content, performance campaigns and measurement together to help brands build visibility, generate demand and make better use of their marketing investment.',
  blocks: [
    {
      text: 'Our work can cover the full marketing journey—from understanding the market and shaping the message to building campaigns, improving digital touchpoints and reviewing performance. We combine creative thinking with data so that marketing activity has a clear purpose and a way to measure progress.',
    },
    {
      title: 'How we measure progress',
      text: 'The right measure depends on the business objective. We may track qualified leads, cost per lead, conversion rate, website traffic, search visibility, reach, engagement, customer acquisition cost, revenue contribution or return on advertising spend. We focus on the metrics that help explain whether the work is moving the business in the right direction.',
    },
    {
      text: 'We believe good reporting should make performance understandable—not hide it behind impressive-looking numbers. Where campaign or business data is available, we present the starting point, the period measured, the work undertaken and the result. This gives context to the numbers and helps distinguish activity from actual impact.',
    },
  ],
  tags: [
    'Marketing strategy & consulting', 'SEO', 'Google Ads', 'Meta Ads', 'Social media management', 'Content planning', 'Paid campaigns',
    'Lead generation', 'Landing pages', 'Conversion journeys', 'Analytics & reporting', 'Campaign optimisation',
  ],
  visualHeading: 'Strategy, creative and performance—working together',
}

export const creative: Capability = {
  id: 'creative',
  eyebrow: 'CREATIVE & BRAND IDENTITY',
  headline: 'Make the brand recognisable. Make every interaction feel consistent.',
  intro:
    'A strong brand is more than a logo. It is the way a business looks, sounds and shows up wherever people meet it. We create visual and communication assets that help brands express their personality clearly and maintain a consistent presence across digital and offline touchpoints.',
  blocks: [
    {
      text: 'From the foundations of a visual identity to the creative work that keeps a brand active, we bring strategy, design and communication together. Every piece should have a reason to exist, fit the brand and make the message easier to understand.',
    },
  ],
  tags: [
    'Brand positioning', 'Visual direction', 'Logo & identity systems', 'Brand guidelines', 'Social media creatives', 'Digital ads', 'Campaign design',
    'Posters', 'Brochures', 'Marketing collaterals', 'Pitch decks & presentations', 'Website graphics', 'Copywriting & content direction',
  ],
  visualHeading: 'Creative work, from identity to everyday assets',
  closing: 'Different formats. Different audiences. One consistent focus: make the message clear and the brand memorable.',
}

export const testimonialsCopy = {
  eyebrow: 'CLIENT EXPERIENCES',
  headline: 'Good work is built on good working relationships.',
  intro: "The best measure of a working relationship is what clients think of the experience. Here's what some of the people we've worked with have to say.",
}

export const request = {
  eyebrow: "LET'S EXPLORE WHAT'S POSSIBLE",
  headline: 'Want to see more of what we can do?',
  p1: "What you've seen here is a snapshot of our capabilities. Our detailed portfolio includes more examples of websites, digital platforms, business systems, marketing initiatives and creative work across different requirements and industries.",
  p2: "Tell us a little about what you're looking for. We'll share the most relevant examples and help you understand how we could approach a similar requirement for your business.",
  cta: 'Request the Complete Portfolio',
  formHeading: "Tell us where you'd like to start.",
  fields: {
    name: { label: 'Full name', placeholder: 'Your name' },
    email: { label: 'Work email', placeholder: 'name@company.com' },
    company: { label: 'Company name', placeholder: 'Your organisation (optional)' },
    phone: { label: 'Phone number', placeholder: 'Your contact number (optional)' },
    interest: { label: 'Area of interest', placeholder: "Select what you'd like to explore" },
    context: { label: 'Project context', placeholder: 'Tell us a little about your requirement (optional)' },
  },
  options: [
    'Websites & Digital Platforms',
    'Dashboards & Business Systems',
    'Marketing & Growth',
    'Creative & Brand Identity',
    'More than one area',
    'Complete Portfolio',
    'Not sure yet',
  ],
  submit: 'Send My Request',
  privacy: "We'll use your details to respond to your portfolio request and discuss relevant services. We won't publish your information.",
  success: "Thanks for reaching out. Your request has been received. We'll be in touch shortly with the next steps.",
  error: "We couldn't submit your request just now. Please try again, or contact us directly at",
}

export const BRAND_LINE = 'Ideas to Impact.'
