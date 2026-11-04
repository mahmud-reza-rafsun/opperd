/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { LayoutDashboard, User as UserIcon, LogOut, Loader2, Settings } from 'lucide-react';
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
import { LogoutAction } from '@/components/modules/auth/actions/LogoutAction';

export default function UserSession() {
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const { user, loading } = useUser() as { user: User | null; loading: boolean };
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
                    <Button variant="outline" className="relative h-9 w-9 cursor-pointer rounded-full transition-all active:scale-95">
                        <Avatar className="h-9 w-9">
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
                        <Link href="/settings" className="cursor-pointer w-full flex items-center">
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
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
