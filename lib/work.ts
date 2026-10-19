// PlutoSolve's work. Facts come from each live site (crawled October 2026) and
// from the project descriptions on the previous plutosolve.com. Nothing here is
// a claim the sites or the old portfolio don't make themselves.

import media from "./media.json";

export type Sector = "Education" | "Commerce" | "Property & stays" | "Brands & causes";
export const sectors: Sector[] = ["Education", "Commerce", "Property & stays", "Brands & causes"];

export type Shot = { src: string; caption: string; href?: string };
export type PageLink = { label: string; href: string };
export type PageGroup = { group: string; items: PageLink[] };

export type Project = {
  slug: string;
  name: string;
  client: string;
  sector: Sector;
  kind: string; // one line: what it is
  services: string[];
  url?: string;
  links?: PageLink[];
  colour: string; // the project's own brand colour, used as an accent chip
  summary: string;
  intro: string[];
  built: string[];
  cover?: string;
  mobile?: string;
  shots: Shot[];
  pages?: PageGroup[];
  featured?: boolean;
};

const at = (base: string) => (path: string, label: string): PageLink => ({ label, href: base + path });

const hemm = at("https://hemm-storefront.vercel.app");
const sumaani = at("https://www.sumaani.in");
const itx = at("https://indiatodayxschools.vercel.app");
const shia = at("https://shiabazaar.vercel.app");
const prima = at("https://prima-sky-one.vercel.app");
const ef = at("https://educatorsfederation.vercel.app");
const disha = at("https://disha.amarujaladigital.com");
const cas = at("https://www.chainsandspares.com");
const cf = at("https://cf.design");

export const projects: Project[] = [
  {
    slug: "hemm",
    name: "HEMM",
    client: "HEMM",
    sector: "Commerce",
    kind: "E-commerce storefront for a hand-finished clothing label",
    services: ["Storefront design", "E-commerce development", "Made-to-order flow"],
    url: "https://hemm-storefront.vercel.app/",
    colour: "#9a4f32",
    summary:
      "A storefront for a women's label whose trousers, skirts and co-ords are embroidered, beaded and finished by hand.",
    intro: [
      "HEMM makes fewer pieces, properly, in small batches. The store had to feel as considered as the clothes — and still work like a modern shop.",
      "We built the full storefront: seasonal collections, a filterable shop, detailed product pages and a made-to-order path for customers who want a piece cut to their measurements.",
    ],
    built: [
      "Four collections — Terracotta Season, Hand-Embroidered, The Olive Edit and Made to Order",
      "A shop filtered by category, size and fulfilment",
      "Product pages with sizes, pricing and sale states",
      "Made to order: pick a size or send measurements; ready in about three weeks",
      "Order over WhatsApp, with a private payment link for each custom order",
      "Wishlist, plus shipping, returns, terms and privacy pages",
    ],
    cover: "/work/hemm/p0.webp",
    mobile: "/work/hemm/mobile.webp",
    shots: [
      { src: "/work/hemm/p0.webp", caption: "Home", href: hemm("/", "").href },
      { src: "/work/hemm/p1.webp", caption: "Collections", href: hemm("/collections", "").href },
      { src: "/work/hemm/p2.webp", caption: "Hand-Embroidered collection", href: hemm("/collections/hand-embroidered", "").href },
      { src: "/work/hemm/p3.webp", caption: "Product page", href: hemm("/products/scalloped-beaded-mini-skirt", "").href },
      { src: "/work/hemm/p4.webp", caption: "Shop with filters", href: hemm("/shop", "").href },
      { src: "/work/hemm/p5.webp", caption: "About HEMM", href: hemm("/about", "").href },
    ],
    pages: [
      {
        group: "Store",
        items: [
          hemm("/", "Home"),
          hemm("/shop", "Shop"),
          hemm("/new-arrivals", "New arrivals"),
          hemm("/collections", "Collections"),
          hemm("/wishlist", "Wishlist"),
        ],
      },
      {
        group: "Collections",
        items: [
          hemm("/collections/terracotta-season", "Terracotta Season"),
          hemm("/collections/hand-embroidered", "Hand-Embroidered"),
          hemm("/collections/the-olive-edit", "The Olive Edit"),
          hemm("/collections/made-to-order", "Made to Order"),
        ],
      },
      {
        group: "Pieces",
        items: [
          hemm("/products/scalloped-beaded-mini-skirt", "Scalloped Beaded Mini Skirt"),
          hemm("/products/terracotta-panel-wide-leg-trousers", "Panel Wide-Leg Trousers"),
          hemm("/products/floral-embroidered-linen-trousers", "Floral Embroidered Linen Trousers"),
          hemm("/products/wooden-bead-harem-trousers", "Wooden Bead Harem Trousers"),
          hemm("/products/olive-bandeau-harem-co-ord", "Olive Bandeau & Harem Co-ord"),
        ],
      },
      {
        group: "Studio & help",
        items: [
          hemm("/about", "About"),
          hemm("/contact", "Contact"),
          hemm("/shipping", "Shipping"),
          hemm("/returns", "Returns & exchanges"),
          hemm("/terms", "Terms & conditions"),
          hemm("/privacy", "Privacy policy"),
        ],
      },
    ],
    featured: true,
  },
  {
    slug: "nava-dishe",
    name: "Nava Dishe",
    client: "News First",
    sector: "Education",
    kind: "Statewide scholarship and talent exam website",
    services: ["Website design & development", "Campaign landing page"],
    url: "https://navadishe.vercel.app/",
    colour: "#127a72",
    summary:
      "A free, statewide talent exam for Class 10, 11 and 12 students across all 31 districts of Karnataka, presented by News First.",
    intro: [
      "Nava Dishe is an annual, free-of-cost talent recognition examination with prizes worth ₹1 crore. It needed one page that could speak to students, parents and schools at once.",
      "We designed and built a single long page that explains the exam, lets students choose the institutions and direction they want scholarships for, and gets schools registered.",
    ],
    built: [
      "Who can take part: Classes 10, 11 and 12, across CBSE, ICSE and the Karnataka State Board",
      "The exam format, subjects and syllabus",
      "“The Student Chooses the Target” — picking institutions and a direction",
      "From examination to opportunity: what happens after the exam",
      "Statewide reach across all 31 districts",
      "School registration",
    ],
    cover: "/work/nava-dishe/p0.webp",
    mobile: "/work/nava-dishe/mobile.webp",
    shots: [{ src: "/work/nava-dishe/p0.webp", caption: "Home", href: "https://navadishe.vercel.app/" }],
    pages: [{ group: "Site", items: [{ label: "Nava Dishe (single page)", href: "https://navadishe.vercel.app/" }] }],
    featured: true,
  },
  {
    slug: "india-today-schools",
    name: "India Today × Schools",
    client: "India Today",
    sector: "Education",
    kind: "Event invitation and e-pass website",
    services: ["Website design & development", "Event registration"],
    url: "https://indiatodayxschools.vercel.app/",
    colour: "#d71f26",
    summary:
      "An exclusive preview invitation for school principals and coordinators to Eyewitness to a Nation — five decades of India Today's journalism on the big screen.",
    intro: [
      "For fifty years India Today has witnessed India as it changed. Eyewitness to a Nation brings that record together as a cinematic experience, previewed for schools at the India Today Mediaplex in Noida.",
      "We built the invitation: a cinematic page that carries the film's 1975–2025 story, the event details, the programmes schools can join, and a page where invitees collect their e-pass.",
    ],
    built: [
      "A 1975 → 2025 timeline of the moments India Today covered",
      "The film and its trailer",
      "Event details — 10 October 2026, 4:00 PM, Mediaplex, Film City, Noida — with attendance confirmation",
      "Programmes for schools: the India Today Archives, the Mediaplex learning visit, India Today Conclave, Sahitya Aaj Tak and Aaj Tak Masterclass",
      "An e-pass page where invitees retrieve their pass with a code",
    ],
    cover: "/work/india-today-schools/p0.webp",
    mobile: "/work/india-today-schools/mobile.webp",
    shots: [
      { src: "/work/india-today-schools/p0.webp", caption: "Invitation", href: itx("/", "").href },
      { src: "/work/india-today-schools/p1.webp", caption: "Get your e-pass", href: itx("/pass", "").href },
    ],
    pages: [{ group: "Site", items: [itx("/", "Eyewitness to a Nation"), itx("/pass", "Get your e-pass")] }],
    featured: true,
  },
  {
    slug: "prima",
    name: "Prima",
    client: "Shree Balaji Lotus Buildcon LLP",
    sector: "Property & stays",
    kind: "Bilingual real-estate website for two projects",
    services: ["Website design & development", "English & Gujarati", "Lead capture"],
    url: "https://prima-sky-one.vercel.app/",
    colour: "#1f3a5f",
    summary:
      "A bilingual website for two residential projects in Ahmedabad: Prima Sky, 3 BHK homes and shops off S.P. Ring Road, and Prima Residency.",
    intro: [
      "Buyers compare projects quickly, and many prefer to read in Gujarati. The site lets them choose a project first, then explore its homes, floor plans and location — in either language.",
      "Alongside the two projects, the site carries the partners' previous projects and their free property-buying guidance.",
    ],
    built: [
      "A project chooser for Prima Sky and Prima Residency",
      "Prima Sky — 3 BHK homes and shops at Bhadaj, S.P. Ring Road: homes, floor plans and location",
      "Prima Residency — a residential apartment at Ognaj",
      "Previous associated projects",
      "Giving back: free property-buying guidance, a few hours every week",
      "A complete Gujarati version of every page, and WhatsApp enquiries",
    ],
    cover: "/work/prima/p0.webp",
    mobile: "/work/prima/mobile.webp",
    shots: [
      { src: "/work/prima/p0.webp", caption: "Our current projects", href: prima("/", "").href },
      { src: "/work/prima/p1.webp", caption: "Prima Sky", href: prima("/prima-sky", "").href },
      { src: "/work/prima/p2.webp", caption: "Prima Residency", href: prima("/prima-residency", "").href },
      { src: "/work/prima/p3.webp", caption: "Previous associated projects", href: prima("/previous-projects", "").href },
      { src: "/work/prima/p4.webp", caption: "Giving back to society", href: prima("/giving-back", "").href },
    ],
    pages: [
      {
        group: "English",
        items: [
          prima("/", "Our current projects"),
          prima("/prima-sky", "Prima Sky"),
          prima("/prima-residency", "Prima Residency"),
          prima("/previous-projects", "Previous associated projects"),
          prima("/giving-back", "Giving back to society"),
        ],
      },
      {
        group: "ગુજરાતી",
        items: [
          prima("/gu", "અમારા વર્તમાન પ્રોજેક્ટ"),
          prima("/gu/prima-sky", "પ્રાઇમા સ્કાય"),
          prima("/gu/prima-residency", "પ્રાઇમા રેસિડેન્સી"),
          prima("/gu/previous-projects", "અગાઉના સંકળાયેલા પ્રોજેક્ટ"),
          prima("/gu/giving-back", "સમાજ પ્રત્યે અમારું યોગદાન"),
        ],
      },
    ],
    featured: true,
  },
  {
    slug: "sumaani",
    name: "Sumaani",
    client: "Sumaani",
    sector: "Commerce",
    kind: "E-commerce store for attars and perfumes",
    services: ["Website design & development", "E-commerce", "Customer accounts"],
    url: "https://www.sumaani.in/",
    colour: "#6e1f2f",
    summary: "An online store for Sumaani's alcohol-free attars, sold singly and in curated two- and four-pack combinations.",
    intro: [
      "Sumaani's attars are oil-based, alcohol-free and blended to last. The store presents them the way they're gifted and bought — as combinations as much as single bottles.",
      "We built the storefront, the catalogue, customer accounts and the policy pages a store needs to sell with confidence.",
    ],
    built: [
      "Collections of 2-pack and 4-pack combinations, such as Black Oud + Vantara and the Regal Harmony Set",
      "Bestsellers and the full product catalogue",
      "Product pages",
      "Our Story — the brand's making and craft",
      "Customer accounts",
      "Contact, shipping, cancellation, terms and privacy pages",
    ],
    cover: "/work/sumaani/p0.webp",
    mobile: "/work/sumaani/mobile.webp",
    shots: [
      { src: "/work/sumaani/p0.webp", caption: "Home", href: sumaani("/", "").href },
      { src: "/work/sumaani/p3.webp", caption: "Our story", href: sumaani("/about", "").href },
      { src: "/work/sumaani/p4.webp", caption: "Contact", href: sumaani("/contact", "").href },
    ],
    pages: [
      {
        group: "Store",
        items: [sumaani("/", "Home"), sumaani("/products", "Products"), sumaani("/auth", "Sign in")],
      },
      { group: "Brand", items: [sumaani("/about", "Our story"), sumaani("/contact", "Contact")] },
      {
        group: "Policies",
        items: [
          sumaani("/shippingpolicy", "Shipping policy"),
          sumaani("/cancellations", "Cancellations"),
          sumaani("/terms", "Terms"),
          sumaani("/privacypolicy", "Privacy policy"),
        ],
      },
    ],
    featured: true,
  },
  {
    slug: "educators-federation",
    name: "Educators Federation",
    client: "Educators Federation",
    sector: "Education",
    kind: "Website for a national educators' platform",
    services: ["Website design & development", "Content structure", "Membership"],
    url: "https://educatorsfederation.vercel.app/",
    colour: "#152c4f",
    summary:
      "The website for a collaborative platform of educators, school leaders, institutions and innovators working towards Viksit Bharat @2047.",
    intro: [
      "Educators Federation calls itself a movement led by educators rather than another organisation for them. The site had to carry a large idea — eight pillars, many initiatives, policy work — without losing the teacher reading it.",
      "We structured and built fifteen pages, from the mission and pillars to AI in education, policy research, events and membership.",
    ],
    built: [
      "About, vision and mission, and the Eight Pillars",
      "Educators for Viksit Bharat @2047",
      "AI in Education: “AI should empower the teacher — not replace the teacher”",
      "Initiatives such as the Educators Leadership Forum, the AI-Ready Educator Mission and Shikshak Samman",
      "Policy and research, events, and Educator Voices submissions",
      "Joining the federation, contact, and the legal pages",
    ],
    cover: "/work/educators-federation/p0.webp",
    mobile: "/work/educators-federation/mobile.webp",
    shots: [
      { src: "/work/educators-federation/p0.webp", caption: "Home", href: ef("/", "").href },
      { src: "/work/educators-federation/p2.webp", caption: "Our Eight Pillars", href: ef("/about/pillars", "").href },
      { src: "/work/educators-federation/p3.webp", caption: "Viksit Bharat @2047", href: ef("/viksit-bharat-2047", "").href },
      { src: "/work/educators-federation/p4.webp", caption: "AI in Education", href: ef("/ai-in-education", "").href },
      { src: "/work/educators-federation/p5.webp", caption: "Initiatives", href: ef("/initiatives", "").href },
      { src: "/work/educators-federation/p7.webp", caption: "Join the federation", href: ef("/join", "").href },
    ],
    pages: [
      {
        group: "Who we are",
        items: [
          ef("/", "Home"),
          ef("/about", "About"),
          ef("/about/vision-mission", "Vision & mission"),
          ef("/about/pillars", "Our Eight Pillars"),
        ],
      },
      {
        group: "What we do",
        items: [
          ef("/viksit-bharat-2047", "Viksit Bharat @2047"),
          ef("/ai-in-education", "AI in Education"),
          ef("/initiatives", "Initiatives"),
          ef("/policy-research", "Policy & research"),
          ef("/events", "Events"),
        ],
      },
      {
        group: "Take part",
        items: [ef("/educator-voices", "Educator Voices"), ef("/join", "Join"), ef("/contact", "Contact")],
      },
      {
        group: "Legal",
        items: [ef("/privacy-policy", "Privacy policy"), ef("/terms-of-use", "Terms of use"), ef("/disclaimer", "Disclaimer")],
      },
    ],
    featured: true,
  },
  {
    slug: "shia-bazaar",
    name: "Shia Bazaar",
    client: "Shia Bazaar",
    sector: "Commerce",
    kind: "E-commerce store for Islamic books and gifts",
    services: ["Website design & development", "E-commerce", "Catalogue"],
    url: "https://shiabazaar.vercel.app/",
    colour: "#2c5e45",
    summary:
      "An online store for Islamic books and religious gifts, with a catalogue of more than 1,300 items in Urdu, Hindi, Bengali and Arabic.",
    intro: [
      "A large, multilingual catalogue is only useful if people can find their way through it. The store organises over 1,100 books and 140 gifts by category, with search, featured titles and seasonal offers.",
    ],
    built: [
      "Categories for Islamic books, gifts, ladies, gents and other products",
      "Titles across Urdu, Hindi, Bengali and Arabic",
      "Search and an all-products listing",
      "Product pages with pricing and offers",
      "Customer sign-in and cart",
      "Seasonal offers, contact, privacy and terms",
    ],
    cover: "/work/shia-bazaar/p0.webp",
    mobile: "/work/shia-bazaar/mobile.webp",
    shots: [
      { src: "/work/shia-bazaar/p0.webp", caption: "Home", href: shia("/", "").href },
      { src: "/work/shia-bazaar/p1.webp", caption: "Islamic books", href: shia("/category/books", "").href },
      { src: "/work/shia-bazaar/p3.webp", caption: "Product page", href: shia("/products/ahadees-e-qudsiya-urdu", "").href },
      { src: "/work/shia-bazaar/p4.webp", caption: "Contact", href: shia("/contact", "").href },
    ],
    pages: [
      {
        group: "Shop",
        items: [
          shia("/", "Home"),
          shia("/products", "All products"),
          shia("/search", "Search"),
          shia("/auth/sign-in", "Sign in"),
        ],
      },
      {
        group: "Categories",
        items: [
          shia("/category/books", "Islamic books"),
          shia("/category/gifts", "Gifts"),
          shia("/category/ladies", "Ladies"),
          shia("/category/gents", "Gents"),
          shia("/category/other-products", "Other products"),
        ],
      },
      {
        group: "Titles",
        items: [
          shia("/products/ahadees-e-qudsiya-urdu", "Ahadees-e-Qudsiya (Urdu)"),
          shia("/products/imamia-namaz-urdu", "Imamia Namaz (Urdu)"),
          shia("/products/imamia-arabi-awwal", "Imamia Arabi Awwal"),
          shia("/products/imamia-deeniyat-atfaal-bengali", "Imamia Deeniyat Atfaal (Bengali)"),
          shia("/products/anwarul-quran-large", "Anwarul Quran (Large)"),
        ],
      },
      { group: "Help", items: [shia("/contact", "Contact"), shia("/privacy", "Privacy policy"), shia("/terms", "Terms of service")] },
    ],
    featured: true,
  },
  {
    slug: "amar-ujala-disha",
    name: "DISHA Scholarship",
    client: "Amar Ujala",
    sector: "Education",
    kind: "Scholarship exam website and partner dashboard",
    services: ["Website design & development", "Partner dashboard", "Tech solutions"],
    url: "https://disha.amarujaladigital.com/",
    colour: "#f07c1e",
    summary:
      "The website for DISHA, Amar Ujala's annual scholarship exam for Classes 10 to 12, along with a partner dashboard for information sharing and coordination.",
    intro: [
      "DISHA is now in its third edition, with scholarships and prizes worth ₹5 crore. Students need to understand the exam and register; partner schools and organisations need to coordinate behind the scenes.",
      "We designed and developed the exam website, and a partner dashboard so information could be shared and coordinated without friction.",
    ],
    built: [
      "The exam: categories, format, who can apply and how to register",
      "Awards and prizes, the Hall of Fame and partners",
      "A results lookup",
      "Disha Stars — college admission and counselling, with education news and course guides",
      "A partner dashboard for information sharing and coordination",
    ],
    cover: "/work/amar-ujala-disha/p0.webp",
    mobile: "/work/amar-ujala-disha/mobile.webp",
    shots: [
      { src: "/work/amar-ujala-disha/p0.webp", caption: "DISHA 3.0", href: disha("/", "").href },
      { src: "/work/amar-ujala-disha/p1.webp", caption: "Check your results", href: disha("/results.html", "").href },
      { src: "/work/amar-ujala-disha/p2.webp", caption: "Disha Stars", href: disha("/disha-stars.html", "").href },
    ],
    pages: [
      { group: "Exam", items: [disha("/", "DISHA 3.0"), disha("/results.html", "Results")] },
      {
        group: "Disha Stars",
        items: [
          disha("/disha-stars", "College admission & counselling"),
          disha("/disha-stars/news.html", "Education news"),
          disha("/disha-stars/btech-admission-2026", "B.Tech admission 2026"),
          disha("/disha-stars/mba-admission-2026", "MBA admission 2026"),
          disha("/disha-stars/bba-admission-2026", "BBA admission 2026"),
          disha("/disha-stars/sitemap.html", "Site directory"),
        ],
      },
    ],
    featured: true,
  },
  {
    slug: "national-olympiads",
    name: "National Olympiads",
    client: "Amar Ujala",
    sector: "Education",
    kind: "Olympiad website and student registration form",
    services: ["Website development", "Registration form design"],
    colour: "#1d4fa0",
    summary: "The website for National Olympiads by Amar Ujala, and the printed student registration form that goes with it.",
    intro: [
      "An olympiad reaches students two ways: online, and through schools on paper. We built the website and designed the registration form so both paths ask for the same things, clearly.",
    ],
    built: ["The National Olympiads website", "The 2026–27 student registration form"],
    cover: "/work/national-olympiads/website.webp",
    shots: [
      { src: "/work/national-olympiads/website.webp", caption: "National Olympiads website" },
      { src: "/work/national-olympiads/registration-form.webp", caption: "Student registration form 2026–27" },
    ],
  },
  {
    slug: "chains-and-spares",
    name: "Chains & Spares",
    client: "Chains & Spares Corporation",
    sector: "Commerce",
    kind: "Lead-generation website with a product catalogue",
    services: ["Website design & development", "Product catalogue", "Lead generation"],
    url: "https://www.chainsandspares.com/",
    colour: "#e0a800",
    summary:
      "A lead-generation website with a structured product catalogue for a Hyderabad supplier of industrial chains, lifting equipment and spares.",
    intro: [
      "Industrial buyers know what they need and want a price quickly. The site puts a quote request on the first screen and organises the catalogue so buyers can find the exact item and ask about it.",
    ],
    built: [
      "A quote request form on the home page",
      "A structured catalogue: lifting equipment, chains and slings, wire ropes and slings, and more",
      "Sub-categories down to items such as chain pulley blocks and alloy chain slings",
      "The company story, since 1985",
      "WhatsApp contact",
    ],
    cover: "/work/chains-and-spares/p0.webp",
    mobile: "/work/chains-and-spares/mobile.webp",
    shots: [
      { src: "/work/chains-and-spares/p0.webp", caption: "Home with quote form", href: cas("/", "").href },
      { src: "/work/chains-and-spares/p1.webp", caption: "All products", href: cas("/products", "").href },
      { src: "/work/chains-and-spares/p2.webp", caption: "Lifting equipment", href: cas("/products/lifting-equipment", "").href },
      { src: "/work/chains-and-spares/p3.webp", caption: "Our journey since 1985", href: cas("/about", "").href },
    ],
    pages: [
      { group: "Company", items: [cas("/", "Home"), cas("/about", "About")] },
      {
        group: "Catalogue",
        items: [
          cas("/products", "All products"),
          cas("/products/lifting-equipment", "Lifting equipment"),
          cas("/products/lifting-equipment/chain-pulley-blocks", "Chain pulley blocks"),
          cas("/products/lifting-equipment/manual-trolleys", "Manual trolleys"),
          cas("/products/chains-slings", "Chains & slings"),
          cas("/products/chains-slings/alloy-chain-slings", "Alloy chain slings"),
          cas("/products/wire-ropes-slings", "Wire ropes & slings"),
        ],
      },
    ],
  },
  {
    slug: "cf-design",
    name: "CF Design",
    client: "Cal & Fynn",
    sector: "Brands & causes",
    kind: "Website and brochure for a design-and-build business",
    services: ["Website design & development", "Brochure design"],
    url: "https://cf.design/",
    colour: "#33503b",
    summary:
      "A website and a printed brochure for CF Design — two brothers doing custom carpentry, fencing, decking and outdoor builds in the Bay Area.",
    intro: [
      "Cal and Fynn's work sells on trust and on photographs. We built a site that shows the work, makes booking a consultation simple and puts their reviews where people can see them — and a brochure for the doorstep.",
    ],
    built: ["The website", "Consultation inquiries", "Client reviews", "A printed brochure"],
    cover: "/work/cf-design/p0.webp",
    mobile: "/work/cf-design/mobile.webp",
    shots: [
      { src: "/work/cf-design/p0.webp", caption: "Home", href: cf("/", "").href },
      { src: "/work/cf-design/p1.webp", caption: "Reviews", href: cf("/reviews.html", "").href },
      { src: "/work/cf-design/p2.webp", caption: "Book a consultation", href: cf("/inquiries.html", "").href },
      { src: "/work/cf-design/brochure.webp", caption: "Brochure" },
    ],
    pages: [
      {
        group: "Site",
        items: [cf("/", "Home"), cf("/reviews.html", "Reviews"), cf("/inquiries.html", "Book a consultation")],
      },
    ],
  },
  {
    slug: "adelphia",
    name: "Adelphia Girls Hostel",
    client: "Adelphia Girls Hostel",
    sector: "Property & stays",
    kind: "Website, Instagram and Meta Ads for a girls' hostel",
    services: ["Website design & development", "Instagram management", "Meta Ads"],
    url: "https://www.adelphiagirlshostel.com/",
    links: [{ label: "Instagram", href: "https://www.instagram.com/adelphia.dehradun/" }],
    colour: "#d9246b",
    summary:
      "A website, Instagram management and lead-generating Meta Ads for a girls' hostel in Dehradun, close to UPES and BFIT.",
    intro: [
      "Adelphia was started by a mother whose own daughters struggled with hostel life. Parents choosing a hostel want to feel that care before they visit.",
      "We built a user-focused website, managed the hostel's Instagram for engagement, and ran Meta Ads to bring in enquiries.",
    ],
    built: [
      "The website: the founder's story, the Adelphia experience, rooms and amenities, gallery and location",
      "Call and WhatsApp booking from every screen",
      "Instagram management",
      "Meta Ads for lead generation",
    ],
    cover: "/work/adelphia/p0.webp",
    mobile: "/work/adelphia/mobile.webp",
    shots: [
      { src: "/work/adelphia/p0.webp", caption: "Website", href: "https://www.adelphiagirlshostel.com/" },
      { src: "/work/adelphia/insights.webp", caption: "Instagram insights, 30 days" },
    ],
    pages: [{ group: "Site", items: [{ label: "Adelphia Girls Hostel (single page)", href: "https://www.adelphiagirlshostel.com/" }] }],
  },
  {
    slug: "adornn-herbal",
    name: "Adornn Herbal",
    client: "Adornn Herbal",
    sector: "Brands & causes",
    kind: "Social media, performance marketing and packaging",
    services: ["Social media management", "Performance marketing", "Packaging design"],
    links: [{ label: "Instagram", href: "https://www.instagram.com/adornnherbal/" }],
    colour: "#5f6b2a",
    summary:
      "Instagram, ads and packaging for Adornn Herbal's herbal hair-care range — turning audience interaction into measurable sales.",
    intro: [
      "We managed and optimised Adornn Herbal's Instagram presence, ran performance campaigns, and designed packaging for the range, including the Herbaura herbal hair oil.",
    ],
    built: ["Instagram management and content", "Performance marketing", "Packaging design"],
    cover: "/work/adornn-herbal/post.webp",
    shots: [
      { src: "/work/adornn-herbal/post.webp", caption: "Instagram post" },
      { src: "/work/adornn-herbal/packaging.webp", caption: "Herbaura hair oil packaging" },
    ],
  },
  {
    slug: "panache",
    name: "Panache 2026",
    client: "College cultural festival",
    sector: "Education",
    kind: "Event website for a college cultural festival",
    services: ["Website development"],
    colour: "#e0167f",
    summary: "An event website for Panache 2026, a college's annual cultural festival.",
    intro: ["A festival site has one job: get students excited and show them what's on. We built the website for Panache 2026."],
    built: ["The festival website, with its events and contact"],
    cover: "/work/panache/website.webp",
    shots: [{ src: "/work/panache/website.webp", caption: "Panache 2026 website" }],
  },
  {
    slug: "honest-home",
    name: "The Honest Home Company",
    client: "The Honest Home Company",
    sector: "Brands & causes",
    kind: "Social media management",
    services: ["Social media management"],
    links: [{ label: "Instagram", href: "https://www.instagram.com/thehonesthomeco/" }],
    colour: "#4f6645",
    summary:
      "Managing and optimising The Honest Home Company's Instagram presence, for higher engagement, better audience interaction and stronger brand visibility.",
    intro: [
      "We managed and optimised the brand's Instagram presence — driving higher engagement, improved audience interaction and stronger brand visibility.",
    ],
    built: ["Instagram management and optimisation"],
    shots: [],
  },
  {
    slug: "pfa-uttarakhand",
    name: "People For Animals Uttarakhand",
    client: "People For Animals Uttarakhand",
    sector: "Brands & causes",
    kind: "Website for an animal-welfare NGO",
    services: ["Website design & development", "Online donations"],
    url: "https://www.pfauttarakhand.org/",
    colour: "#2f6b4a",
    summary:
      "A purpose-driven website for the animal-welfare NGO, to communicate its initiatives and take donations online.",
    intro: [
      "We built a website that helps People For Animals Uttarakhand communicate its animal-welfare initiatives and facilitate online donations — strengthening outreach and supporting the mission at scale.",
    ],
    built: ["The NGO's website", "Online donations"],
    shots: [],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

/** Image dimensions from lib/media.json (generated from public/). */
export function size(src: string): { width: number; height: number } {
  const d = (media as Record<string, number[]>)[src];
  return d ? { width: d[0], height: d[1] } : { width: 1200, height: 750 };
}

export const workBand = {
  eyebrow: "Selected work",
  headline: ["Things we've built,", "for people we're glad to know."],
  lead: "Storefronts, scholarship platforms, a cinematic invitation, real-estate launches and community websites — each one built around what the business needed.",
};

export const workPage = {
  eyebrow: "Our work",
  headline: ["Work, in the open."],
  lead: "Every project here was delivered for a real client. Open any of them to see what we built, then visit the live pages yourself.",
};
