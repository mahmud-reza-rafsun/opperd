"use server";

import { authService } from "@/service/auth.service";
import { revalidatePath } from "next/cache";

export async function VerifyOtpAction(payloadData: { email: string; otp: string }) {
    try {
        const { email, otp } = payloadData || {};

        if (!email || !otp) {
            return { success: false, error: "Email and OTP are required." };
        }

        const result = await authService.verifyOtp({ email, otp });

        if (!result || result.error) {
            return { success: false, error: result?.error || "Invalid OTP." };
        }

        revalidatePath("/");

        return { success: true, data: result.data };
    } catch (error: any) {
        return { success: false, error: error.message || "Verification failed." };
    }
}

export async function ResendOtpAction(payloadData: { email: string }) {
    try {
        const { email } = payloadData || {};

        if (!email) {
            return { success: false, error: "Email is required." };
        }

        const result = await authService.resendOtp({ email });

        if (!result || result.error) {
            return { success: false, error: result?.error || "Could not resend OTP." };
        }

        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message || "Could not resend OTP." };
    }
}
