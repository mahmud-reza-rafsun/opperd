"use server";

import { authService } from "@/service/auth.service";
import { revalidatePath } from "next/cache";

export async function RegisterAction(payloadData: {
    name?: string;
    email: string;
    password: string;
}) {
    try {
        const { name, email, password } = payloadData || {};

        if (!email || !password) {
            return { success: false, error: "Email and password are required." };
        }

        const result = await authService.registerUser({
            name: name ?? "",
            email,
            password,
        });

        if (!result || result.error) {
            return {
                success: false,
                error: result?.error || "Failed to register user.",
            };
        }

        revalidatePath("/");

        return { success: true, data: result.data };
    } catch (error: any) {
        console.error("RegisterAction Error:", error);
        return {
            success: false,
            error: error.message || "An unexpected error occurred during registration.",
        };
    }
}
