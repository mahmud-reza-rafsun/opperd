"use client";

import { User } from "@/types/user.type";
import { useState, useEffect, useCallback } from "react";

export function useUser() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUser = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/user", {
                cache: "no-store",
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => null);
                throw new Error(errData?.error || "Failed to fetch user data");
            }

            const data = await response.json();
            setUser(data?.data || data);
            setError(null);
        } catch (err) {
            setUser(null);
            setError(err instanceof Error ? err.message : "Unknown error");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return { user, loading, error, refetch: fetchUser };
}
