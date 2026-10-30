"use client";

import { useState } from "react";
import {
    UserRoundPlus,
    Search,
    MapPin,
    Menu,
    X,
    LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import Link from "next/link";
import { CartDropdown } from "./AddToCard";
import NotificationDropdown from "./Notification";
import Theme from "@/components/provider/Theme";
import { useLocation } from "@/hooks/useLocation";
import Category from "../global/Category";
import SellProduct from "./SellProduct";

export default function Navbar() {
    const { location } = useLocation();
    const [query, setQuery] = useState("");
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const user = false;

    return (
        <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white transition-colors dark:border-zinc-800 dark:bg-gray-900">
            <div className="container mx-auto px-3 sm:px-4">
                <div className="flex h-16 items-center justify-between gap-3">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="shrink-0 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100"
                    >
                        Opperd<span className="text-blue-600">Ecom.</span>
                    </Link>

                    {/* Desktop and tablet search */}
                    <div className="mx-2 hidden min-w-0 max-w-2xl flex-1 items-center gap-2 md:flex lg:mx-4">
                        <div className="flex h-10 min-w-0 flex-1 items-center overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 transition-all focus-within:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800/80 dark:focus-within:border-zinc-500">
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="What service are you looking for?"
                                className="h-full min-w-0 flex-1 bg-transparent px-3.5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100 dark:placeholder:text-zinc-500"
                            />
                            <div className="pr-1">
                                <Button
                                    size="sm"
                                    className="h-8 cursor-pointer bg-blue-600 px-3 text-white hover:bg-blue-700"
                                >
                                    <Search size={15} />
                                </Button>
                            </div>
                        </div>
                        <Category />
                    </div>

                    {/* Desktop and tablet actions */}
                    <div className="hidden shrink-0 items-center gap-1.5 md:flex lg:gap-2">
                        {location?.country && (
                            <Button
                                variant="outline"
                                className="hidden rounded-md border-zinc-200 bg-white px-2.5 py-4 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 lg:flex"
                            >
                                <MapPin size={16} />
                                <span>{location.country}</span>
                            </Button>
                        )}

                        <CartDropdown />
                        <NotificationDropdown />
                        <SellProduct />

                        <Link href="/join">
                            <Button className="flex h-10 cursor-pointer items-center gap-1.5 bg-blue-500 px-3 text-xs text-white hover:bg-blue-500/90 sm:px-4 sm:text-sm">
                                <UserRoundPlus size={18} />
                                <span className="hidden lg:inline">Join</span>
                            </Button>
                        </Link>

                        <Theme />
                    </div>

                    {/* Mobile actions */}
                    <div className="flex shrink-0 items-center gap-1 md:hidden">
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            aria-label="Open search"
                            onClick={() => setIsSearchOpen(true)}
                            className="h-9 w-9 text-zinc-700 dark:text-zinc-200"
                        >
                            <Search size={20} />
                        </Button>

                        <div className="flex shrink-0 items-center [&_button]:!h-9 [&_button]:!w-9 [&_button]:!p-0">
                            <CartDropdown />
                        </div>

                        <div className="flex shrink-0 items-center [&_button]:!h-9 [&_button]:!w-9 [&_button]:!p-0">
                            <NotificationDropdown />
                        </div>

                        <div className="flex shrink-0 items-center [&_button]:!h-9 [&_button]:!w-9 [&_button]:!p-0">
                            <Theme />
                        </div>

                        <Drawer direction="left">
                            <DrawerTrigger asChild>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    aria-label="Open menu"
                                    onClick={() => setIsSearchOpen(false)}
                                    className="h-9 w-9 text-zinc-700 dark:text-zinc-200"
                                >
                                    <Menu size={22} />
                                </Button>
                            </DrawerTrigger>

                            <DrawerContent className="h-dvh data-[vaul-drawer-direction=left]:w-[min(85vw,360px)] data-[vaul-drawer-direction=left]:max-w-[360px] border-zinc-200 bg-white p-0 dark:border-zinc-800 dark:bg-gray-900">
                                <DrawerHeader className="flex h-16 shrink-0 flex-row items-center justify-between border-b border-zinc-200 px-4 py-0 dark:border-zinc-800">
                                    <DrawerTitle asChild>
                                        <Link
                                            href="/"
                                            className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100"
                                        >
                                            Opperd<span className="text-blue-600">Ecom.</span>
                                        </Link>
                                    </DrawerTitle>
                                    <DrawerClose asChild>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            aria-label="Close menu"
                                            className="h-9 w-9 shrink-0"
                                        >
                                            <X size={20} />
                                        </Button>
                                    </DrawerClose>
                                </DrawerHeader>

                                <div className="flex h-full flex-col gap-5 overflow-y-auto p-4">
                                    {location?.country && (
                                        <div className="flex items-center gap-2 rounded-lg border border-zinc-200 px-3 py-2.5 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-300">
                                            <MapPin size={17} className="shrink-0" />
                                            <span>{location.country}</span>
                                        </div>
                                    )}

                                    <div className="flex flex-col gap-4">
                                        <SellProduct />
                                    </div>

                                    <div className="border-t border-zinc-200 pt-4 dark:border-zinc-800">
                                        {
                                            user ?
                                                <Button className="bg-red-500 hover:bg-red-500/90 text-white h-11 text-sm px-32 cursor-pointer flex items-center gap-1.5 font-medium">
                                                    <LogOut size={18} />
                                                    Logout
                                                </Button>
                                                :
                                                <Link href="/join">
                                                    <Button className="bg-blue-500 hover:bg-blue-500/90 text-white h-11 text-sm px-[138px] cursor-pointer flex items-center gap-1.5 font-medium">
                                                        <UserRoundPlus size={18} />
                                                        Join
                                                    </Button>
                                                </Link>
                                        }
                                    </div>
                                </div>
                            </DrawerContent>
                        </Drawer>
                    </div>
                </div>
            </div>

            {/* Mobile search popup */}
            {isSearchOpen && (
                <div className="fixed inset-0 z-60 md:hidden">
                    <button
                        type="button"
                        aria-label="Close search"
                        onClick={() => setIsSearchOpen(false)}
                        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                    />
                    <div className="relative z-10 border-b border-zinc-200 bg-white/95 shadow-lg backdrop-blur-xl dark:border-zinc-800 dark:bg-gray-900/95">
                        <div className="mx-auto flex max-w-3xl items-center gap-2">
                            <div className="flex h-11 min-w-0 flex-1 items-center overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800">
                                <Search className="ml-3 shrink-0 text-zinc-400" size={18} />
                                <input
                                    autoFocus
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="What service are you looking for?"
                                    className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100"
                                />
                            </div>
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                aria-label="Close search"
                                onClick={() => setIsSearchOpen(false)}
                                className="h-10 w-10 shrink-0"
                            >
                                <X size={21} />
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
