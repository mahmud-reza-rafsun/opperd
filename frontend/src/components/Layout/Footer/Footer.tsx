"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import Image from "next/image";
import { LEGAL_POLICIES, PolicyData } from "@/components/data/legalPolicies";
import LegalModal from "@/components/modules/FooterModal/FooterModal";
import { COMPANY_DATA } from "@/components/data/company";
import { SUPPORT_DATA } from "@/components/data/support";

const BRAND = "Opperd Technologies";
const ADDRESS = "Bangladesh";
const PHONE = "+880 162-87455220";
const EMAIL = "contact@opperd.com";

const SOCIALS = [
    { label: "Facebook", href: "#", icon: FaFacebook },
    { label: "Instagram", href: "#", icon: FaInstagram },
    { label: "X", href: "#", icon: BsTwitterX },
    { label: "LinkedIn", href: "#", icon: FaLinkedin },
    { label: "YouTube", href: "#", icon: FaYoutube },
];

type LinkItem =
    | { label: string; href: string }
    | { label: string; key: string };

type LinkGroup = {
    title: string;
    links: LinkItem[];
};

const LINK_GROUPS: LinkGroup[] = [
    {
        title: "Company",
        links: [
            { label: "About Us", key: "about" },
            { label: "Career", key: "career" },
            { label: "Case Studies", key: "case-studies" },
            { label: "Contact us", key: "contact" },
        ],
    },
    {
        title: "Support",
        links: [
            { label: "FAQ", key: "faq" },
            { label: "Documentation", key: "docs" },
            { label: "Tutorial", key: "tutorial" },
            { label: "Support", key: "support" },
        ],
    },
    {
        title: "Legal Policies",
        links: [
            { label: "Terms & Conditions", key: "terms" },
            { label: "Privacy Policy", key: "privacy" },
            { label: "Refund Policy", key: "refund" },
            { label: "GDPR Compliance", key: "gdpr" },
            { label: "Affiliate Policy", key: "affiliate" },
        ],
    },
];

type Status = "idle" | "loading" | "success" | "error";

export default function Footer() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<Status>("idle");

    const [activePolicy, setActivePolicy] = useState<PolicyData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenPolicy = (key: string) => {
        const policy =
            (COMPANY_DATA[key] as unknown as PolicyData) ||
            (SUPPORT_DATA[key] as unknown as PolicyData) ||
            LEGAL_POLICIES[key];

        if (policy) {
            setActivePolicy(policy);
            setIsModalOpen(true);
        } else {
            console.warn(`Policy data not found for key: ${key}`);
        }
    };

    const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const res = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            if (!res.ok) throw new Error("Request failed");
            setStatus("success");
            setEmail("");
        } catch {
            setStatus("error");
        }
    };

    return (
        <footer className="relative overflow-hidden bg-neutral-50/50 dark:bg-neutral-950">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,0,0,0.07),transparent_55%)] dark:bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,255,255,0.08),transparent_55%)]"
            />
            <div className="relative mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8">
                {/* Newsletter row */}
                <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                        <h3 className="text-xl font-semibold tracking-tight text-neutral-950 dark:text-white sm:text-2xl">
                            Join our newsletter
                        </h3>
                        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                            Get product updates and web development tips delivered to your inbox.
                        </p>
                    </div>

                    <div className="w-full lg:w-auto">
                        <form onSubmit={handleSubscribe} className="flex flex-col gap-3 sm:flex-row">
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                aria-label="Email address"
                                className="flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 transition-all duration-200 placeholder:text-neutral-400 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/30 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/15 dark:bg-white/5 dark:text-white dark:placeholder:text-neutral-500 dark:ring-offset-neutral-950 dark:focus-visible:ring-white/40 sm:w-72"
                            />
                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="inline-flex h-10 shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md bg-linear-to-b from-[#4a4a4a] via-[#2a2a2a] to-[#121212] px-4 py-2 text-sm font-medium text-white transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/40 focus-visible:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 dark:ring-1 dark:ring-white/15 dark:ring-offset-neutral-950"
                            >
                                <span>{status === "loading" ? "Subscribing..." : "Subscribe"}</span>
                                {status !== "loading" && <ArrowRight className="h-4 w-4" />}
                            </button>
                        </form>

                        <p
                            role={status === "error" ? "alert" : undefined}
                            className={`mt-3 text-xs ${status === "error"
                                ? "font-medium text-red-600 dark:text-red-400"
                                : "text-neutral-500 dark:text-neutral-400"
                                }`}
                        >
                            {status === "success"
                                ? "You're subscribed. Thanks for joining!"
                                : status === "error"
                                    ? "Something went wrong. Please try again."
                                    : null}
                        </p>
                    </div>
                </div>

                <hr className="mt-12 border-neutral-200/80 dark:border-neutral-800" />

                {/* Main row */}
                <div className="grid grid-cols-1 gap-12 py-14 sm:grid-cols-3 lg:grid-cols-[1.4fr_auto_auto_auto] lg:gap-20">
                    {/* Brand + contact */}
                    <div className="sm:col-span-3 lg:col-span-1">
                        <Link href="/" className="inline-flex items-center gap-3">
                            <span className="text-xl font-bold tracking-tight text-neutral-950 dark:text-white">
                                {BRAND}
                            </span>
                        </Link>

                        <div className="mt-3">
                            <h4 className="text-sm font-bold text-neutral-950 dark:text-white">Address</h4>
                            <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400">{ADDRESS}</p>
                        </div>

                        <div className="mt-3">
                            <h4 className="text-sm font-bold text-neutral-950 dark:text-white">Contact Info</h4>
                            <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400">{PHONE}</p>
                            <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">{EMAIL}</p>
                        </div>

                        <div className="mt-3 flex items-center gap-4">
                            {SOCIALS.map(({ label, href, icon: Icon }) => (
                                <a
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    className="text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white"
                                >
                                    <Icon className="h-5 w-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    {LINK_GROUPS.map((group) => (
                        <div key={group.title} className="lg:text-right">
                            <h4 className="text-sm font-bold text-neutral-950 dark:text-white">
                                {group.title}
                            </h4>
                            <ul className="mt-5 space-y-4">
                                {group.links.map((link) => (
                                    <li key={link.label}>
                                        {"key" in link ? (
                                            <button
                                                type="button"
                                                onClick={() => handleOpenPolicy(link.key)}
                                                className="cursor-pointer text-xs text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white"
                                            >
                                                {link.label}
                                            </button>
                                        ) : (
                                            <Link
                                                href={link.href}
                                                className="text-xs text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white"
                                            >
                                                {link.label}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Large faded brand logo */}
                <div aria-hidden className="pointer-events-none select-none pb-6 lg:pb-10">
                    <Image
                        src="/footer.png"
                        alt=""
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="h-auto w-full opacity-5"
                    />
                </div>
            </div>

            {/* Legal Policy Modal */}
            <LegalModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                data={activePolicy}
            />
        </footer>
    );
}
