"use client";

import Link from "next/link";

export default function NotFound() {
    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080b16] px-6 py-16 text-white">
            <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
        @keyframes pulse { 0%, 100% { opacity: .35; transform: scale(.92); } 50% { opacity: .7; transform: scale(1.08); } }
        @keyframes twinkle { 0%, 100% { opacity: .2; } 50% { opacity: 1; } }
        .float { animation: float 5s ease-in-out infinite; }
        .pulse { animation: pulse 5s ease-in-out infinite; }
        .twinkle { animation: twinkle 2.5s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; scroll-behavior: auto !important; } }
      `}</style>

            <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="pulse absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/20 blur-[100px]" />
                <span className="twinkle absolute left-[18%] top-[22%] h-1 w-1 rounded-full bg-cyan-200" />
                <span className="twinkle absolute right-[22%] top-[30%] h-1.5 w-1.5 rounded-full bg-indigo-200 [animation-delay:.7s]" />
                <span className="twinkle absolute bottom-[23%] left-[28%] h-1 w-1 rounded-full bg-white [animation-delay:1.2s]" />
                <span className="twinkle absolute bottom-[31%] right-[17%] h-1 w-1 rounded-full bg-cyan-100 [animation-delay:1.7s]" />
            </div>

            <section className="relative z-10 mx-auto max-w-xl text-center">
                <div className="float relative mx-auto mb-8 flex h-36 w-64 items-center justify-center sm:h-44 sm:w-80">
                    <div className="absolute inset-0 rounded-full border border-white/10" />
                    <div className="absolute inset-4 rounded-full border border-dashed border-indigo-300/20" />
                    <span className="bg-gradient-to-b from-white to-indigo-200 bg-clip-text text-8xl font-black tracking-tighter text-transparent sm:text-9xl">404</span>
                    <span className="absolute right-8 top-4 text-2xl text-cyan-200" aria-hidden="true">✦</span>
                    <span className="absolute bottom-5 left-8 text-lg text-indigo-300" aria-hidden="true">✧</span>
                </div>

                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">Lost in space</p>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">This page drifted away</h1>
                <p className="mx-auto mt-4 max-w-md leading-7 text-slate-400">
                    The page you’re looking for doesn’t exist or may have moved. Let’s get you back on course.
                </p>
                <Link
                    href="/"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:-translate-y-0.5 hover:bg-indigo-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080b16]"
                >
                    <span aria-hidden="true">←</span> Back to home
                </Link>
            </section>
        </main>
    );
}
