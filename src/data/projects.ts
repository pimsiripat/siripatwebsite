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
    title: "LEDGER",
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
  {
    id: 3,
    title: "Finance App Redesign",
    category: "Mobile App",
    description: "Simplifying personal finance management through intuitive design and clear data visualization.",
    image: "/images/projects/project-1.jpg",
    link: "#",
  },
  {
    id: 4,
    title: "E-Commerce Platform",
    category: "Web Design",
    description: "End-to-end shopping experience focused on conversion and user delight.",
    image: "/images/projects/project-2.jpg",
    link: "#",
  },
  {
    id: 5,
    title: "Healthcare Dashboard",
    category: "Product Design",
    description: "Making complex health data accessible for patients and providers.",
    image: "/images/projects/project-3.jpg",
    link: "#",
  },
  {
    id: 6,
    title: "Travel Booking App",
    category: "Mobile App",
    description: "Streamlined booking flow that reduced drop-off by 40%.",
    image: "/images/projects/project-4.jpg",
    link: "#",
  },
];
