// Testimonials and team, from the previous plutosolve.com. The owner confirmed
// all six testimonials are genuine. Four had stock avatar photos on the old
// site; those are shown as initials instead.

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  service: string;
  photo?: string;
  project?: string; // slug on /work
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Plutosolve completely transformed our online presence. Our leads tripled within 3 months and the quality of enquiries improved massively. They genuinely care about results.",
    name: "Sunitta Swaarup",
    role: "Founder, Adornn Herbal",
    service: "Performance marketing",
    photo: "/testimonials/sunitta-swaarup.webp",
    project: "adornn-herbal",
  },
  {
    quote:
      "We hired Plutosolve to help with marketing asset generation, they communicated clearly and built quality, converting assets that worked with our existing brand. Hiring Plutosolve genuinely took work off of my plate which is more than can be said for many service providers.",
    name: "Cal",
    role: "Founder, CF Design",
    service: "Website development",
    photo: "/testimonials/cal.webp",
    project: "cf-design",
  },
  {
    quote:
      "Our brand identity was outdated and confusing. Plutosolve rebuilt it from scratch — logo, colors, tone, everything. Now clients instantly understand what we stand for.",
    name: "Arjun Mehta",
    role: "Director, MindBridge EdTech",
    service: "Branding & creative",
  },
  {
    quote:
      "Their consulting team helped us restructure our entire marketing funnel. We went from scattered efforts to a tight, measurable system. The clarity they brought is priceless.",
    name: "Sneha Nair",
    role: "COO, HealthFirst Wellness",
    service: "Business consulting",
  },
  {
    quote:
      "As a startup we needed everything — social media, ads, and a website — without breaking the bank. Plutosolve delivered premium quality at a price that made sense for us.",
    name: "Vikram Rao",
    role: "Co-Founder, Stackly SaaS",
    service: "Digital marketing",
  },
  {
    quote:
      "Working with Plutosolve feels like having an in-house team fully invested in your success. They don't just execute — they think with you. Highly recommend.",
    name: "Deepika Kapoor",
    role: "MD, Kapoor & Co. Services",
    service: "SEO & content",
  },
];

export const testimonialsIntro = {
  eyebrow: "In their words",
  headline: "What working with us is like.",
};

export type Member = {
  name: string;
  role: string;
  photo: string;
  bio: string[];
  quote: string;
  focus: string[];
};

export const team = {
  eyebrow: "Our team",
  headline: ["Small team.", "Big impact."],
  lead: "We're a small team — intentionally. Because we believe great work doesn't come from large teams, it comes from aligned teams.",
  members: [
    {
      name: "Rahul Kushwah",
      role: "Founder & Strategy Lead",
      photo: "/team/rahul-kushwah.webp",
      bio: [
        "Rahul is the driving force behind PlutoSolve. With a strong blend of creativity and analytical thinking, he focuses on building strategies that are not just innovative, but executable. His approach is simple — understand the business deeply before trying to scale it.",
        "He has worked across website development, branding, SEO and marketing strategy, helping businesses move from scattered efforts to structured growth.",
      ],
      quote: "Marketing should feel like a system, not a gamble.",
      focus: ["Growth marketing", "Business strategy", "Leadership"],
    },
    {
      name: "Sapan Gajjar",
      role: "Co-founder & CTO",
      photo: "/team/sapan-gajjar.webp",
      bio: [
        "Sapan is the tech architect behind PlutoSolve, crafting scalable, high-performance web solutions. He brings deep technical expertise, ensuring the systems we build are robust, secure and ready for growth.",
        "From complex web applications to seamless e-commerce platforms, he bridges the gap between marketing goals and technical execution.",
      ],
      quote: "Great code doesn't just work, it scales effortlessly.",
      focus: ["Full-stack development", "System design", "Cloud"],
    },
  ] as Member[],
  core: {
    title: "Core team",
    role: "Specialists in execution",
    lines: [
      "Designers who don't just make things look good — but make them convert.",
      "Developers who don't just build — but build with purpose and performance.",
      "Marketing executors who don't just post — but position brands strategically.",
    ],
    closing: "We work collaboratively, often wearing multiple hats — because we care more about results than roles.",
  },
};
