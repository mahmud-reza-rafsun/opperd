"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { authService } from "@/service/auth.service";

const AUTH_COOKIE_NAMES = [
    "better-auth.session_token",
    "__Secure-better-auth.session_token",
    "accessToken",
    "refreshToken",
];

export async function LogoutAction() {
    try {
        await authService.logoutUser();

        const cookieStore = await cookies();
        AUTH_COOKIE_NAMES.forEach((name) => cookieStore.delete(name));

        revalidatePath("/", "layout");

        return { success: true };
    } catch (error: any) {
        console.error("LogoutAction Error:", error);
        return {
            success: false,
            error: error.message || "An unexpected error occurred during logout.",
        };
    }
}
