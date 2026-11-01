import { authService } from "@/service/auth.service";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const { data, error } = await authService.getMe();

        if (error || !data) {
            return NextResponse.json(
                { error: error || "Unauthorized" },
                { status: 401 }
            );
        }

        return NextResponse.json(data, { status: 200 });
    } catch (err: any) {
        return NextResponse.json(
            { error: err?.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
