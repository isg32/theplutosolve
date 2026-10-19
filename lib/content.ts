// All site copy, verbatim from data/PLUTOSOLVE website Content-1.pdf.

export const brand = {
  name: "PlutoSolve",
  positioning: "PlutoSolve is a Growth Systems Agency.",
  tagline: "We Build Systems That Drive Growth.",
  supporting:
    "We combine strategy, technology, marketing and execution to build systems that generate leads, enable teams and drive revenue.",
  descriptor: ["Strategy", "Technology", "Marketing", "Execution"],
  philosophy: "Growth isn't a service. It's a system.",
  promise: "We don't just deliver services. We build systems around outcomes.",
  social: "Growth Systems. Built to Perform.",
  email: "hello@plutosolve.com",
};

export type NavItem = { label: string; href: string };

export const nav: NavItem[] = [
  { label: "What We Do", href: "/what-we-do" },
  { label: "Industries", href: "/industries" },
  { label: "Our Approach", href: "/approach" },
  { label: "Our Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const ctas = {
  build: { label: "Build Your Growth System", href: "/contact" },
  work: { label: "Explore Our Work", href: "/work" },
  conversation: { label: "Start a Conversation", href: `mailto:hello@plutosolve.com` },
  built: { label: "See What We've Built", href: "/work" },
};

export const hero = {
  headline: "We Build Systems That Drive Growth.",
  lead: "PlutoSolve is a Growth Systems Agency that helps businesses build the technology, marketing engines and processes they need to generate leads, acquire customers, improve operations and grow revenue.",
  lines: ["We don't just deliver individual services.", "We build the system around the outcome."],
  supporting: "From strategy to execution — we build what makes growth happen.",
};

export const trusted = {
  heading: "Trusted to solve important problems.",
  copy: "We've worked with organisations, businesses and brands across industries to build digital products, marketing engines and business systems.",
  clients: ["Amar Ujala", "Times", "News First", "Exemplar Point", "Chain & Wire"],
};

// Not in the PDF: added at the owner's request to say we take on small work too.
export const scale = {
  eyebrow: "Every size of project",
  headline: ["Small projects. Large projects.", "The same care."],
  lead: "Some of our work starts with a single landing page or one campaign. Some of it runs across an entire organisation.",
  body: "We take on the smallest projects as readily as the largest — and give each one the same attention.",
  closing: ["If it matters to your business,", "it matters to us."],
  pluto: "Pluto was demoted for being small. We don't do that to projects.",
};

// Light touches of humour around the name. Not in the PDF.
export const plutoJokes = {
  footer: "Pluto is still a planet here.",
  notFound: "Pluto knows the feeling.",
};

export const idea = {
  eyebrow: "The way we think",
  headline: ["Growth isn't a service.", "It's a system."],
  intro: "Businesses rarely have just one problem.",
  problems: [
    { node: "Website", line: "A website may not convert." },
    { node: "Leads", line: "Leads may not be followed up properly." },
    { node: "Marketing", line: "Marketing may operate separately from sales." },
    { node: "Data", line: "Data may sit across multiple platforms." },
    { node: "Processes", line: "Teams may still rely on manual processes." },
    { node: "Technology", line: "Technology may exist without a clear business purpose." },
  ],
  turn: ["These aren't isolated problems.", "They're connected."],
  body: "At PlutoSolve, we look at the entire growth journey and identify what needs to be built, connected or improved.",
  builds: [
    "That could mean a website.",
    "A marketing engine.",
    "A custom dashboard.",
    "A digital product.",
    "An automated workflow.",
    "A lead management system.",
    "Or a combination of all of them.",
  ],
  closing: ["We don't just build the individual pieces.", "We build how the pieces work together."],
};

export const about = {
  eyebrow: "About us",
  headline: ["We sit at the intersection of Technology,", "Marketing and Business."],
  intro: "PlutoSolve was built around a simple idea:",
  idea: "Businesses grow better when their technology, marketing and processes work together.",
  body: [
    "We partner with businesses and organisations to turn business objectives into practical growth systems.",
    "Our work can span strategy, technology, marketing, data, automation and execution — depending on what the business actually needs.",
  ],
  beliefs: [
    "We don't believe in building technology for the sake of technology.",
    "We don't believe in running marketing simply to generate activity.",
    "And we don't believe strategy should end in a presentation.",
  ],
  action: "We build, launch, measure and improve.",
  highlight: ["Strategy that gets built.", "Technology that gets used.", "Marketing that gets measured."],
};

export const vision = {
  eyebrow: "Our vision",
  headline: ["Build better systems.", "Create measurable growth."],
  intro: "We believe the next generation of businesses will be built around connected systems.",
  where: "Where:",
  roles: [
    { from: "Marketing", verb: "generates", to: "demand" },
    { from: "Technology", verb: "captures", to: "it" },
    { from: "Data", verb: "informs", to: "decisions" },
    { from: "Processes", verb: "enable", to: "teams" },
    { from: "Automation", verb: "removes", to: "friction" },
  ],
  every: "And every part works towards growth.",
  closing: "PlutoSolve exists to help businesses build that connection.",
};

export type Capability = {
  index: string;
  title: string;
  sub: string;
  desc: string[];
  list: string[];
  highlight?: string[];
  glyph: "strategy" | "technology" | "marketing" | "data";
};

export const capabilitiesIntro = {
  eyebrow: "Our capabilities",
  headline: "Everything your growth system needs.",
  lead: [
    "We don't organise our work around a long list of disconnected services.",
    "We organise it around what the business needs to achieve.",
  ],
};

export const capabilities: Capability[] = [
  {
    index: "01",
    title: "Growth Strategy",
    sub: "Turn business objectives into a growth system.",
    desc: [
      "We help businesses identify opportunities, understand their customers and design the strategy required to acquire and retain them.",
    ],
    list: [
      "Growth Strategy",
      "Go-to-Market Strategy",
      "Customer Acquisition",
      "Lead Generation Strategy",
      "Marketing Strategy",
      "Funnel Strategy",
      "Conversion Strategy",
      "Business & Digital Consulting",
    ],
    glyph: "strategy",
  },
  {
    index: "02",
    title: "Technology & Digital Products",
    sub: "Build the technology behind the business.",
    desc: ["We design and build digital products and platforms that solve real business problems."],
    list: [
      "Business Websites",
      "Web Applications",
      "Custom Dashboards",
      "Admin Panels",
      "Customer Portals",
      "Education Platforms",
      "Digital Products",
      "Internal Business Tools",
      "Custom Systems",
      "Automation Platforms",
    ],
    highlight: [
      "We don't build technology because it looks impressive.",
      "We build it because the business needs it.",
    ],
    glyph: "technology",
  },
  {
    index: "03",
    title: "Marketing & Customer Acquisition",
    sub: "Build the engine that brings customers in.",
    desc: ["We create measurable acquisition systems that connect brand, content, media and conversion."],
    list: [
      "Performance Marketing",
      "Google Ads",
      "Meta Ads",
      "SEO",
      "Social Media",
      "Content Strategy",
      "Lead Generation",
      "Conversion Optimization",
      "Digital Campaigns",
      "Brand Strategy",
    ],
    highlight: ["Traffic is not growth.", "The system that turns attention into customers is."],
    glyph: "marketing",
  },
  {
    index: "04",
    title: "Data, Automation & Operations",
    sub: "Connect the pieces behind the business.",
    desc: [
      "As businesses grow, complexity grows with them.",
      "We build systems that give teams better visibility, reduce manual work and create more efficient processes.",
    ],
    list: [
      "Business Dashboards",
      "CRM & Lead Management",
      "Marketing Automation",
      "Process Automation",
      "Data Workflows",
      "Reporting Systems",
      "Performance Tracking",
      "Operational Systems",
      "Integrations",
    ],
    glyph: "data",
  },
];

export const approach = {
  eyebrow: "Our approach",
  headline: "We build around the outcome.",
  lead: "Every PlutoSolve engagement starts with the business objective — not with a predefined service.",
  steps: [
    {
      index: "01",
      title: "Understand",
      chain: ["Business", "Customer", "Problem", "Opportunity"],
      desc: "We understand the business, its customers, existing systems and the problem that needs to be solved.",
    },
    {
      index: "02",
      title: "Strategize",
      chain: ["Objective", "Strategy", "Journey", "System"],
      desc: "We determine what needs to change, what needs to be built and how the different pieces should work together.",
    },
    {
      index: "03",
      title: "Build",
      chain: ["Technology", "Marketing", "Processes", "Automation"],
      desc: "We bring the strategy to life through technology, marketing and operational systems.",
    },
    {
      index: "04",
      title: "Launch",
      chain: ["Deploy", "Activate", "Acquire"],
      desc: "We launch the system and put it into the real world.",
    },
    {
      index: "05",
      title: "Optimize",
      chain: ["Measure", "Learn", "Improve", "Scale"],
      desc: "We measure what is working, identify opportunities and continuously improve the system.",
    },
  ],
  closing: ["Build once. Learn continuously. Grow systematically."],
};

export const systems = {
  eyebrow: "The system",
  headline: ["Different businesses need different", "systems."],
  flows: [
    {
      label: "One business",
      caption: "For one business, the growth system might be:",
      nodes: ["Website", "Google Ads", "Landing Page", "Lead Capture", "CRM", "Sales Team"],
    },
    {
      label: "Another",
      caption: "For another:",
      nodes: ["Digital Product", "User Acquisition", "Dashboard", "Data", "Automation"],
    },
    {
      label: "Education",
      caption: "For an education organisation:",
      nodes: ["Student Registration", "Examination Platform", "Results", "Dashboard", "Communication", "Marketing"],
    },
    {
      label: "E-commerce",
      caption: "For an e-commerce brand:",
      nodes: ["Brand", "Website", "Performance Marketing", "Conversion", "Retention", "Analytics"],
    },
  ],
  closing: ["There is no universal system.", "We build the one your business needs."],
};

export const industries = {
  eyebrow: "Where we've worked",
  headline: ["Different industries. Different problems.", "One approach."],
  lead: "Our experience spans multiple industries and business models.",
  items: [
    {
      title: "Education & EdTech",
      desc: "Digital platforms, Olympiads, student journeys, education dashboards, registration systems and acquisition.",
    },
    {
      title: "Media & Publishing",
      desc: "Digital initiatives, audience engagement, campaigns, platforms and technology-led experiences.",
    },
    {
      title: "FMCG & Consumer Brands",
      desc: "Brand building, digital presence, customer acquisition, social media and performance marketing.",
    },
    { title: "E-commerce & D2C", desc: "Websites, product journeys, acquisition, conversion and customer growth." },
    {
      title: "Hospitality & Food",
      desc: "Digital presence, social media, customer acquisition and revenue-focused marketing.",
    },
    {
      title: "Professional Services",
      desc: "Websites, lead generation, dashboards, automation and digital infrastructure.",
    },
    {
      title: "Technology",
      desc: "Web applications, digital products, dashboards, internal systems and custom development.",
    },
    { title: "Healthcare", desc: "Digital communication, customer acquisition and technology-enabled experiences." },
    { title: "Real Estate", desc: "Lead generation, digital marketing, websites and customer acquisition systems." },
    { title: "Retail", desc: "Digital presence, customer acquisition, branding and performance marketing." },
    {
      title: "Startups & Emerging Businesses",
      desc: "From the first digital product to a complete growth infrastructure.",
    },
  ],
  closing: ["We don't bring an industry template.", "We understand the problem and build around it."],
};

export const clients = {
  eyebrow: "Selected partners",
  headline: ["Trusted by organisations across", "industries."],
  lead: "We've worked with established organisations, growing businesses and emerging brands across technology, education, media, consumer and professional services.",
  names: [
    "Amar Ujala",
    "The Honest Home Company",
    "News First",
    "Exemplar Point",
    "Chain & Wire",
    "Temple of Learning",
    "Programming Hub",
    "Adornn Herbal",
    "People For Animals Uttarakhand",
  ],
};

export const why = {
  eyebrow: "Why PlutoSolve",
  headline: "We don't fit the traditional agency model.",
  reasons: [
    {
      index: "01",
      title: "Business First",
      sub: "We start with the business problem, not the service.",
      body: ["Instead of asking:", "“Do you need a website?”", "we ask:", "“What are you trying to achieve?”"],
    },
    {
      index: "02",
      title: "Strategy + Execution",
      sub: "Strategy means very little if it never gets built.",
      body: [
        "We combine strategic thinking with the ability to actually design, develop, launch and execute.",
      ],
      strong: "Think it. Build it. Launch it. Improve it.",
    },
    {
      index: "03",
      title: "Technology + Marketing",
      sub: "Most agencies specialise in one side.",
      body: [
        "Technology companies build the infrastructure.",
        "Marketing agencies generate the demand.",
        "We understand the relationship between both.",
      ],
      strong: "Because generating demand is only useful when the system can capture it.",
    },
    {
      index: "04",
      title: "Built Around Your Business",
      sub: "We don't force every business into the same package.",
      body: ["Your customers, processes, technology and growth challenges are unique."],
      strong: "The system should be too.",
    },
    {
      index: "05",
      title: "Outcome Over Output",
      sub: "A website is an output.",
      body: [
        "A dashboard is an output.",
        "A campaign is an output.",
        "None of them are the actual goal.",
        "The goal is what they create:",
      ],
      outcomes: ["More qualified leads.", "More customers.", "Better decisions.", "Better processes.", "More revenue."],
    },
  ] as {
    index: string;
    title: string;
    sub: string;
    body: string[];
    strong?: string;
    outcomes?: string[];
  }[],
};

export const audiences = {
  eyebrow: "Is PlutoSolve right for you?",
  headline: "Built for businesses that want to move.",
  lead: "We work particularly well with:",
  items: [
    { title: "Growing Businesses", desc: "You have traction. Now you need stronger systems to scale it." },
    {
      title: "Established Organisations",
      desc: "You have existing operations but need better technology, digital infrastructure or customer acquisition.",
    },
    {
      title: "Startups & Founders",
      desc: "You have an idea or business model and need to turn it into something real.",
    },
    {
      title: "Brands Looking to Scale",
      desc: "You already have customers and want a more structured, measurable growth engine.",
    },
    {
      title: "Small Businesses & First Projects",
      desc: "You don't need a large budget or a complete brief. A single page, one campaign or one process is a good place to start.",
    },
    {
      title: "Organisations With Complex Problems",
      desc: "The problem doesn't fit neatly into “marketing” or “technology” — it requires both.",
    },
  ],
  closing: ["If the problem is bigger than a single service,", "that's where we do our best work."],
};

export const principle = {
  eyebrow: "Our principle",
  headline: ["Don't buy another service.", "Build something that works."],
  pairs: [
    { a: "website", b: "marketing", line: "Your website should work for your marketing." },
    { a: "marketing", b: "sales", line: "Your marketing should work for your sales." },
    { a: "data", b: "decisions", line: "Your data should work for your decisions." },
    { a: "technology", b: "team", line: "Your technology should work for your team." },
  ],
  every: "And every part should work towards the same objective:",
  outcome: "Growth.",
};

export const finalCta = {
  eyebrow: "Let's build",
  headline: "Have a growth problem worth solving?",
  lead: "Tell us what you're trying to build, improve or scale.",
  body: "We'll help you understand what the system needs to look like — and then build it.",
};

export const footer = {
  columns: [
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "What We Do", href: "/what-we-do" },
        { label: "Industries", href: "/industries" },
        { label: "Our Work", href: "/work" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Capabilities",
      links: [
        { label: "Growth Strategy", href: "/what-we-do#growth-strategy" },
        { label: "Technology & Digital Products", href: "/what-we-do#technology-digital-products" },
        { label: "Marketing & Acquisition", href: "/what-we-do#marketing-customer-acquisition" },
        { label: "Data & Automation", href: "/what-we-do#data-automation-operations" },
      ],
    },
    {
      title: "Connect",
      links: [
        { label: "LinkedIn", href: "https://www.linkedin.com/" },
        { label: "Instagram", href: "https://www.instagram.com/" },
        { label: "Email", href: "mailto:hello@plutosolve.com" },
      ],
    },
  ],
  copyright: "© 2026 PlutoSolve. All rights reserved.",
};

export const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
