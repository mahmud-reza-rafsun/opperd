"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
    AppWindow,
    ChevronDown,
    Cloud,
    Globe,
    Menu,
    PenTool,
    Server,
    ShoppingBag,
    X,
} from "lucide-react";

const NAV_LINKS = [
    { label: "FAQ", href: "#faq" },
    { label: "Pricing", href: "#pricing" },
    { label: "Updates", href: "#updates" },
];

const SERVICES = [
    {
        title: "Website Development",
        description: "Fast, SEO-ready websites that grow your business online",
        href: "/services/website-development",
        icon: Globe,
        color: "bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400",
    },
    {
        title: "E-commerce Development",
        description: "Online stores built to turn visitors into customers",
        href: "/services/ecommerce-development",
        icon: ShoppingBag,
        color: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
    },
    {
        title: "SaaS Development",
        description: "Scalable subscription products, from MVP to launch",
        href: "/services/saas-development",
        icon: Cloud,
        color: "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
    },
    {
        title: "Web Application Development",
        description: "Custom dashboards, portals and internal tools for your team",
        href: "/services/web-application-development",
        icon: AppWindow,
        color: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
    },
    {
        title: "UI/UX Development",
        description: "Clean, intuitive interfaces designed around your users",
        href: "/services/ui-ux-development",
        icon: PenTool,
        color: "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400",
    },
    {
        title: "API & Backend Development",
        description: "Secure APIs and databases that scale with your product",
        href: "/services/api-backend-development",
        icon: Server,
        color: "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400",
    },
];

const smooth = { duration: 0.4, ease: "easeInOut" as const };

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [featuresOpen, setFeaturesOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const onMouseDown = (e: MouseEvent) => {
            if (!navRef.current?.contains(e.target as Node)) {
                setFeaturesOpen(false);
            }
        };
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setFeaturesOpen(false);
                setMobileOpen(false);
            }
        };
        document.addEventListener("mousedown", onMouseDown);
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("mousedown", onMouseDown);
            document.removeEventListener("keydown", onKeyDown);
        };
    }, []);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileOpen]);

    const closeAll = () => {
        setFeaturesOpen(false);
        setMobileOpen(false);
    };

    const linkClass =
        "rounded-full px-3 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-300 dark:hover:bg-white/10 dark:hover:text-white";

    return (
        <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4">
            <motion.nav
                ref={navRef}
                aria-label="Main"
                initial={false}
                animate={{
                    maxWidth: scrolled ? 680 : 1080,
                    height: scrolled ? 48 : 56,
                    marginTop: scrolled ? 12 : 20,
                    paddingLeft: scrolled ? 16 : 20,
                    paddingRight: scrolled ? 6 : 8,
                }}
                transition={smooth}
                className={`pointer-events-auto relative flex w-full items-center justify-between border transition-[background-color,border-color,box-shadow,border-radius] duration-300 md:rounded-full md:backdrop-blur-md dark:md:border-white/10 dark:md:bg-neutral-950/90 ${scrolled
                    ? "rounded-full border-neutral-200/80 bg-white/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] backdrop-blur-md dark:border-white/10 dark:bg-neutral-950/90"
                    : "rounded-none border-transparent bg-transparent"
                    }`}
            >
                <Link href="/" onClick={closeAll} className="flex shrink-0 items-center pr-2">
                    Opperd
                </Link>

                <ul className="hidden items-center gap-1 md:flex">
                    <li>
                        <button
                            type="button"
                            aria-expanded={featuresOpen}
                            onClick={() => setFeaturesOpen((open) => !open)}
                            className={`${linkClass} inline-flex cursor-pointer items-center gap-1 ${featuresOpen ? "bg-neutral-100 dark:bg-white/10" : ""
                                }`}
                        >
                            Service
                            <motion.span
                                animate={{ rotate: featuresOpen ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                                className="flex"
                            >
                                <ChevronDown className="h-3.5 w-3.5 text-neutral-500" />
                            </motion.span>
                        </button>
                    </li>

                    {NAV_LINKS.map((item) => (
                        <li key={item.label}>
                            <Link href={item.href} onClick={closeAll} className={linkClass}>
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <AnimatePresence>
                    {featuresOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.18, ease: "easeOut" }}
                            className="absolute -inset-x-px top-full mt-2 hidden rounded-3xl border border-neutral-200/80 bg-white p-5 shadow-xl dark:border-white/10 dark:bg-neutral-900 md:block"
                        >
                            <div className={`grid gap-1 ${scrolled ? "grid-cols-2" : "grid-cols-3"} gap-4`}>
                                {SERVICES.map((item) => (
                                    <Link
                                        key={item.title}
                                        href={item.href}
                                        onClick={closeAll}
                                        className="flex border items-center gap-3 rounded-2xl p-4 transition-colors hover:bg-neutral-100 dark:hover:bg-white/5"
                                    >
                                        <span
                                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.color}`}
                                        >
                                            <item.icon className="h-5 w-5" />
                                        </span>
                                        <span className="min-w-0">
                                            <span className="block truncate text-sm font-medium text-neutral-900 dark:text-white">
                                                {item.title}
                                            </span>
                                            <span className="mt-0.5 block text-xs leading-snug text-neutral-500 dark:text-neutral-400">
                                                {item.description}
                                            </span>
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex items-center gap-2">
                    <Link href="#login" onClick={closeAll} className={`${linkClass} hidden md:inline-flex`}>
                        Log in
                    </Link>

                    <Link
                        href="#start"
                        onClick={closeAll}
                        className="hidden items-center justify-center whitespace-nowrap rounded-full bg-gradient-to-b from-[#4a4a4a] via-[#2a2a2a] to-[#121212] px-4 py-1.5 text-xs font-medium text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35),0_2px_8px_rgba(0,0,0,0.25)] transition hover:brightness-110 active:scale-95 md:inline-flex md:text-sm"
                    >
                        Start for free
                    </Link>

                    <button
                        type="button"
                        aria-label={mobileOpen ? "Close menu" : "Open menu"}
                        aria-expanded={mobileOpen}
                        onClick={() => setMobileOpen((open) => !open)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-white/10 md:hidden"
                    >
                        {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </motion.nav>

            {mounted &&
                createPortal(
                    <AnimatePresence>
                        {mobileOpen && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className="fixed inset-0 z-[60] flex flex-col bg-white dark:bg-neutral-950 md:hidden"
                            >
                                <div className="flex h-16 shrink-0 items-center justify-between px-5">
                                    <Link href="/" onClick={closeAll} className="flex items-center">
                                        <Image
                                            src="/logo.png"
                                            alt="Logo"
                                            width={110}
                                            height={32}
                                            className="h-7 w-auto object-contain dark:invert"
                                        />
                                    </Link>
                                    <button
                                        type="button"
                                        aria-label="Close menu"
                                        onClick={closeAll}
                                        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-white/10"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>

                                <div className="flex flex-1 flex-col overflow-y-auto px-5 pb-6">
                                    <div className="flex flex-col gap-1">
                                        {SERVICES.map((item) => (
                                            <Link
                                                key={item.title}
                                                href={item.href}
                                                onClick={closeAll}
                                                className="flex items-center gap-3 rounded-xl px-3 py-2 text-base font-medium text-neutral-800 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-white/5"
                                            >
                                                <span
                                                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${item.color}`}
                                                >
                                                    <item.icon className="h-4 w-4" />
                                                </span>
                                                {item.title}
                                            </Link>
                                        ))}
                                    </div>

                                    <div className="my-3 border-t border-dashed border-neutral-300 dark:border-white/20" />

                                    <div className="flex flex-col gap-1">
                                        {NAV_LINKS.map((item) => (
                                            <Link
                                                key={item.label}
                                                href={item.href}
                                                onClick={closeAll}
                                                className="rounded-xl px-3 py-2 text-base font-medium text-neutral-800 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-white/5"
                                            >
                                                {item.label}
                                            </Link>
                                        ))}
                                    </div>

                                    <div className="mt-auto flex items-center justify-center gap-3 pt-6">
                                        <Link
                                            href="#login"
                                            onClick={closeAll}
                                            className="inline-flex items-center justify-center rounded-full border border-neutral-300 px-6 py-2 text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-100 dark:border-white/20 dark:text-neutral-200 dark:hover:bg-white/10"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href="#start"
                                            onClick={closeAll}
                                            className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-gradient-to-b from-[#4a4a4a] via-[#2a2a2a] to-[#121212] px-6 py-2 text-sm font-medium text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35),0_2px_8px_rgba(0,0,0,0.25)] transition hover:brightness-110 active:scale-95"
                                        >
                                            Start for free
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>,
                    document.body
                )}
        </header>
    );
}
