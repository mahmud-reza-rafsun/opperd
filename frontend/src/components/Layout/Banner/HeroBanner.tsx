"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, EffectFade, Keyboard, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import Link from "next/link";
import { slides } from "../utils/side";

const AUTOPLAY_MS = 3000;

export default function Banner() {
    const swiperRef = useRef<SwiperType | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [restartKey, setRestartKey] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const goTo = (index: number) => {
        swiperRef.current?.slideToLoop(index);
    };

    if (!isMounted) {
        return (
            <div className="container mx-auto">
                <section className="relative h-[80vh] min-h-[360px] rounded-lg lg:mt-8 md:mt-5 w-full overflow-hidden bg-[#F3F1ED] dark:bg-[#0F0F10]" />
            </div>
        );
    }

    return (
        <div className="container mx-auto">
            <section
                aria-roledescription="carousel"
                aria-label="Featured collections"
                className="relative h-[80vh] min-h-[360px] rounded-lg lg:mt-8 md:mt-5 w-full overflow-hidden bg-[#F3F1ED] text-[#17171A] dark:bg-[#0F0F10] dark:text-[#F5F4F1]">
                <style dangerouslySetInnerHTML={{
                    __html: `
                @keyframes hero-rail-fill {
                    from { width: 0%; }
                    to { width: 100%; }
                }
                .animate-rail-fill {
                    animation: hero-rail-fill ${AUTOPLAY_MS}ms linear forwards;
                }
            `}} />

                <Swiper
                    modules={[Autoplay, EffectFade, Keyboard, A11y]}
                    effect="fade"
                    fadeEffect={{ crossFade: true }}
                    speed={700}
                    loop
                    keyboard={{ enabled: true }}
                    autoplay={{ delay: AUTOPLAY_MS, disableOnInteraction: false }}
                    onSwiper={(swiper: SwiperType) => {
                        swiperRef.current = swiper;
                    }}
                    onSlideChange={(swiper: SwiperType) => {
                        setActiveIndex(swiper.realIndex);
                        setRestartKey((k) => k + 1);
                    }}
                    className="h-full w-full"
                >
                    {slides.map((slide, i) => (
                        <SwiperSlide key={slide.title}>
                            <div className="relative h-full w-full">
                                <Image
                                    src={slide.image}
                                    alt={slide.imageAlt}
                                    fill
                                    priority={i === 0}
                                    sizes="100vw"
                                    className="object-cover"
                                />
                                <div
                                    className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent
                                           dark:from-black/70 dark:via-black/35 dark:to-black/10"
                                    aria-hidden="true"
                                />

                                <div className="relative z-10 flex h-full items-center px-6 sm:px-10 md:px-16 lg:px-24">
                                    <div className="max-w-xl text-white">
                                        <p className="mb-4 font-[var(--font-body)] text-xs font-medium uppercase tracking-[0.25em] text-white/70 sm:text-sm">
                                            {slide.eyebrow}
                                        </p>

                                        <h1 className="whitespace-pre-line font-[var(--font-display)] text-[2.75rem] font-medium leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
                                            {slide.title}
                                        </h1>

                                        <p className="mt-6 max-w-md font-[var(--font-body)] text-base leading-relaxed text-white/80 sm:text-lg">
                                            {slide.description}
                                        </p>

                                        <Link
                                            href="/products"
                                            className="group mt-9 inline-flex items-center cursor-pointer gap-3 rounded-full bg-[#F5F4F1] px-7 py-3.5
                                                   font-[var(--font-body)] text-sm font-semibold uppercase tracking-wide text-[#17171A]
                                                   transition-all duration-300 ease-out hover:gap-4 hover:bg-[#C7A874]
                                                   focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                                                   focus-visible:outline-[#C7A874] motion-reduce:transition-none"
                                        >
                                            {slide.ctaLabel}
                                            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">
                                                →
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <nav
                    aria-label="Choose slide"
                    className="absolute bottom-8 right-6 z-20 flex gap-4 sm:right-10 md:bottom-10 md:right-16 lg:right-24"
                >
                    {slides.map((slide: any, i: any) => {
                        const isActive = i === activeIndex;
                        return (
                            <button
                                key={slide.title}
                                type="button"
                                onClick={() => goTo(i)}
                                aria-current={isActive ? "true" : undefined}
                                aria-label={`Go to slide ${i + 1}: ${slide.title.replace("\n", " ")}`}
                                className="group flex items-center gap-2 text-left text-white/60 transition-colors duration-300 hover:text-white"
                            >
                                <span className="font-[var(--font-body)] text-xs tabular-nums">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <span className="relative h-px w-6 overflow-hidden bg-white/25 sm:w-8 md:w-10">
                                    {isActive && (
                                        <span
                                            key={restartKey}
                                            className="absolute inset-y-0 left-0 block bg-[#C7A874] animate-rail-fill motion-reduce:w-full"
                                        />
                                    )}
                                </span>
                            </button>
                        );
                    })}
                </nav>
            </section>
        </div>
    );
}
