"use client";

import { useEffect, useState } from "react";
import { Loader2, User as UserIcon, AlertCircle } from "lucide-react";

interface UserData {
    id?: string;
    name?: string;
    email?: string;
    image?: string;
    role?: string;
    [key: string]: any;
}

export default function User() {
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const res = await fetch("/api/me");
                const data = await res.json();

                if (data.success && data.user) {
                    setUser(data.user);
                } else {
                    setError(data.error || "User data not found");
                }
            } catch (err: any) {
                setError(err.message || "Failed to load user profile");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    // Loading State
    if (loading) {
        return (
            <div className="flex items-center gap-2 p-4 text-sm text-neutral-500">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Loading profile...</span>
            </div>
        );
    }

    // Error State
    if (error || !user) {
        return (
            <div className="flex items-center gap-2 p-4 text-sm text-red-500 bg-red-50 dark:bg-red-950/20 rounded-xl">
                <AlertCircle className="h-4 w-4" />
                <span>{error || "Not authenticated"}</span>
            </div>
        );
    }

    // User Profile Card Component
    return (
        <div className="flex items-center gap-3 p-3 rounded-2xl border border-neutral-200/80 bg-white dark:border-neutral-800 dark:bg-neutral-900/60">
            {user.image ? (
                <img
                    src={user.image}
                    alt={user.name || "User Avatar"}
                    className="h-10 w-10 rounded-full object-cover"
                />
            ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                    <UserIcon className="h-5 w-5" />
                </div>
            )}

            <div className="flex flex-col">
                <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                    {user.name || "Anonymous User"}
                </span>
                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                    {user.email || "No email available"}
                </span>
            </div>
        </div>
    );
}
