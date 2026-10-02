"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const VIDEO_SOURCES = [
    { src: "https://assets.mixkit.co/videos/31802/31802-720.mp4", type: "video/mp4" },
];

const FEATURES = [
    {
        title: "Fast Performance",
        description: "Optimized for speed to deliver seamless user experiences.",
    },
    {
        title: "Modern Design",
        description: "Clean, responsive interfaces crafted for today's web.",
    },
    {
        title: "Scalable Tech",
        description: "Built with reliable tools to grow alongside your business.",
    },
];

export default function Hero() {
    const reduce = useReducedMotion();

    return (
        <section className="relative isolate overflow-hidden bg-white pb-20 pt-32 dark:bg-neutral-950 sm:pb-28 sm:pt-40">
            <div className="px-4">
                <div className="mx-auto max-w-[1080px] pl-[21px] pr-[9px]">
                    <div className="flex flex-col items-start text-left">
                        <motion.h1
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="text-4xl font-semibold leading-[1.06] tracking-tight text-neutral-950 dark:text-white sm:text-5xl lg:text-6xl"
                        >
                            Build Better.
                            <br />
                            Launch Faster.
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
                            className="mt-5 max-w-xl text-base leading-relaxed text-neutral-600 dark:text-neutral-300 sm:text-lg"
                        >
                            Opperd designs and builds websites, SaaS products and web apps
                            that help your business grow.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.16, ease: "easeOut" }}
                            className="mt-8 flex flex-wrap items-center gap-3"
                        >
                            <Link
                                href="#features"
                                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#4a4a4a] via-[#2a2a2a] to-[#121212] px-6 py-3 text-sm font-medium text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35),0_2px_8px_rgba(0,0,0,0.25)] transition hover:brightness-110 active:scale-95 dark:ring-1 dark:ring-white/15"
                            >
                                See Featured
                                <ArrowRight className="h-4 w-4" />
                            </Link>

                            <Link
                                href="#services"
                                className="inline-flex items-center rounded-full border border-neutral-200 bg-white/80 px-6 py-3 text-sm font-medium text-neutral-900 transition hover:bg-white active:scale-95 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                            >
                                Service
                            </Link>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                        className="-ml-[21px] -mr-[9px] mt-14 lg:mt-16"
                    >
                        <div className="rounded-3xl border border-neutral-200/80 bg-white/70 p-2 shadow-[0_30px_80px_-30px_rgba(49,46,129,0.35)] backdrop-blur-md dark:border-white/10 dark:bg-white/5 sm:p-3">
                            <div className="h-[260px] w-full overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900 sm:h-[400px] md:h-[520px] lg:h-[720px]">
                                <video
                                    className="pointer-events-none h-full w-full select-none object-cover object-top"
                                    autoPlay={!reduce}
                                    loop
                                    muted
                                    playsInline
                                    preload="auto"
                                    controls={false}
                                    disablePictureInPicture
                                    disableRemotePlayback
                                    tabIndex={-1}
                                    aria-label="Opperd dashboard preview"
                                >
                                    {VIDEO_SOURCES.map((source) => (
                                        <source key={source.src} src={source.src} type={source.type} />
                                    ))}
                                </video>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                        className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3"
                    >
                        {FEATURES.map((item, index) => (
                            <div key={index} className="flex flex-col">
                                <h3 className="text-lg font-semibold text-neutral-950 dark:text-white">
                                    {item.title}
                                </h3>
                                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
