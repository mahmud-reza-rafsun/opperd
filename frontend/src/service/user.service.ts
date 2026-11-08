import { env } from "@/lib/env";
import { cookies } from "next/headers";

const NEXT_PUBLIC_BACKEND_URL = env.NEXT_PUBLIC_BACKEND_URL;

export const userService = {
    getMe: async function () {
        try {
            const cookieStore = await cookies();
            const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/me`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store",
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                return {
                    data: null,
                    error: errorData?.message || "Failed to fetch user profiles",
                };
            }

            const data = await response.json();
            return { data, error: null };
        } catch (error: any) {
            return { data: null, error: error?.message || "Something went wrong" };
        }
    },

    getSession: async function () {
        try {
            const cookieStore = await cookies();
            const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/session`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store",
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                return {
                    data: null,
                    error: errorData?.message || "Failed to fetch user session",
                };
            }

            const data = await response.json();
            return { data, error: null };
        } catch (error: any) {
            return { data: null, error: error?.message || "Something went wrong" };
        }
    }
}
