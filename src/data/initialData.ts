import { Booking, Service, TeamMember, Testimonial, WebsiteContent } from '../types';

export const initialServices: Service[] = [
  {
    id: 'srv-1',
    name: 'AI SOLUTIONS',
    shortDesc: 'Practical AI solutions that help businesses save time and improve everyday work.',
    businessBenefit: 'Automate content, summarization, and routine responses so your team focuses on high-value clients.',
    displayOrder: 1,
    active: true,
  },
  {
    id: 'srv-2',
    name: 'BUSINESS AUTOMATION',
    shortDesc: 'Automate repetitive tasks and processes so your team can focus on more important work.',
    businessBenefit: 'Eliminate duplicate data entry, manual follow-ups, and spreadsheet clutter with seamless background sync.',
    displayOrder: 2,
    active: true,
  },
  {
    id: 'srv-3',
    name: 'DIGITAL SYSTEMS',
    shortDesc: 'Create simple digital tools that make business operations easier.',
    businessBenefit: 'Replace messy email chains and fragmented files with clear, purposeful internal tools.',
    displayOrder: 3,
    active: true,
  },
  {
    id: 'srv-4',
    name: 'PROCESS IMPROVEMENT',
    shortDesc: 'Identify inefficient processes and find better ways to get things done.',
    businessBenefit: 'Uncover bottlenecks slowing your operations down and streamline your team workflow step-by-step.',
    displayOrder: 4,
    active: true,
  },
  {
    id: 'srv-5',
    name: 'DIGITAL STRATEGY',
    shortDesc: 'Determine where technology can create the most value for your business.',
    businessBenefit: 'Prevent costly software mistakes and invest only in tools that produce clear measurable returns.',
    displayOrder: 5,
    active: true,
  },
  {
    id: 'srv-6',
    name: 'CUSTOM DIGITAL SOLUTIONS',
    shortDesc: 'Build practical solutions around a specific business need.',
    businessBenefit: 'Solve unique operational hurdles that generic off-the-shelf software cannot handle.',
    displayOrder: 6,
    active: true,
  },
];

export const initialContent: WebsiteContent = {
  founderName: 'Bryan Santos',
  founderPosition: 'Founder & Principal Digital Strategist',
  founderShortBio: 'Business solutions leader bridging digital technology, automation, and real-world execution to help owners work smarter.',
  founderFullBio: 'With background spanning enterprise digital architecture, innovation ecosystems, and nonprofit community leadership, Bryan established SYNAIOS on a single guiding principle: technology should eliminate friction, never create it. Through hands-on strategy and pragmatic engineering, he partners with owners to streamline everyday business so they can focus on what matters most.',
  founderPhoto: '/src/assets/images/synaios_founder_1788399835345.jpg',
  founderVentures: [
    'Founding member of NexForge',
    'Co-founder of The Spark',
    'Founder and host of Tambayan Talks',
  ],
  founderPhilosophy1: 'Technology should give people more time—not more work.',
  founderPhilosophy2: 'More time away from repetitive work means more time for family, business, and innovation.',
  contactEmail: 'hello@synaios.com',
  contactPhone: '+1 (555) 392-8812',
  businessHours: 'Monday – Friday, 8:00 AM – 6:00 PM EST',
};

export const initialTeam: TeamMember[] = [
  {
    id: 'team-founder',
    name: 'Bryan Santos',
    position: 'Founder & Principal Digital Strategist',
    shortBio: 'Specializes in practical digital strategy, systems architecture, and business automation.',
    fullBio: 'With background spanning enterprise digital architecture, innovation ecosystems, and nonprofit community leadership, Bryan established SYNAIOS on a single guiding principle: technology should eliminate friction, never create it. Founding member of NexForge, co-founder of The Spark, and founder/host of Tambayan Talks.',
    photo: '/src/assets/images/synaios_founder_1788399835345.jpg',
    email: 'bryan@synaios.com',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
    },
    displayOrder: 1,
    active: true,
    isFounder: true,
  },
  {
    id: 'team-2',
    name: 'Elena Rostova',
    position: 'Senior Digital & Automation Strategist',
    shortBio: 'Bridges legacy software workflows with modern automated pipelines and team enablement.',
    fullBio: 'Elena brings over a decade of operational optimization experience, helping multi-department teams migrate from manual spreadsheets to reliable, self-updating digital workflows.',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
    email: 'elena@synaios.com',
    socialLinks: {
      linkedin: 'https://linkedin.com',
    },
    displayOrder: 2,
    active: true,
    isFounder: false,
  },
  {
    id: 'team-3',
    name: 'Marcus Vance',
    position: 'Systems & Process Implementation Lead',
    shortBio: 'Designs bespoke business tools and customer-facing interfaces that cut daily friction.',
    fullBio: 'Marcus focuses on pragmatic implementation: building lean internal tools, database integrations, and customer portals that require zero training to use.',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
    email: 'marcus@synaios.com',
    socialLinks: {
      linkedin: 'https://linkedin.com',
    },
    displayOrder: 3,
    active: true,
    isFounder: false,
  },
];

// Per prompt instructions:
// "Do not create fake testimonials. If there are no testimonials, hide the testimonial section completely."
// Allow admin to add testimonials dynamically.
export const initialTestimonials: Testimonial[] = [];

export const initialBookings: Booking[] = [
  {
    id: 'bkg-101',
    name: 'David Reynolds',
    email: 'david@apexlogistics.com',
    phone: '(555) 234-8901',
    business: 'Apex Freight Logistics',
    message: 'We spend 15 hours a week manually copying dispatch invoices into QuickBooks. Looking for automated workflow.',
    date: '2026-09-08',
    time: '10:00 AM',
    status: 'Confirmed',
    notes: 'Prioritize discussion on invoice intake automation and accounting webhook sync.',
    createdAt: '2026-09-01T14:20:00Z',
  },
  {
    id: 'bkg-102',
    name: 'Sarah Lin',
    email: 'sarah@linarchitects.design',
    phone: '(555) 876-1234',
    business: 'Lin Architectural Group',
    message: 'Need a simple digital portal for client project approvals instead of 50-thread emails.',
    date: '2026-09-09',
    time: '2:30 PM',
    status: 'New',
    notes: '',
    createdAt: '2026-09-02T09:15:00Z',
  },
];
