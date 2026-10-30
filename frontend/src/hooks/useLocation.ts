"use client";

import { useState, useEffect } from "react";
import { Location } from "@/types/location.type";

export function useLocation() {
    const [location, setLocation] = useState<Location | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const detectLocation = async () => {
            try {
                setLoading(true);
                const response = await fetch("/api/location");
                if (!response.ok) {
                    throw new Error("Failed to detect location");
                }
                const data: Location = await response.json();
                setLocation(data);
                setError(null);
            } catch (err) {
                console.error("Location detection error:", err);
                setError(err instanceof Error ? err.message : "Unknown error");
            } finally {
                setLoading(false);
            }
        };

        detectLocation();
    }, []);

    return { location, loading, error };
}
