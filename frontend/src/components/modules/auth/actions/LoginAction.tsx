"use server";

import { authService } from "@/service/auth.service";
import { revalidatePath } from "next/cache";

export async function LoginAction(payloadData: {
    email: string;
    password: string;
}) {
    try {
        const { email, password } = payloadData || {};

        if (!email || !password) {
            return { success: false, error: "Email and password are required." };
        }

        const result = await authService.loginUser({ email, password });

        if (!result || result.error) {
            return {
                success: false,
                error: result?.error || "Failed to login.",
            };
        }

        revalidatePath("/");

        return { success: true, data: result.data };
    } catch (error: any) {
        console.error("LoginAction Error:", error);
        return {
            success: false,
            error: error.message || "An unexpected error occurred during login.",
        };
    }
}
