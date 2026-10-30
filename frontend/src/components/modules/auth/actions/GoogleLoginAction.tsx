"use server";

import { authService } from "@/service/auth.service";
import { revalidatePath } from "next/cache";

export async function googleLoginAction(idToken: string) {
    try {
        if (!idToken) {
            return { success: false as const, message: "Google idToken not found" };
        }

        const result = await authService.googleLogin({ idToken });

        if (!result || result.error) {
            return {
                success: false as const,
                message: result?.error || "Google login failed",
            };
        }

        revalidatePath("/", "layout");

        return { success: true as const, data: result.data };
    } catch (error) {
        return {
            success: false as const,
            message: error instanceof Error ? error.message : "Google login failed",
        };
    }
}
