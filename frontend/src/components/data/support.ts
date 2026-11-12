import {
    HelpCircle,
    BookOpen,
    LifeBuoy,
    Terminal,
    ShieldAlert,
    Wrench,
    Package,
    Camera,
    Tag,
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
        lastUpdated: "November 2026",
        description:
            "Answers to common questions about buying and selling on Opperd in the EU and UK.",
        sections: [
            {
                id: "A",
                icon: HelpCircle,
                title: "General",
                items: [
                    "Q: Where is Opperd available? - A: Opperd is available only to users in the European Union and the United Kingdom.",
                    "Q: Does Opperd sell products? - A: No. Opperd is a platform. Products are sold directly between users.",
                    "Q: Is there a fee to use Opperd? - A: Fee information, if any, is shown clearly in the listing or account settings before you publish.",
                ],
            },
            {
                id: "B",
                icon: Tag,
                title: "Buying & Selling",
                items: [
                    "Q: How do I sell a product? - A: Create an account, upload photos, add a description and price, then publish your listing.",
                    "Q: How do I buy a product? - A: Find a listing, message the seller, and arrange payment and collection with them.",
                    "Q: Can I return a product? - A: Opperd does not handle returns. Returns, if any, are agreed between buyer and seller.",
                ],
            },
            {
                id: "C",
                icon: Package,
                title: "Account & Listings",
                items: [
                    "Q: Can I edit or remove my listing? - A: Yes, you can edit or delete your listing at any time from your dashboard.",
                    "Q: Why was my listing removed? - A: Listings are removed if they break our Terms & Conditions. You can contact us for details.",
                ],
            },
        ],
    },
    guide: {
        title: "Buying & Selling Guide",
        lastUpdated: "November 2026",
        description:
            "Step-by-step instructions for buyers and sellers using the Opperd platform.",
        sections: [
            {
                id: "A",
                icon: BookOpen,
                title: "For Buyers",
                items: [
                    "Browse or search listings and check the description, photos, and condition.",
                    "Message the seller with any questions before agreeing to buy.",
                    "Agree on payment and collection, meet in a safe place, and check the item before paying.",
                ],
            },
            {
                id: "B",
                icon: Package,
                title: "For Sellers",
                items: [
                    "Create an account and complete your profile.",
                    "Upload clear photos and describe any defects honestly.",
                    "Respond to buyer messages promptly and arrange a safe handover.",
                ],
            },
            {
                id: "C",
                icon: Camera,
                title: "Photo Tips",
                items: [
                    "Use natural daylight and a plain background.",
                    "Show the product from front, back, sides, and any damaged areas.",
                ],
            },
        ],
    },
    tech_help: {
        title: "Website & Account Help",
        lastUpdated: "November 2026",
        description:
            "Help with account access, website issues, and technical problems on the Opperd platform.",
        sections: [
            {
                id: "A",
                icon: Terminal,
                title: "Account & Login",
                items: [
                    "Forgot password: Use the reset link on the login page to receive a reset email.",
                    "Update profile: Go to account settings to change your details.",
                ],
            },
            {
                id: "B",
                icon: Wrench,
                title: "Common Issues",
                items: [
                    "Page not loading: Clear your browser cache or try a different browser.",
                    "Photos not uploading: Check the file size and format, then try again.",
                ],
            },
        ],
    },
    support: {
        title: "Customer Support",
        lastUpdated: "November 2026",
        description:
            "How to contact the Opperd team for account, listing, or platform help.",
        sections: [
            {
                id: "A",
                icon: LifeBuoy,
                title: "Support Channel",
                items: [
                    "Email: contact.opperd@gmail.com",
                    "Please include your account email and a clear description of the issue.",
                ],
            },
            {
                id: "B",
                icon: ShieldAlert,
                title: "Reports & Safety",
                items: [
                    "Report a listing or user using the report button on the listing page.",
                    "For urgent safety concerns, contact the police or local emergency services first.",
                    "Suspected fraud should also be reported to your bank and, where relevant, to Action Fraud (UK) or your national consumer authority (EU).",
                ],
            },
        ],
    },
};
