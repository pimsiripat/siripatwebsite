export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  link?: string;
  slug?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Ledger",
    category: "Case Study",
    description: "A mobile app and website for fast, easy income and expense tracking. Designed to help users build better financial habits without complex bookkeeping.",
    image: "/images/projects/ledger/mockup_5.png",
    link: "/projects/ledger",
    slug: "ledger",
  },
  {
    id: 2,
    title: "Pawtopia Hospital",
    category: "Case Study",
    description: "A web and mobile app for a modern pet hospital. Enables pet owners to schedule appointments, view medical records, and receive reminders for vaccinations.",
    image: "/images/projects/pawtopia/iPhone_16_Pro.png",
    link: "/projects/pawtopia",
    slug: "pawtopia",
  },
];
