import { setAccessTokenCookie, setBetterAuthSessionCookie, setRawCookiesFromResponse, setRefreshTokenCookie } from "@/lib/cookie";
import { env } from "@/lib/env";
import { cookies } from "next/headers";

const AUTH_URL = env.AUTH_URL;

export const authService = {
    // register user
    registerUser: async function ({
        name,
        email,
        password,
    }: {
        name: string;
        email: string;
        password: string;
    }) {
        try {
            const res = await fetch(`${AUTH_URL}/api/v1/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
                cache: "no-store",
            });

            const result = await res.json().catch(() => null);

            if (!res.ok || !result) {
                return {
                    data: null,
                    error: result?.message || result?.error || "Registration failed",
                };
            }

            const accessToken = result?.data?.accessToken || result?.accessToken;
            if (accessToken) {
                await setAccessTokenCookie(accessToken);
            }

            const refreshToken = result?.data?.refreshToken || result?.refreshToken;
            if (refreshToken) {
                await setRefreshTokenCookie(refreshToken);
            }

            const sessionToken = result?.data?.sessionToken || result?.sessionToken;
            if (sessionToken) {
                await setBetterAuthSessionCookie(sessionToken);
            }

            await setRawCookiesFromResponse(res);

            return { data: result?.data ?? result, error: null };
        } catch (error: any) {
            return { data: null, error: error?.message || "Something went wrong" };
        }
    },

    // email password login
    loginUser: async function ({
        email,
        password,
    }: {
        email: string;
        password: string;
    }) {
        try {
            const res = await fetch(`${AUTH_URL}/api/v1/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
                cache: "no-store",
            });

            const result = await res.json().catch(() => null);

            if (!res.ok || !result) {
                return {
                    data: null,
                    error: result?.message || result?.error || "Invalid email or password",
                };
            }

            const accessToken = result?.data?.accessToken || result?.accessToken;
            if (accessToken) {
                await setAccessTokenCookie(accessToken);
            }

            const refreshToken = result?.data?.refreshToken || result?.refreshToken;
            if (refreshToken) {
                await setRefreshTokenCookie(refreshToken);
            }

            const sessionToken = result?.data?.sessionToken || result?.sessionToken;
            if (sessionToken) {
                await setBetterAuthSessionCookie(sessionToken);
            }

            await setRawCookiesFromResponse(res);

            return { data: result?.data ?? result, error: null };
        } catch (error: any) {
            return { data: null, error: error?.message || "Something went wrong" };
        }
    },

    // google login
    googleLogin: async function ({ idToken }: { idToken: string }) {
        try {
            const res = await fetch(`${AUTH_URL}/api/v1/auth/google-login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ idToken }),
                cache: "no-store",
            });

            const result = await res.json().catch(() => null);

            if (!res.ok || !result || result.success === false) {
                return {
                    data: null,
                    error: result?.message || result?.error || "Google login failed",
                };
            }

            const accessToken = result?.data?.accessToken || result?.accessToken;
            if (accessToken) {
                await setAccessTokenCookie(accessToken);
            }

            const refreshToken = result?.data?.refreshToken || result?.refreshToken;
            if (refreshToken) {
                await setRefreshTokenCookie(refreshToken);
            }

            const sessionToken = result?.data?.sessionToken || result?.sessionToken;
            if (sessionToken) {
                await setBetterAuthSessionCookie(sessionToken);
            }

            await setRawCookiesFromResponse(res);

            return { data: result?.data ?? result, error: null };
        } catch (error: any) {
            return { data: null, error: error?.message || "Something went wrong" };
        }
    },

    // verify otp
    verifyOtp: async function ({
        email,
        otp,
    }: {
        email: string;
        otp: string;
    }) {
        try {
            const res = await fetch(`${AUTH_URL}/api/v1/auth/verify-email`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp }),
                cache: "no-store",
            });

            const result = await res.json().catch(() => null);

            if (!res.ok || !result) {
                return {
                    data: null,
                    error: result?.message || result?.error || "Invalid OTP",
                };
            }

            const accessToken = result?.data?.accessToken || result?.accessToken;
            if (accessToken) {
                await setAccessTokenCookie(accessToken);
            }

            const refreshToken = result?.data?.refreshToken || result?.refreshToken;
            if (refreshToken) {
                await setRefreshTokenCookie(refreshToken);
            }

            const sessionToken = result?.data?.sessionToken || result?.sessionToken;
            if (sessionToken) {
                await setBetterAuthSessionCookie(sessionToken);
            }

            await setRawCookiesFromResponse(res);

            return { data: result?.data ?? result, error: null };
        } catch (error: any) {
            return { data: null, error: error?.message || "Something went wrong" };
        }
    },

    // resend otp
    resendOtp: async function ({ email }: { email: string }) {
        try {
            const res = await fetch(`${AUTH_URL}/api/v1/auth/resend-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
                cache: "no-store",
            });

            const result = await res.json().catch(() => null);

            if (!res.ok) {
                return {
                    data: null,
                    error: result?.message || result?.error || "Could not resend OTP",
                };
            }

            return { data: result?.data ?? result, error: null };
        } catch (error: any) {
            return { data: null, error: error?.message || "Something went wrong" };
        }
    },

    // logout otp
    logoutUser: async function () {
        try {
            const cookieStore = await cookies();

            await fetch(`${AUTH_URL}/api/v1/auth/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store",
            }).catch(() => null);

            return { data: null, error: null };
        } catch (error: any) {
            return { data: null, error: error?.message || "Something went wrong" };
        }
    },

    getMe: async function () {
        try {
            const cookieStore = await cookies();
            const response = await fetch(`${AUTH_URL}/api/v1/auth/me`, {
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
    }


};
