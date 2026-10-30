import { connection } from "next/server";

import { NextResponse } from "next/server";
export async function GET() {
    await connection();
    try {
        const response = await fetch("https://ipwho.is/", {
            cache: "no-store",
            signal: AbortSignal.timeout(8000),
        });

        if (!response.ok) {
            throw new Error("Location API request failed");
        }

        const data = await response.json();

        if (!data.success) {
            throw new Error("Location detection failed");
        }

        return NextResponse.json({
            country: data.country,
            countryCode: data.country_code,
            city: data.city,
            region: data.region,
            language: data.country_code === "DE" ? "de" : "en",
        });
    } catch (error) {
        console.error("Location detection error:", error);

        return NextResponse.json(
            { error: "Unable to detect location" },
            { status: 502 }
        );
    }
}
