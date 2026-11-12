import {
    ShieldCheck,
    FileText,
    Lock,
    Globe,
    Scale,
    UserCheck,
    Server,
    ShieldAlert,
    LucideIcon,
    Cookie,
    Users,
    Tag,
    Ban,
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

export const LEGAL_POLICIES: Record<string, PolicyData> = {
    privacy: {
        title: "Privacy Policy",
        lastUpdated: "November 2026",
        description:
            "Opperd respects your privacy. This policy explains what personal data we collect, why we use it, and the rights you have under EU GDPR and UK GDPR.",
        sections: [
            {
                id: "A",
                icon: ShieldCheck,
                title: "Information We Collect",
                items: [
                    "Account Details: Name, email address, phone number (optional), and location (city and country).",
                    "Listing Details: Photos, descriptions, prices, and any information you choose to publish.",
                    "Messages: Communications sent between buyers and sellers through the platform.",
                    "Usage Data: Pages visited and device information to keep the platform secure and working well.",
                ],
            },
            {
                id: "B",
                icon: Lock,
                title: "How We Use Your Information",
                items: [
                    "To create and manage your account.",
                    "To display your listings and enable communication between users.",
                    "To prevent fraud, scams, and misuse of the platform.",
                    "To send service emails and, only with your consent, marketing messages.",
                    "We do not sell your personal data to third parties.",
                ],
            },
            {
                id: "C",
                icon: Cookie,
                title: "Cookies",
                items: [
                    "Essential Cookies: Keep you logged in and keep the site secure.",
                    "Analytics Cookies: Help us understand how the platform is used. These are set only with your consent.",
                    "You can manage cookie preferences in your browser or through our cookie banner.",
                ],
            },
        ],
    },
    terms: {
        title: "Terms & Conditions",
        lastUpdated: "November 2026",
        description:
            "These terms govern your use of the Opperd platform in the European Union and the United Kingdom.",
        sections: [
            {
                id: "A",
                icon: FileText,
                title: "General Use",
                items: [
                    "You must be at least 18 years old, or have permission from a parent or guardian, to use Opperd.",
                    "You must provide accurate information when creating an account or listing a product.",
                    "Opperd is available only to users located in the European Union and the United Kingdom.",
                    "We may remove listings or suspend accounts that break these terms.",
                ],
            },
            {
                id: "B",
                icon: Users,
                title: "Our Role as a Platform",
                items: [
                    "Opperd provides a platform for users to list and find pre-owned products.",
                    "Opperd is not a party to any sale between buyers and sellers.",
                    "Opperd does not own, inspect, store, or guarantee the products listed.",
                ],
            },
            {
                id: "C",
                icon: Tag,
                title: "Listings & Selling",
                items: [
                    "Sellers must own the product and have the legal right to sell it.",
                    "Listings must describe the product's condition, defects, and included accessories accurately.",
                    "Prices are set by the seller. Buyers and sellers are responsible for agreeing the final price.",
                ],
            },
            {
                id: "D",
                icon: Ban,
                title: "Prohibited Items",
                items: [
                    "Stolen, illegal, or counterfeit products.",
                    "Weapons, hazardous materials, and regulated substances.",
                    "Any item that is banned for sale under the laws of the EU or UK.",
                ],
            },
        ],
    },
    buyer_seller: {
        title: "Buyer & Seller Responsibilities",
        lastUpdated: "November 2026",
        description:
            "Guidance on how buyers and sellers should interact safely and fairly when completing a transaction.",
        sections: [
            {
                id: "A",
                icon: UserCheck,
                title: "Sellers",
                items: [
                    "Describe the product honestly, including any faults or missing parts.",
                    "Respond to buyer messages in a reasonable time.",
                    "Consumer protection laws in the EU and UK may still apply to your sale. Check your local rules if you sell regularly.",
                ],
            },
            {
                id: "B",
                icon: UserCheck,
                title: "Buyers",
                items: [
                    "Inspect the product carefully before paying, where possible.",
                    "Agree on payment and collection arrangements before the meeting.",
                    "Report any listing that appears misleading or fraudulent.",
                ],
            },
            {
                id: "C",
                icon: ShieldAlert,
                title: "Safety Tips",
                items: [
                    "Meet in a public, well-lit place for collection.",
                    "Be cautious of requests to pay in advance through unusual methods or to move off the platform.",
                    "Never share passwords, banking details, or one-time codes with anyone.",
                ],
            },
        ],
    },
    gdpr: {
        title: "Data Protection & Your Rights",
        lastUpdated: "November 2026",
        description:
            "Your rights under EU GDPR and UK GDPR, and how we keep your personal data secure.",
        sections: [
            {
                id: "A",
                icon: Globe,
                title: "Your Rights",
                items: [
                    "Access: Request a copy of the personal data we hold about you.",
                    "Correction: Ask us to correct inaccurate or outdated information.",
                    "Erasure: Request deletion of your account and personal data, subject to legal obligations.",
                    "Portability & Objection: Request your data in a portable format or object to certain processing.",
                ],
            },
            {
                id: "B",
                icon: Server,
                title: "Data Security",
                items: [
                    "Data is transmitted using encryption (SSL/TLS).",
                    "Access to personal data is limited to authorised staff only.",
                    "If a data breach is likely to affect your rights, we will notify you and the relevant authority within the time required by law.",
                ],
            },
            {
                id: "C",
                icon: Scale,
                title: "Contact & Complaints",
                items: [
                    "To exercise your rights, email contact.opperd@gmail.com.",
                    "You may also lodge a complaint with your local data protection authority, such as the ICO in the UK or your national authority in the EU.",
                ],
            },
        ],
    },
};
