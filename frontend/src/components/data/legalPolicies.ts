import {
    ShieldCheck,
    FileText,
    RefreshCw,
    CheckCircle2,
    Award,
    Lock,
    Globe,
    FileSpreadsheet,
    Cookie,
    Scale,
    UserCheck,
    HelpCircle,
    Server,
    ShieldAlert,
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

export const LEGAL_POLICIES: Record<string, PolicyData> = {
    privacy: {
        title: "Privacy Policy & Data Protection Architecture",
        lastUpdated: "October 2026",
        description:
            "At Opperd Technologies, we enforce strict zero-trust data privacy standards to safeguard client business records, user databases, temporary infrastructure credentials, and trade secrets.",
        sections: [
            {
                id: "A",
                icon: ShieldCheck,
                title: "Information We Collect & Scoping",
                items: [
                    "Client Identification Data: Legal company name, official representative name, corporate email address, contact numbers, and billing history.",
                    "Technical Infrastructure Secrets: Staging credentials, cloud container keys, SSH access tokens, database connection strings, and third-party API credentials required for full-stack integration.",
                    "System Operational Logs: Anonymized application load metrics, response timings, error traces, and CDN cache behavior collected to ensure peak uptime performance.",
                    "Communications Archiving: Project scope conversations, technical specification sheets, pull request comments, and formal change requests retained for transparency and auditing.",
                ],
            },
            {
                id: "B",
                icon: Lock,
                title: "Data Usage Practices & Security Vaults",
                items: [
                    "Strict Purpose Limitation: Collected information is strictly used for software architectural design, frontend development, backend API integrations, and cloud infrastructure deployment.",
                    "Zero External Disclosure: We strictly maintain that no client information, credential logs, or proprietary source code will ever be leased, traded, or sold to third-party ad networks or brokers.",
                    "Encrypted Vault Infrastructure: Sensitive keys and environment variables are stored inside multi-layer encrypted secret managers with restricted access controls.",
                    "Role-Based Engineer Access (RBAC): Only vetted full-stack engineers and technical leads explicitly assigned to your project are granted temporary credential access during development.",
                ],
            },
            {
                id: "C",
                icon: Award,
                title: "Codebase Ownership & Intellectual Property (IP)",
                items: [
                    "100% Intellectual Property Transfer: Upon full milestone payment settlement, all custom source code, design systems, assets, and database schemas belong entirely to the client.",
                    "No Proprietary Vendor Lock-In: Code is built using universal industry frameworks (Next.js, Node.js, TypeScript) so any internal software team can extend or maintain it effortlessly.",
                    "Zero Residual Royalty Rights: Opperd Technologies retains no future claims, usage fees, or licensing royalties over client trade secrets, proprietary algorithms, or user databases.",
                ],
            },
            {
                id: "D",
                icon: Cookie,
                title: "Cookies, Analytics & Tracking Control",
                items: [
                    "Essential Session Storage: Secure local browser tokens used solely to maintain authorization and active dashboard session security.",
                    "Performance Auditing Analytics: Aggregated, non-personally identifiable usage metrics leveraged to optimize frontend rendering speeds, Core Web Vitals, and layout performance.",
                    "User Autonomy: Visitors can toggle or block browser cookie storage through standard browser privacy preferences without breaking main site navigation.",
                ],
            },
        ],
    },
    terms: {
        title: "Terms & Conditions of Service",
        lastUpdated: "October 2026",
        description:
            "Comprehensive terms and binding service policies governing modern software development, web engineering, and technical contracts executed by Opperd Technologies.",
        sections: [
            {
                id: "A",
                icon: FileText,
                title: "Service Delivery & Scope Management",
                items: [
                    "Scope Baseline: All custom software and web development deliverables adhere strictly to the written technical proposal and finalized scope document.",
                    "Change Order Protocol: Any extra features, structural redesigns, or third-party integrations requested outside the agreed scope will require a formal change-order estimate.",
                    "Beginner-Friendly Onboarding: First-time client partners receive dedicated walkthrough sessions, wireframe previews, technical explanations, and clear milestone roadmaps before code generation begins.",
                ],
            },
            {
                id: "B",
                icon: FileSpreadsheet,
                title: "Milestone Billing & Payment Schedules",
                items: [
                    "Phased Invoice Structure: Payments are structured around transparent project milestones (e.g., Deposit Commitment, Mid-Point Staging Delivery, and Final Production Handoff).",
                    "Grace Period & Account Holds: Milestone invoices exceeding a 14-day grace period may result in a temporary suspension of development sprints or staging server access.",
                    "Transparent Financial Practices: No hidden maintenance charges, unexpected setup fees, or unannounced software licensing costs will ever be billed without prior written approval.",
                ],
            },
            {
                id: "C",
                icon: Scale,
                title: "Third-Party Services, Hosting & Domains",
                items: [
                    "Direct Client Ownership: Web domains, cloud hosting subscriptions (Vercel, AWS, DigitalOcean), and API platforms must be created directly under client ownership accounts.",
                    "Recurring Expenses: Clients remain solely responsible for managing recurring hosting renewals, domain registration fees, and usage-based SaaS vendor bills.",
                    "Deployment Management: Opperd Technologies manages initial server configuration, domain DNS pointing, SSL provisioning, and CI/CD pipeline setup during the project delivery cycle.",
                ],
            },
            {
                id: "D",
                icon: UserCheck,
                title: "Client Responsibilities & Review Milestones",
                items: [
                    "Timely Asset Provisioning: Clients are expected to provide text copy, brand kits, logos, and high-resolution media within agreed timelines to prevent project timeline shifts.",
                    "Approval Checkpoints: Prompt testing feedback provided during staging and preview builds ensures project completion according to scheduled delivery targets.",
                ],
            },
        ],
    },
    refund: {
        title: "Refund, Cancellation & Delivery Guarantee",
        lastUpdated: "October 2026",
        description:
            "Fair, equitable, and transparent refund policies protecting client investments while compensating allocated developer hours and engineering resources.",
        sections: [
            {
                id: "A",
                icon: RefreshCw,
                title: "Pre-Development Phase Cancellation",
                items: [
                    "100% Full Refund Guarantee: Eligible if project cancellation is submitted in writing before initial wireframe design, software architecture drafting, or code repository initialization begins.",
                    "Fast Reversal Processing: Approved pre-development refunds are credited back to the client's original payment method within 5 to 7 business days.",
                ],
            },
            {
                id: "B",
                icon: CheckCircle2,
                title: "In-Progress Sprints & Non-Refundables",
                items: [
                    "Milestone Audit Calculations: Partial refunds for in-flight projects are calculated based on uncompleted project milestones following an audit of delivered source code and wireframes.",
                    "Non-Refundable Expenses: Direct third-party expenditures incurred on client behalf (domain registration fees, paid UI component licenses, cloud provisioning fees) are non-refundable.",
                    "Production Delivery Guarantee: If any software bugs, broken links, or UI flaws are discovered during staging verification, Opperd will fix them at no extra charge before final release.",
                ],
            },
            {
                id: "C",
                icon: FileText,
                title: "Contract Termination Workflow",
                items: [
                    "Formal Notice Requirement: Either party may initiate contract termination by issuing a 7-day formal written notice via official email communication.",
                    "Work Deliverable Release: All functional code modules, design files, and staging assets completed up to the date of last paid milestone will be packaged and delivered.",
                ],
            },
        ],
    },
    gdpr: {
        title: "GDPR Compliance & European Data Standards",
        lastUpdated: "October 2026",
        description:
            "Comprehensive data protection compliance guaranteeing full adherence to the EU General Data Protection Regulation (GDPR) for global web platforms.",
        sections: [
            {
                id: "A",
                icon: Globe,
                title: "Individual Rights & Data Control",
                items: [
                    "Right to Complete Access: Request a comprehensive report of all personal data, infrastructure logs, and communication archives retained by Opperd Technologies.",
                    "Right to Erasure (Data Oblivion): Request permanent deletion and purging of all temporary access credentials, developer staging databases, and deployment keys post-handoff.",
                    "Data Portability Guarantees: Full export of client source code repositories, database dumps, and environment configurations delivered in open, standard formats.",
                    "Right to Rectification: Instant correction of inaccurate contact profiles, invoice details, or corporate records upon official request.",
                ],
            },
            {
                id: "B",
                icon: Server,
                title: "Infrastructure Security & Incident Response",
                items: [
                    "Zero-Trust Staging Security: All client staging environments feature automated SSL encryption, DDoS mitigation, rate-limiting, and sanitized database test data.",
                    "Mandatory Breach Notification: In the event of a security breach affecting staging servers or shared secret vaults, impacted clients will be notified within 72 hours with incident audit logs.",
                ],
            },
        ],
    },
    affiliate: {
        title: "Affiliate, Partnership & Referral Policy",
        lastUpdated: "October 2026",
        description:
            "Clear commission guidelines, payout workflows, and partnership criteria for agencies, strategic consultants, and referral partners introducing projects to Opperd.",
        sections: [
            {
                id: "A",
                icon: Award,
                title: "Commission Structures & Partner Benefits",
                items: [
                    "Competitive Referral Commissions: Earn fixed percentage compensation for every qualified client project successfully signed and onboarded with Opperd Technologies.",
                    "Payout Trigger: Commission payouts trigger immediately after the referred client completes their initial milestone deposit invoice.",
                    "Beginner Partner Onboarding: Referral partners receive dedicated tracking links, client communication templates, and real-time deal pipeline status updates.",
                ],
            },
            {
                id: "B",
                icon: ShieldAlert,
                title: "Payout Channels & Ethical Guidelines",
                items: [
                    "Reliable Payout Channels: Referral earnings are disbursed via direct bank wire, international transfer, or online payment gateways within 7 business days of cleared client funds.",
                    "Prohibited Marketing Practices: Spam marketing, deceptive advertising, false technical claims, or self-referral schemes are strictly forbidden and result in immediate partner account termination.",
                ],
            },
        ],
    },
};
