import { env } from "@/lib/env";
import { cookies } from "next/headers";

const BACKEND_URL = env.BACKEND_URL;

export const productService = {
    getAllProducts: async function () {
        try {
            const cookieStore = await cookies();

            const response = await fetch(`${BACKEND_URL}/api/v1/products`, {
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
                    error: errorData?.message || "Failed to fetch Products",
                };
            }

            const data = await response.json();
            return { data, error: null };
        } catch (error: any) {
            return { data: null, error: error?.message || "Something went wrong" };
        }
    },
    getSingleProducts: async function ({ id }: { id: string }) {
        try {
            const cookieStore = await cookies();

            const response = await fetch(`${BACKEND_URL}/api/v1/products/${id}`, {
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
                    error: errorData?.message || "Failed to fetch single Products",
                };
            }

            const data = await response.json();
            return { data, error: null };
        } catch (error: any) {
            return { data: null, error: error?.message || "Something went wrong" };
        }
    }
}
