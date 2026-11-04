"use client";

import {
    LayoutDashboard,
    Info,
    Flame,
    UserCircle,
    ChevronRight,
    Users,
} from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    Sidebar as ShadcnSidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";

interface SidebarProps {
    userRole?: string;
}

const navConfig = {
    SUPER_ADMIN: [
        {
            title: "Dashboard",
            href: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            title: "Users",
            href: "/users",
            icon: Users,
        },
    ],
    CX_ADMIN: [
        {
            title: "Dashboard",
            href: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            title: "Pending Ideas",
            href: "/pending-ideas",
            icon: Info,
        },
        {
            title: "Purchase Ideas",
            href: "/purchase-ideas",
            icon: Flame,
        },
        {
            title: "Profile",
            href: "/profile",
            icon: UserCircle,
        },
    ],
    CUSTOMER: [
        {
            title: "Dashboard",
            href: "/dashboard",
            icon: LayoutDashboard,
        },
    ],
};

export default function DashboardSidebar({ userRole }: SidebarProps) {
    const pathname = usePathname();
    const normalizedRole = userRole?.toUpperCase();

    const navLinks =
        navConfig[normalizedRole as keyof typeof navConfig] ??
        navConfig.CUSTOMER;

    return (
        <ShadcnSidebar
            collapsible="icon"
            variant="sidebar"
            className="border-r"
        >
            {/* Header */}
            <SidebarHeader className="border-b px-3 group-data-[collapsible=icon]:px-0">
                <div
                    className="flex items-center gap-3 overflow-hidden px-1 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
                >
                    <div className="flex shrink-0 items-center justify-center">
                        <Image
                            src="/logo.png"
                            alt="Opperd"
                            width={60}
                            height={60}
                            priority
                            className="object-cover"
                        />
                        <span className="mt-2 font-semibold group-data-[collapsible=icon]:hidden">
                            Opperd
                        </span>
                    </div>


                </div>
            </SidebarHeader>

            {/* Navigation */}
            <SidebarContent className="px-2 py-3 group-data-[collapsible=icon]:px-0">
                <SidebarGroup className="group-data-[collapsible=icon]:px-0">
                    <SidebarMenu className="gap-1">
                        {navLinks.map((link) => {
                            const isActive =
                                pathname === link.href ||
                                (link.href !== "" &&
                                    pathname.startsWith(`${link.href}/`));

                            const Icon = link.icon;

                            return (
                                <SidebarMenuItem key={link.href}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={isActive}
                                        tooltip={link.title}
                                        className="h-10 mx-auto rounded-lg px-3 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
                                    >
                                        <Link
                                            href={link.href}
                                            className="flex w-full items-center gap-2 group-data-[collapsible=icon]:justify-center"
                                        >
                                            <Icon className="size-4.5 shrink-0" />

                                            <span className="group-data-[collapsible=icon]:hidden">
                                                {link.title}
                                            </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            );
                        })}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

        </ShadcnSidebar>
    );
}
