import { env } from "@/lib/env";

const NEXT_PUBLIC_BACKEND_URL = env.NEXT_PUBLIC_BACKEND_URL;

export const categoryService = {
    getAllCategories: async function () {
        try {
            const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/api/v1/categories`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                cache: "force-cache",
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                return {
                    data: null,
                    error: errorData?.message || "Failed to fetch Category",
                };
            }

            const data = await response.json();
            return { data, error: null };
        } catch (error: any) {
            return { data: null, error: error?.message || "Something went wrong" };
        }
    }
}
