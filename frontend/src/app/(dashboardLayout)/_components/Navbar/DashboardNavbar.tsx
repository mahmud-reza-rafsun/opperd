
"use client";

import { usePathname } from "next/navigation";
import {
    PanelLeft,
    ChevronRight,
} from "lucide-react";

import {
    SidebarTrigger,
} from "@/components/ui/sidebar";

import { Separator } from "@/components/ui/separator";
import UserSession from "../user/User";
import Theme from "@/components/provider/Theme";
import NotificationDropdown from "@/components/Layout/Navbar/Notification";

const pageTitles: Record<string, string> = {
    dashboard: "Dashboard",
    "pending-ideas": "Pending Ideas",
    "purchase-ideas": "Purchase Ideas",
    profile: "Profile",
    settings: "Settings",
};

export default function DashboardNavbar() {
    const pathname = usePathname();

    const currentPage =
        pathname.split("/").filter(Boolean).pop() || "dashboard";

    const pageTitle =
        pageTitles[currentPage] ||
        currentPage
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

    return (
        <header className="sticky top-2 z-30 mx-8 flex h-12.5 shrink-0 items-center justify-between rounded-lg border bg-background dark:bg-[#171717] px-5">
            <div className="flex min-w-0 items-center gap-3">
                <SidebarTrigger className="-ml-1 size-9">
                    <PanelLeft className="size-5" />
                </SidebarTrigger>

                <Separator orientation="vertical" className="" />

                <div className="flex min-w-0 items-center gap-2 text-sm">
                    <span className="hidden text-muted-foreground sm:inline">
                        Workspace
                    </span>

                    <ChevronRight className="hidden size-3 text-muted-foreground sm:inline" />

                    <h1 className="font-semibold">
                        {pageTitle}
                    </h1>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <NotificationDropdown />
                <Theme />
                <UserSession />
            </div>
        </header>
    );
}
