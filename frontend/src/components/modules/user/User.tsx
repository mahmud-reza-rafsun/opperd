/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { LayoutDashboard, User as UserIcon, LogOut, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useUser } from '@/hooks/useUser';
import { User } from '@/types/user.type';
import { LogoutAction } from '../auth/actions/LogoutAction';

export default function UserSession() {
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const { user, loading } = useUser() as { user: User | null; loading: boolean };
    console.log(user);
    const handleLogout = async () => {
        setIsLoggingOut(true);
        const toastId = toast.loading("Logging out...");

        try {
            const result = await LogoutAction();

            if (!result.success) {
                throw new Error(result.error || "Failed to logout");
            }

            toast.success("Logged out successfully.", { id: toastId });
            window.location.href = "/";
        } catch (error: any) {
            toast.error(error.message || "Failed to logout", { id: toastId });
            setIsLoggingOut(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center p-2">
                <Loader2 className="h-5 w-5 animate-spin text-indigo-500" />
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="flex items-center">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="relative h-10 w-10 cursor-pointer rounded-full transition-all ">
                        <Avatar className="h-10 w-10">
                            <AvatarImage className='object-cover' src={user.image} alt={user.name} />
                            <AvatarFallback className="bg-blue-500 text-white">
                                {user.name?.charAt(0).toUpperCase() || "U"}
                            </AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56 mt-2" align="end" sideOffset={8}>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-semibold leading-none">{user.name}</p>
                            <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                            <p className="text-xs leading-none text-muted-foreground/80">{user.email}</p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem asChild>
                        <Link href="/dashboard" className="cursor-pointer w-full flex items-center">
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            <span>Dashboard</span>
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                        <Link href="/profile" className="cursor-pointer w-full flex items-center">
                            <UserIcon className="mr-2 h-4 w-4" />
                            <span>Profile Settings</span>
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer"
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>{isLoggingOut ? "Logging out.." : "Logout"}</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
