"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import {
    ChevronLeft,
    ChevronRight,
    Globe,
    ShoppingBag,
    Cloud,
    AppWindow,
    PenTool,
    Server,
    Layout,
    Building2,
    ShoppingCart,
} from "lucide-react";

const SERVICES = [
    {
        title: "Website Development",
        description: "Fast, SEO-ready websites that grow your business online",
        href: "/services/website-development",
        icon: Globe,
        badge: "WEB DEV",
        color: "bg-sky-100 text-sky-700 dark:bg-sky-500/10 dark:text-sky-400",
    },
    {
        title: "E-commerce Development",
        description: "Online stores built to turn visitors into customers",
        href: "/services/ecommerce-development",
        icon: ShoppingBag,
        badge: "E-COMMERCE",
        color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
    },
    {
        title: "SaaS Development",
        description: "Scalable subscription products, from MVP to launch",
        href: "/services/saas-development",
        icon: Cloud,
        badge: "SAAS",
        color: "bg-violet-100 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400",
    },
    {
        title: "Web Application Development",
        description: "Custom dashboards, portals and internal tools for your team",
        href: "/services/web-application-development",
        icon: AppWindow,
        badge: "WEB APP",
        color: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
    },
    {
        title: "Portfolio Design",
        description: "Clean, intuitive interfaces designed around your users",
        href: "/services/ui-ux-development",
        icon: PenTool,
        badge: "UI / UX",
        color: "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400",
    },
    {
        title: "API & Backend Development",
        description: "Secure APIs and databases that scale with your product",
        href: "/services/api-backend-development",
        icon: Server,
        badge: "BACKEND",
        color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400",
    },
    {
        title: "Custom Website",
        description: "Tailor-made web experiences built from scratch for your brand",
        href: "/services/custom-website",
        icon: Layout,
        badge: "CUSTOM",
        color: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
    },
    {
        title: "ERP Solution",
        description: "Integrated management software to streamline operations and workflow",
        href: "/services/erp-solution",
        icon: Building2,
        badge: "ENTERPRISE",
        color: "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400",
    },
    {
        title: "FMCG Solution",
        description: "Distribution, inventory, and supply chain tools for consumer goods",
        href: "/services/fmcg-solution",
        icon: ShoppingCart,
        badge: "SUPPLY CHAIN",
        color: "bg-teal-100 text-teal-700 dark:bg-teal-500/10 dark:text-teal-400",
    },
];

// Continuous loop generator
const INFINITE_SERVICES = [...SERVICES, ...SERVICES, ...SERVICES];

export default function ServicesCarousel() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Initial center scroll position setup
    useEffect(() => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const singleSetWidth = container.scrollWidth / 3;
            container.scrollLeft = singleSetWidth;
        }
    }, []);

    // Handle Infinite Loop Scroll Reset
    const handleScroll = () => {
        if (!scrollContainerRef.current) return;
        const container = scrollContainerRef.current;
        const singleSetWidth = container.scrollWidth / 3;

        if (container.scrollLeft <= 0) {
            container.scrollLeft = singleSetWidth;
        } else if (container.scrollLeft >= singleSetWidth * 2) {
            container.scrollLeft = singleSetWidth;
        }
    };

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const scrollAmount = direction === "left" ? -340 : 340;
            scrollContainerRef.current.scrollBy({
                left: scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <section className="bg-neutral-50/50 py-20 dark:bg-neutral-950">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header & Controls */}
                <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
                    <div>
                        <span className="rounded-full border border-neutral-200 bg-white px-4 py-1.5 text-xs font-semibold text-neutral-800 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
                            Workflow
                        </span>

                        <h2 className="mt-6 text-xl font-semibold tracking-tight text-neutral-950 dark:text-white sm:text-2xl lg:text-3xl">
                            All your workflows in one place
                        </h2>

                        <p className="mt-4 max-w-xl text-base text-neutral-600 dark:text-neutral-400 sm:text-sm">
                            From first hello to final receipt — every step of running a client project lives inside Runey. No more juggling 8 tools.
                        </p>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center gap-3 self-end md:self-auto">
                        <button
                            onClick={() => scroll("left")}
                            aria-label="Scroll Left"
                            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 transition hover:bg-neutral-100 active:scale-95 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            aria-label="Scroll Right"
                            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 transition hover:bg-neutral-100 active:scale-95 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* Infinite Loop Carousel Container */}
                <div
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="mt-12 flex overflow-x-auto pb-4 no-scrollbar gap-5 select-none"
                >
                    {INFINITE_SERVICES.map((service, index) => {
                        const Icon = service.icon;

                        return (
                            <div
                                className="group flex flex-col justify-between shrink-0 w-[280px] sm:w-[320px] rounded-3xl border border-neutral-200/80 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900/60 dark:hover:border-neutral-700"
                            >
                                <div>
                                    <div
                                        className={`flex h-12 w-12 items-center justify-center rounded-2xl ${service.color}`}
                                    >
                                        <Icon className="h-5 w-5" />
                                    </div>

                                    <div className="mt-8">
                                        <span className="rounded-md border border-neutral-100 bg-neutral-100/80 px-2.5 py-1 text-[10px] font-bold tracking-wider text-neutral-500 uppercase dark:border-neutral-800 dark:bg-neutral-800 dark:text-neutral-400">
                                            {service.badge}
                                        </span>
                                    </div>

                                    <h3 className="mt-4 text-lg font-bold tracking-tight text-neutral-950 dark:text-white group-hover:text-neutral-800 dark:group-hover:text-neutral-200">
                                        {service.title}
                                    </h3>

                                    <p className="mt-2.5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                                        {service.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
