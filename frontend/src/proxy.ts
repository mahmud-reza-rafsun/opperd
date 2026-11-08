import { NextRequest, NextResponse } from "next/server";
import { userService } from "./service/user.service";
import { Roles } from "./constants/role";

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    try {
        const { data } = await userService.getSession();
        const role = data?.role;

        if (!data) {
            if (pathname === "/login") {
                return NextResponse.next();
            }
            const loginUrl = new URL("/login", request.url);
            loginUrl.searchParams.set("callbackUrl", pathname);
            return NextResponse.redirect(loginUrl);
        }

        if (pathname === "/dashboard") {
            return NextResponse.next();
        }

        if (pathname.startsWith("/dashboard") && role !== Roles.superAdmin) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }

        if (pathname.startsWith("/dashboard") && role !== Roles.cxAdmin) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }

        if (pathname.startsWith("/dashboard") && role !== Roles.member) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
        return NextResponse.next();
    } catch (error) {
        console.error("Middleware error:", error);
        return NextResponse.redirect(new URL("/login", request.url));
    }
}
export const config = {
    matcher: ["/dashboard/:path*"],
};
