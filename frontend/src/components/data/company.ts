import {
    Building2,
    Briefcase,
    Mail,
    Target,
    Users,
    Sparkles,
    CheckCircle2,
    Clock,
    Globe,
    LucideIcon,
    Handshake,
    ShieldCheck,
    MessageCircle,
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
        title: "About Opperd",
        lastUpdated: "November 2026",
        description:
            "Opperd is an online marketplace in the European Union and the United Kingdom where people buy and sell pre-owned products directly with each other.",
        sections: [
            {
                id: "A",
                icon: Building2,
                title: "Who We Are & Our Mission",
                items: [
                    "Opperd makes it easy for people in the EU and UK to buy and sell pre-owned products.",
                    "We are a platform only. Opperd does not own, sell, or inspect the products listed on it.",
                    "Our goal is to give quality used products a second life and help people save money.",
                ],
            },
            {
                id: "B",
                icon: Target,
                title: "How the Marketplace Works",
                items: [
                    "Sellers create a listing with photos, a description, price, and condition.",
                    "Buyers contact sellers through the platform and arrange the purchase directly.",
                    "Sellers and buyers are responsible for the accuracy of their own listings and the terms they agree on.",
                ],
            },
            {
                id: "C",
                icon: ShieldCheck,
                title: "Safety & Trust",
                items: [
                    "Users can report suspicious listings, fake profiles, or unsafe behaviour.",
                    "We remove listings that break our rules and may suspend accounts that repeatedly violate them.",
                    "We recommend meeting in public places and checking items before paying.",
                ],
            },
            {
                id: "D",
                icon: Sparkles,
                title: "Our Commitments",
                items: [
                    "Clear and simple rules for all users.",
                    "Protection of your personal data in line with EU GDPR and UK GDPR.",
                    "Responsive support for account and platform issues.",
                ],
            },
        ],
    },
    career: {
        title: "Careers at Opperd",
        lastUpdated: "November 2026",
        description:
            "Join our team building a safe and simple marketplace for people across the EU and UK.",
        sections: [
            {
                id: "A",
                icon: Users,
                title: "Life at Opperd",
                items: [
                    "Friendly team culture where your ideas matter.",
                    "Opportunities to learn and grow as the platform expands.",
                    "Remote-friendly work arrangements where possible.",
                ],
            },
            {
                id: "B",
                icon: Briefcase,
                title: "Open Roles",
                items: [
                    "Full-Stack Web Engineer (Next.js / Node.js / TypeScript)",
                    "Trust & Safety Specialist",
                    "Customer Support Executive",
                    "Marketing Executive (EU & UK markets)",
                ],
            },
            {
                id: "C",
                icon: CheckCircle2,
                title: "How to Apply",
                items: [
                    "Send your CV, portfolio or GitHub profile, and a short cover note to contact.opperd@gmail.com.",
                    "Process: Application Review -> Short Interview -> Practical Task -> Final Decision.",
                ],
            },
        ],
    },
    "case-studies": {
        title: "How Buyers & Sellers Use Opperd",
        lastUpdated: "November 2026",
        description:
            "Examples of how people use Opperd to sell and buy pre-owned products.",
        sections: [
            {
                id: "A",
                icon: Handshake,
                title: "Selling Used Electronics",
                items: [
                    "Situation: A seller wants to sell an old laptop to a local buyer.",
                    "How it works: The seller lists the laptop with photos and condition details, then agrees on a meeting point with the buyer.",
                    "Outcome: The sale is completed directly between the two people.",
                ],
            },
            {
                id: "B",
                icon: Users,
                title: "Buying Used Furniture",
                items: [
                    "Situation: A buyer is furnishing a new flat on a budget.",
                    "How it works: The buyer browses listings, messages the seller, and arranges collection.",
                    "Outcome: The buyer saves money compared with buying new.",
                ],
            },
        ],
    },
    contact: {
        title: "Contact Opperd",
        lastUpdated: "November 2026",
        description:
            "Have a question about the platform, your account, or a listing? Get in touch with our team.",
        sections: [
            {
                id: "A",
                icon: Mail,
                title: "Direct Contact Information",
                items: [
                    "Email: contact.opperd@gmail.com",
                    "Serving users in the European Union and the United Kingdom",
                ],
            },
            {
                id: "B",
                icon: Clock,
                title: "Response Time",
                items: [
                    "We aim to reply to emails within 2 business days.",
                    "Urgent safety reports are prioritised.",
                ],
            },
            {
                id: "C",
                icon: MessageCircle,
                title: "Reporting & Feedback",
                items: [
                    "Report a listing or user through the report button on the listing page.",
                    "Send general feedback or suggestions to our email address above.",
                ],
            },
            {
                id: "D",
                icon: Globe,
                title: "Availability",
                items: [
                    "Opperd is available only to users in the EU and UK.",
                ],
            },
        ],
    },
};
