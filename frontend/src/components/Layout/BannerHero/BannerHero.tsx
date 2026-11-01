import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function BannerHero() {
    return (
        <div className="px-5">
            <div className="relative container mx-auto w-full rounded-lg overflow-hidden shadow-lg min-h-[260px] sm:min-h-[320px] md:h-80 flex items-center my-4">
                {/* Background Image with Dark Overlay */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?q=80&w=1600&auto=format&fit=crop')`,
                    }}
                >
                    {/* Dark gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/60 to-black/30 md:to-transparent" />
                </div>

                {/* Content */}
                <div className="relative z-10 px-5 sm:px-8 md:px-16 max-w-xl text-white space-y-2.5 sm:space-y-4 py-8">
                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight leading-tight">
                        Returns made simple
                    </h1>
                    <p className="text-xs sm:text-sm md:text-base text-neutral-200 max-w-md">
                        Not happy with your purchase? It&apos;s easy to start a return.
                    </p>
                    <div className="pt-2 sm:pt-3">
                        <Link href="/join">
                            <Button
                                variant="default"
                                className="bg-white cursor-pointer text-black hover:bg-neutral-200 font-semibold px-6 py-2.5 sm:px-8 sm:py-3 md:px-10 md:py-5 rounded-full text-xs sm:text-sm transition-colors"
                            >
                                Sign in
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
