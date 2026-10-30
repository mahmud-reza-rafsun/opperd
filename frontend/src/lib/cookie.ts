import { cookies } from "next/headers";

const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
};

export async function setAccessTokenCookie(token: string) {
    if (!token) return;
    const cookieStore = await cookies();

    cookieStore.set("accessToken", token, {
        ...COOKIE_OPTIONS,
        maxAge: 60 * 60,
    });
}

export async function setRefreshTokenCookie(token: string) {
    if (!token) return;
    const cookieStore = await cookies();

    cookieStore.set("refreshToken", token, {
        ...COOKIE_OPTIONS,
        maxAge: 30 * 24 * 60 * 60,
    });
}

export async function setBetterAuthSessionCookie(sessionToken: string) {
    if (!sessionToken) return;
    const cookieStore = await cookies();

    cookieStore.set("better-auth.session_token", sessionToken, COOKIE_OPTIONS);
    cookieStore.set("better_auth.session_token", sessionToken, COOKIE_OPTIONS);
}

export async function setRawCookiesFromResponse(res: Response) {
    const setCookieHeader = res.headers.get("set-cookie");
    if (!setCookieHeader) return;

    const cookieStore = await cookies();
    const cookiesList = setCookieHeader.split(/,(?=[^;]+;)/);

    for (const cookieStr of cookiesList) {
        const [nameValue] = cookieStr.split(";");
        const [name, ...valueParts] = nameValue.split("=");
        const value = valueParts.join("=");

        if (name && value) {
            cookieStore.set(name.trim(), value.trim(), COOKIE_OPTIONS);
        }
    }
}

export async function clearAuthCookies() {
    const cookieStore = await cookies();
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    cookieStore.delete("better-auth.session_token");
    cookieStore.delete("better_auth.session_token");
}
