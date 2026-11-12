import { setAccessTokenCookie, setBetterAuthSessionCookie, setRawCookiesFromResponse, setRefreshTokenCookie } from "@/lib/cookie";
import { env } from "@/lib/env";
import { cookies } from "next/headers";

const BACKEND_URL = env.BACKEND_URL;

export const productService = {
    sellsProducts: async function (payloadData: any) {
        try {
            const cookieStore = await cookies();
            const token = cookieStore.get("accessToken")?.value;

            const res = await fetch(`${BACKEND_URL}/api/v1/products`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(token && { Authorization: `Bearer ${token}` }),
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify(payloadData),
                cache: "no-store",
            });

            const result = await res.json().catch(() => null);

            if (!res.ok || !result || result.success === false) {
                return {
                    data: null,
                    error: result?.message || result?.error || "Post failed",
                };
            }

            return { data: result?.data ?? result, error: null };
        } catch (error: any) {
            return { data: null, error: error?.message || "Something went wrong" };
        }
    },


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
    },

    searchProducts: async function ({ searchTerm }: { searchTerm: string }) {
        try {
            const cookieStore = await cookies();

            const response = await fetch(
                `${BACKEND_URL}/api/v1/products/search?searchTerm=${encodeURIComponent(searchTerm)}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Cookie: cookieStore.toString(),
                    },
                    cache: "no-store",
                }
            );

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);

                return {
                    data: null,
                    error: errorData?.message || "Failed to search Products",
                };
            }

            const data = await response.json();

            return { data, error: null };
        } catch (error) {
            return {
                data: null,
                error: error instanceof Error ? error.message : "Something went wrong",
            };
        }
    },

}
