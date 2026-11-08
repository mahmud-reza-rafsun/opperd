import { NextResponse } from "next/server";
import { userService } from "@/service/user.service";

export async function GET() {
    try {
        const { data, error } = await userService.getSession();

        if (error || !data) {
            return NextResponse.json(
                { data: null, error: error || "Unauthorized" },
                { status: 401 }
            );
        }

        return NextResponse.json({ data, error: null }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { data: null, error: error?.message || "Something went wrong" },
            { status: 500 }
        );
    }
}
