import {
    Building2,
    Award,
    Briefcase,
    Mail,
    Target,
    Layers,
    Users,
    Sparkles,
    CheckCircle2,
    Clock,
    Globe,
    LucideIcon,
} from "lucide-react";

export interface PolicySection {
    id: string;
    icon: LucideIcon;
    title: string;
    items: string[];
}

export interface PolicyData {
    title: string;
    lastUpdated: string;
    description: string;
    sections: PolicySection[];
}

export const COMPANY_DATA: Record<string, PolicyData> = {
    about: {
        title: "About Opperd Technologies",
        lastUpdated: "October 2026",
        description:
            "Opperd Technologies is a modern, high-performance software engineering agency specializing in custom web applications, enterprise platforms, and scalable digital solutions.",
        sections: [
            {
                id: "A",
                icon: Building2,
                title: "Who We Are & Our Vision",
                items: [
                    "Empowering modern businesses with elite web development, responsive user interfaces, and robust cloud solutions.",
                    "Focusing on speed, security, and scalability using modern technology stacks like Next.js, React, and TypeScript.",
                    "Bridging the gap between creative visual designs and high-throughput server architecture.",
                ],
            },
            {
                id: "B",
                icon: Target,
                title: "Our Engineering Excellence",
                items: [
                    "Clean Code Practices: Modular, testable, and maintainable codebase structure built for future expansion.",
                    "Pixel-Perfect UI/UX: Custom-crafted components using Tailwind CSS, Shadcn UI, and Framer Motion.",
                    "Data Protection & Reliability: Secure authentication workflows, Prisma ORM integrations, and optimized PostgreSQL databases.",
                ],
            },
            {
                id: "C",
                icon: Layers,
                title: "Our Core Technology Stack",
                items: [
                    "Frontend: Next.js (App Router), React, TypeScript, Tailwind CSS, Shadcn UI, Framer Motion.",
                    "Backend & Database: Node.js, Express.js, Prisma ORM, PostgreSQL, Better Auth, Bun runtime.",
                    "DevOps & Deployment: Vercel, Docker, NGINX, Cloudflare, CI/CD automated pipelines.",
                ],
            },
            {
                id: "D",
                icon: Sparkles,
                title: "Why Partner With Opperd?",
                items: [
                    "100% Code & Asset Ownership upon project handover.",
                    "Transparent milestone-based development with direct developer communications.",
                    "Post-launch technical support and infrastructure management guarantees.",
                ],
            },
        ],
    },
    career: {
        title: "Careers at Opperd Technologies",
        lastUpdated: "October 2026",
        description:
            "Join an ambitious team of full-stack engineers, designers, and problem solvers building software used by businesses worldwide.",
        sections: [
            {
                id: "A",
                icon: Users,
                title: "Life at Opperd",
                items: [
                    "Remote-First Culture: Work from anywhere with flexible hours built around productive deep work.",
                    "Continuous Growth: Dedicated budgets for learning resources, tech conferences, and certification courses.",
                    "Modern Tech Stack: Work on cutting-edge Next.js, AI workflows, and enterprise distribution systems.",
                ],
            },
            {
                id: "B",
                icon: Briefcase,
                title: "Open Roles & Application Process",
                items: [
                    "Full-Stack Web Engineer (Next.js / Node.js / TypeScript)",
                    "UI/UX Designer (Figma, Design Systems, Prototyping)",
                    "Junior Frontend Developer (React, Tailwind CSS, Component Libraries)",
                ],
            },
            {
                id: "C",
                icon: CheckCircle2,
                title: "How to Apply",
                items: [
                    "Submit your resume, GitHub profile, and recent project portfolio to contact@opperd.com.",
                    "Process: Portfolio Review -> Technical Discussion -> Practical Coding Challenge -> Cultural Alignment & Offer.",
                ],
            },
        ],
    },
    "case-studies": {
        title: "Case Studies & Featured Projects",
        lastUpdated: "October 2026",
        description:
            "A showcase of complex software solutions, enterprise platforms, and custom web applications engineered by Opperd Technologies.",
        sections: [
            {
                id: "A",
                icon: Award,
                title: "Prism V2 — Enterprise ERP & Distribution System",
                items: [
                    "Challenge: Managing large-scale distributor pricing, multi-tier shipment tracking, and order management.",
                    "Solution: Built an Express.js & Prisma backend paired with a real-time analytics dashboard.",
                    "Impact: Reduced order processing bottlenecks by 45% and streamlined inventory tracking.",
                ],
            },
            {
                id: "B",
                icon: Layers,
                title: "North Lane — Minimalist E-Commerce Platform",
                items: [
                    "Challenge: Building a blazing-fast, aesthetic online storefront with custom product grids and seamless checkout.",
                    "Solution: Developed using Next.js, Tailwind CSS, and optimized media loading pipelines.",
                    "Impact: Achieved sub-second page loads and a 30% increase in checkout conversions.",
                ],
            },
            {
                id: "C",
                icon: Sparkles,
                title: "Farm Management System (FMS) Dashboard",
                items: [
                    "Challenge: Tracking livestock categories, daily stock history, expenses, and automated withdrawal reports.",
                    "Solution: Built an interactive, role-based dashboard with custom filter management and reporting tools.",
                    "Impact: Improved operational visibility and financial logging accuracy for agricultural managers.",
                ],
            },
        ],
    },
    contact: {
        title: "Contact & Consultation",
        lastUpdated: "October 2026",
        description:
            "Ready to launch your next web application or revamp your enterprise infrastructure? Reach out to our engineering team.",
        sections: [
            {
                id: "A",
                icon: Mail,
                title: "Direct Contact Information",
                items: [
                    "Official Email: contact@opperd.com",
                    "Direct Phone: +880 162-87455220",
                    "Primary Operations: Bangladesh (Serving Global Clients Remotely)",
                ],
            },
            {
                id: "B",
                icon: Clock,
                title: "Response & Service Hours",
                items: [
                    "Business Hours: Monday – Saturday (9:00 AM – 7:00 PM GMT+6)",
                    "Consultation Response Time: Within 12 to 24 hours on business days.",
                    "24/7 Support: Available for clients on Active SLA Maintenance contracts.",
                ],
            },
            {
                id: "C",
                icon: Globe,
                title: "Project Discovery Consultation",
                items: [
                    "We offer free initial project scoping calls to discuss architecture, timeline estimates, and budget planning.",
                    "Send us your brief or requirement document to schedule a one-on-one session.",
                ],
            },
        ],
    },
};
