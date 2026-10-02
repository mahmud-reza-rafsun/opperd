"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ChevronDown, ArrowRight } from "lucide-react";

type BillingCycle = "monthly" | "yearly" | "lifetime";

interface PricingPlan {
    id: string;
    name: string;
    description: string;
    monthlyPrice?: number;
    originalMonthlyPrice?: number;
    yearlyPrice?: number;
    originalYearlyPrice?: number;
    lifetimePrice?: number;
    originalLifetimePrice?: number;
    isCustomPrice?: boolean;
    users: string;
    ctaText: string;
    ctaHref: string;
    initialFeatures: string[];
    moreFeatures: string[];
}

const CYCLES: { id: BillingCycle; label: string }[] = [
    { id: "monthly", label: "Monthly" },
    { id: "yearly", label: "Yearly" },
    { id: "lifetime", label: "Lifetime" },
];

const PLANS: PricingPlan[] = [
    {
        id: "starter",
        name: "Starter",
        description: "For startups & growing web projects",
        monthlyPrice: 149,
        originalMonthlyPrice: 299,
        yearlyPrice: 99,
        originalYearlyPrice: 198,
        lifetimePrice: 1299,
        originalLifetimePrice: 2599,
        users: "Up to 2 active projects",
        ctaText: "Get Started",
        ctaHref: "/checkout?plan=starter",
        initialFeatures: [
            "Custom landing page design & build",
            "Fully responsive layout (Mobile & Desktop)",
            "Basic SEO & performance optimization",
            "Contact form & analytics setup",
        ],
        moreFeatures: [
            "Speed tuning (100/100 Lighthouse target)",
            "Figma design source file export",
            "1 month post-launch support",
            "Standard delivery window (7–10 days)",
        ],
    },
    {
        id: "agency",
        name: "Agency",
        description: "For scale-ups & full web applications",
        monthlyPrice: 399,
        originalMonthlyPrice: 799,
        yearlyPrice: 249,
        originalYearlyPrice: 498,
        lifetimePrice: 2999,
        originalLifetimePrice: 5999,
        users: "Up to 8 active projects",
        ctaText: "Choose Agency",
        ctaHref: "/checkout?plan=agency",
        initialFeatures: [
            "Everything in Starter",
            "Full Web App / SaaS UI Development",
            "Interactive components & Framer Motion",
            "Database, Auth & API integrations",
            "Priority support & dedicated Slack channel",
        ],
        moreFeatures: [
            "100% full source code ownership",
            "Custom dashboard & CMS setup",
            "3 months dedicated maintenance & updates",
            "Express delivery option",
        ],
    },
    {
        id: "enterprise",
        name: "Enterprise",
        description: "For custom ERP, FMCG, & high-complexity platforms",
        isCustomPrice: true,
        users: "Unlimited projects & custom scope",
        ctaText: "Contact Sales",
        ctaHref: "/contact?plan=enterprise",
        initialFeatures: [
            "Everything in Agency",
            "Tailor-made ERP, FMCG & Dashboard solutions",
            "High-load microservice architecture design",
            "Cost management & workflow automation",
            "Dedicated lead engineer & 24/7 priority support",
        ],
        moreFeatures: [
            "Custom SLA agreement & compliance setup",
            "Automated CI/CD deployment pipeline",
            "Quarterly code audits & security reviews",
            "On-demand team expansion & consultation",
        ],
    },
];

function getPricing(plan: PricingPlan, cycle: BillingCycle) {
    if (plan.isCustomPrice) return null;

    const map = {
        monthly: {
            price: plan.monthlyPrice,
            original: plan.originalMonthlyPrice,
            period: "/month",
            note: "Billed monthly. Cancel anytime.",
        },
        yearly: {
            price: plan.yearlyPrice,
            original: plan.originalYearlyPrice,
            period: "/month",
            note:
                plan.yearlyPrice !== undefined && plan.originalYearlyPrice !== undefined
                    ? `Billed yearly: $${plan.yearlyPrice * 12}/year (was $${plan.originalYearlyPrice * 12})`
                    : "",
        },
        lifetime: {
            price: plan.lifetimePrice,
            original: plan.originalLifetimePrice,
            period: "one-time",
            note: "Pay once, use forever. No renewals.",
        },
    } as const;

    const { price, original, period, note } = map[cycle];
    if (price === undefined || original === undefined) return null;

    const discount = Math.round((1 - price / original) * 100);
    return { price, original, period, note, discount };
}

export default function PricingSection() {
    const [billingCycle, setBillingCycle] = useState<BillingCycle>("yearly");
    const [expandedPlans, setExpandedPlans] = useState<Record<string, boolean>>({});

    const activeIndex = CYCLES.findIndex((c) => c.id === billingCycle);

    const toggleExpand = (planId: string) => {
        setExpandedPlans((prev) => ({
            ...prev,
            [planId]: !prev[planId],
        }));
    };

    return (
        <section className="bg-neutral-50/50 py-20 dark:bg-neutral-950">
            {/* Keyframes for the price swap when the billing cycle changes */}
            <style>{`
                @keyframes price-swap {
                    from { opacity: 0; transform: translateY(8px); filter: blur(2px); }
                    to   { opacity: 1; transform: translateY(0);   filter: blur(0); }
                }
                .price-swap { animation: price-swap 350ms cubic-bezier(0.22, 1, 0.36, 1) both; }
                @media (prefers-reduced-motion: reduce) {
                    .price-swap { animation: none; }
                }
            `}</style>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col items-center text-center">
                    <span className="rounded-full border border-neutral-200 bg-white px-4 py-1.5 text-xs font-semibold text-neutral-800 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
                        Pricing
                    </span>

                    <h2 className="mt-6 text-xl font-semibold tracking-tight text-neutral-950 dark:text-white sm:text-2xl lg:text-3xl">
                        Simple, transparent pricing
                    </h2>

                    <p className="mt-4 text-base text-neutral-600 dark:text-neutral-400 sm:text-sm">
                        Everything you need to launch and scale your web applications. No hidden fees.
                    </p>

                    {/* Billing Cycle Switcher: sliding pill */}
                    <div
                        role="tablist"
                        aria-label="Billing cycle"
                        className="relative mt-8 grid grid-cols-3 rounded-full border border-neutral-200/80 bg-neutral-100/80 p-1 dark:border-neutral-800 dark:bg-neutral-900"
                    >
                        <span
                            aria-hidden
                            className="absolute inset-y-1 left-1 w-[calc((100%-0.5rem)/3)] rounded-full bg-neutral-900 shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] dark:bg-white"
                            style={{ transform: `translateX(${activeIndex * 100}%)` }}
                        />

                        {CYCLES.map((cycle) => {
                            const active = billingCycle === cycle.id;
                            return (
                                <button
                                    key={cycle.id}
                                    role="tab"
                                    aria-selected={active}
                                    onClick={() => setBillingCycle(cycle.id)}
                                    className={`relative z-10 flex items-center justify-center gap-1 rounded-full px-3.5 py-1.5 text-[11px] font-medium transition-colors cursor-pointer ${active
                                            ? "text-white dark:text-neutral-950"
                                            : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                                        }`}
                                >
                                    <span>{cycle.label}</span>
                                    {cycle.id === "yearly" && (
                                        <span
                                            className={`rounded-full px-1.5 py-0.2 text-[9px] font-bold transition-colors duration-300 ${active
                                                    ? "bg-white/20 text-white dark:bg-neutral-950/10 dark:text-neutral-950"
                                                    : "bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                                                }`}
                                        >
                                            -50%
                                        </span>
                                    )}
                                    {cycle.id === "lifetime" && <span className="text-[10px]">🔥</span>}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {PLANS.map((plan) => {
                        const isExpanded = !!expandedPlans[plan.id];
                        const pricing = getPricing(plan, billingCycle);

                        return (
                            <div
                                key={plan.id}
                                className="relative flex flex-col justify-between rounded-3xl border border-neutral-200/80 bg-white p-7 shadow-[0_10px_30px_rgba(0,0,0,0.03)] dark:border-neutral-800 dark:bg-neutral-900/60"
                            >
                                {/* Discount tag (hidden for custom pricing) */}
                                {pricing && (
                                    <div className="absolute right-6 top-6">
                                        <span
                                            key={`${billingCycle}-tag`}
                                            className="price-swap inline-block rounded-full bg-neutral-900 px-3 py-1 text-[11px] font-bold text-white dark:bg-white dark:text-neutral-950"
                                        >
                                            -{pricing.discount}%
                                        </span>
                                    </div>
                                )}

                                <div>
                                    <h3 className="text-xl font-bold text-neutral-950 dark:text-white">
                                        {plan.name}
                                    </h3>
                                    <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                                        {plan.description}
                                    </p>

                                    {/* Price (fixed height so cards don't jump when cycle changes) */}
                                    <div className="mt-6 min-h-[4.5rem]">
                                        {pricing ? (
                                            <div
                                                key={`${billingCycle}-price`}
                                                className="price-swap flex flex-wrap items-baseline gap-x-1.5"
                                            >
                                                <span className="text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-white sm:text-5xl">
                                                    ${pricing.price.toLocaleString()}
                                                </span>
                                                <span className="text-sm text-neutral-500 line-through">
                                                    ${pricing.original.toLocaleString()}
                                                </span>
                                                <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                                                    {pricing.period}
                                                </span>
                                            </div>
                                        ) : (
                                            <div className="flex items-baseline gap-1.5">
                                                <span className="text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-white sm:text-5xl">
                                                    Custom
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Billing note */}
                                    <p className="mt-2 min-h-[1rem] text-xs text-neutral-500 dark:text-neutral-400">
                                        {pricing ? (
                                            <span key={`${billingCycle}-note`} className="price-swap inline-block">
                                                {pricing.note}
                                            </span>
                                        ) : (
                                            "Pricing based on your project scope"
                                        )}
                                    </p>

                                    {/* Users scope */}
                                    <div className="mt-4 flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400">
                                        <span>👤 {plan.users}</span>
                                    </div>

                                    {/* Features */}
                                    <ul className="mt-8 space-y-3.5 text-xs font-medium text-neutral-700 dark:text-neutral-300">
                                        {plan.initialFeatures.map((feat, idx) => (
                                            <li key={idx} className="flex items-start gap-3">
                                                <Check className="h-4 w-4 shrink-0 text-neutral-900 dark:text-white" />
                                                <span>{feat}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Collapsible features: smooth height via grid-rows */}
                                    <div
                                        className={`grid transition-[grid-template-rows,visibility] duration-500 ease-in-out ${isExpanded
                                            ? "visible grid-rows-[1fr]"
                                            : "invisible grid-rows-[0fr]"
                                            }`}
                                        aria-hidden={!isExpanded}
                                    >
                                        <div className="overflow-hidden">
                                            <ul className="space-y-3.5 pt-3.5 text-xs font-medium text-neutral-700 dark:text-neutral-300">
                                                {plan.moreFeatures.map((feat, idx) => (
                                                    <li key={`more-${idx}`} className="flex items-start gap-3">
                                                        <Check className="h-4 w-4 shrink-0 text-neutral-900 dark:text-white" />
                                                        <span>{feat}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Toggle button */}
                                    <button
                                        onClick={() => toggleExpand(plan.id)}
                                        aria-expanded={isExpanded}
                                        className="mt-6 flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white"
                                    >
                                        <span>{isExpanded ? "Show less" : "See all features"}</span>
                                        <ChevronDown
                                            className={`h-3.5 w-3.5 transition-transform duration-500 ease-in-out ${isExpanded ? "rotate-180" : ""
                                                }`}
                                        />
                                    </button>
                                </div>

                                {/* CTA */}
                                <div className="mt-8">
                                    <Link
                                        href={plan.ctaHref}
                                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#4a4a4a] via-[#2a2a2a] to-[#121212] px-6 py-3.5 text-sm font-semibold text-white shadow-md dark:ring-1 dark:ring-white/20"
                                    >
                                        <span>{plan.ctaText}</span>
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Footer Note */}
                <div className="mt-12 text-center text-xs text-neutral-500 dark:text-neutral-400">
                    <p>Cancel anytime. Secure payments powered by Stripe & Razorpay.</p>
                    <p className="mt-1.5">
                        Have a question?{" "}
                        <Link href="/contact" className="font-semibold text-neutral-900 underline dark:text-white">
                            Get in touch
                        </Link>{" "}
                        and we&apos;ll get back to you.
                    </p>
                </div>
            </div>
        </section>
    );
}
