import {
    HelpCircle,
    BookOpen,
    LifeBuoy,
    Terminal,
    ShieldAlert,
    Cpu,
    Wrench,
    FileCode2,
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

export const SUPPORT_DATA: Record<string, PolicyData> = {
    faq: {
        title: "Frequently Asked Questions",
        lastUpdated: "October 2026",
        description:
            "Comprehensive answers regarding our web development process, project timelines, pricing, and post-launch commitments.",
        sections: [
            {
                id: "A",
                icon: HelpCircle,
                title: "Project Development & Timelines",
                items: [
                    "Q: How long does it take to complete a web project? - A: Typical landing pages take 5 to 7 days, while full-stack web applications and ERP solutions take 3 to 6 weeks.",
                    "Q: What information do you need to start a project? - A: We require a project scope brief, wireframes/brand guidelines (if available), and target feature requirements.",
                    "Q: Can you work with existing codebases? - A: Yes, we specialize in refactoring, updating, and scaling existing React/Next.js/Node.js applications.",
                ],
            },
            {
                id: "B",
                icon: Cpu,
                title: "Pricing, Ownership & Revisions",
                items: [
                    "Q: Do I own the code after completion? - A: Yes, 100% full intellectual property and repository rights are transferred to you after final payment.",
                    "Q: How are revisions handled? - A: Each project package includes dedicated revision cycles during the UI preview and staging deployment phases.",
                    "Q: What payment terms do you offer? - A: Standard projects operate on a milestone structure (e.g., 40% upfront, 30% mid-stage, 30% final deployment).",
                ],
            },
            {
                id: "C",
                icon: Wrench,
                title: "Hosting & Technical Maintenance",
                items: [
                    "Q: Do you handle hosting and domain deployment? - A: Yes, we deploy and configure servers on Vercel, AWS, DigitalOcean, or custom VPS environments.",
                    "Q: What happens after the project is launched? - A: All projects include 30 days of free post-launch bug fixing and monitoring.",
                ],
            },
        ],
    },
    docs: {
        title: "Project Handoff & Technical Documentation",
        lastUpdated: "October 2026",
        description:
            "Guidelines and operational documentation provided to client engineering teams upon project completion.",
        sections: [
            {
                id: "A",
                icon: Terminal,
                title: "Environment & System Requirements",
                items: [
                    "Runtime Requirements: Node.js v20+, Bun runtime (optional for fast package execution).",
                    "Database Setup: PostgreSQL database instance with Prisma CLI configuration for migrations.",
                    "Environment Variables: Complete `.env.example` templates provided with encrypted configuration keys.",
                ],
            },
            {
                id: "B",
                icon: FileCode2,
                title: "Deployment Procedures",
                items: [
                    "Vercel Deployment: Zero-config Next.js deployment with automated GitHub action pipelines.",
                    "Docker Containerization: Pre-configured Dockerfile and docker-compose configurations for self-hosted servers.",
                    "Database Migrations: Run `npx prisma migrate deploy` to synchronize schema changes in production.",
                ],
            },
            {
                id: "C",
                icon: BookOpen,
                title: "Architecture & API Structure",
                items: [
                    "RESTful API & Server Actions documentation formatted with Swagger / Postman collections.",
                    "Role-Based Access Control (RBAC) middleware implementation details for secure endpoint protection.",
                ],
            },
        ],
    },
    tutorial: {
        title: "Tutorials & Client Management Guides",
        lastUpdated: "October 2026",
        description:
            "Step-by-step instructions for non-technical site administrators to manage content, products, and user data.",
        sections: [
            {
                id: "A",
                icon: BookOpen,
                title: "Admin Dashboard Navigation",
                items: [
                    "Content Updates: How to create, edit, and publish dynamic blog posts or service listings using the CMS panel.",
                    "User Management: Assigning administrative roles, moderating comments, and checking user activity logs.",
                    "E-Commerce Management: Updating product stock, setting up discount codes, and processing order statuses.",
                ],
            },
            {
                id: "B",
                icon: Wrench,
                title: "Performance & Asset Best Practices",
                items: [
                    "Media Uploads: Compress images to WebP format before uploading to optimize page speed.",
                    "SEO Setup: Updating page metadata, Open Graph preview tags, and social sharing icons directly in dashboard settings.",
                ],
            },
        ],
    },
    support: {
        title: "Technical Support & SLA",
        lastUpdated: "October 2026",
        description:
            "Comprehensive post-launch technical assistance, maintenance packages, and emergency support channels.",
        sections: [
            {
                id: "A",
                icon: LifeBuoy,
                title: "Support Tiers & Offerings",
                items: [
                    "Standard Warranty: 30 days of complimentary bug resolution following production launch.",
                    "Monthly Maintenance Plan: Regular dependency updates, database backups, performance audits, and uptime monitoring.",
                    "Dedicated SLA Contract: Guaranteed 1-hour critical response time for enterprise clients.",
                ],
            },
            {
                id: "B",
                icon: ShieldAlert,
                title: "Emergency Incident Resolution",
                items: [
                    "Critical Server Downtime: Direct emergency hotlines for immediate server restoration.",
                    "Security Patching: Urgent deployment of security fixes for identified vulnerabilities or data leaks.",
                ],
            },
        ],
    },
};
