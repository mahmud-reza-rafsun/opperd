"use client";

import { UserRoundPlus, } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import NotificationDropdown from "./Notification";
import Theme from "@/components/provider/Theme";
import { useLocation } from "@/hooks/useLocation";
import SellProduct from "./SellProduct";
import { useUser } from "@/hooks/useUser";
import UserMenu from "@/components/modules/user/User";
import { useAuthModal } from "@/hooks/useAuthModal";
import SearchBar from "../SearchBar/SearchBar";

export default function Navbar() {
    const { location } = useLocation();
    const { user } = useUser();
    return (
        <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white transition-colors dark:border-zinc-800 dark:bg-gray-900">

            <div className="container mx-auto px-3 sm:px-4">

                <div className="h-16 flex justify-between items-center gap-3 lg:gap-5">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex shrink-0 items-center"
                    >
                        <Image
                            src="/logo.png"
                            alt="Opperd"
                            width={76}
                            height={76}
                            priority
                            className="h-11 w-auto object-contain"
                        />
                    </Link>
                    <div className="hidden min-w-0 items-center justify-center px-2 md:flex lg:px-4">
                        <div className="w-full max-w-2xl">
                            <SearchBar />
                        </div>
                    </div>

                    {/* Desktop Actions */}
                    <div className="flex shrink-0 items-center justify-end gap-1 ">
                        <div className="flex shrink-0 items-center md:hidden">
                            <SearchBar />
                        </div>
                        <div className="flex shrink-0 items-center gap-1">
                            {/* Location */}
                            {location?.country && (
                                <div
                                    title={location.country}
                                    className="flex h-9 w-9 shrink-0 cursor-default items-center justify-center rounded-lg border border-zinc-200 text-base dark:border-zinc-700"
                                >
                                    {location.countryCode ? (
                                        <span className="text-lg leading-none">
                                            {location.countryCode
                                                .toUpperCase()
                                                .replace(/./g, (char) =>
                                                    String.fromCodePoint(127397 + char.charCodeAt(0))
                                                )}
                                        </span>
                                    ) : (
                                        <span>🌍</span>
                                    )}
                                </div>
                            )}
                            <NotificationDropdown />
                            <Theme />
                        </div>
                        <div className="mx-1 h-6 w-px bg-zinc-200 dark:bg-zinc-800" />

                        {/* Sell Product */}
                        <SellProduct />

                        {/* User */}
                        {user ? (
                            <UserMenu />
                        ) : (
                            <Button
                                className="flex h-10 shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-blue-500 px-2.5 md:px-4 text-sm text-white hover:bg-blue-500/90"
                                title="Join"
                            >
                                <UserRoundPlus size={17} className="shrink-0" />
                                <span className="hidden md:inline">Join</span>
                            </Button>
                        )}
                    </div>

                </div>
            </div>

        </header>
    );
}
