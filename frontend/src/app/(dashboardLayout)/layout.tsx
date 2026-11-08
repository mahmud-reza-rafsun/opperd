import { Suspense } from "react";
import {
    SidebarProvider,
    SidebarInset,
} from "@/components/ui/sidebar";

import DashboardSidebar from "./_components/Sidebar/Sidebar";
import DashboardNavbar from "./_components/Navbar/DashboardNavbar";
import { Roles } from "@/constants/role";
import { userService } from "@/service/user.service";

export default function DashboardLayout({
    superAdmin,
    cxAdmin,
    customer
}: {
    superAdmin: React.ReactNode;
    cxAdmin: React.ReactNode;
    customer: React.ReactNode;
}) {
    return (
        <Suspense fallback={null}>
            <DashboardContent
                superAdmin={superAdmin}
                cxAdmin={cxAdmin}
                customer={customer}
            />
        </Suspense>
    );
}

async function DashboardContent({
    superAdmin,
    cxAdmin,
    customer
}: {
    superAdmin: React.ReactNode;
    cxAdmin: React.ReactNode;
    customer: React.ReactNode;
}) {
    const session = await userService.getMe();
    const userRole = session?.data?.data?.role;

    return (
        <SidebarProvider defaultOpen={true}>
            <DashboardSidebar userRole={userRole} />

            <SidebarInset className="">
                <DashboardNavbar />

                <main className="">
                    {
                        userRole === Roles.superAdmin
                            ? superAdmin
                            : userRole === Roles.cxAdmin
                                ? cxAdmin
                                : customer
                    }
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
