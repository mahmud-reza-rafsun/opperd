import {
    SidebarProvider,
    SidebarInset,
} from "@/components/ui/sidebar";

import DashboardSidebar from "./_components/Sidebar/Sidebar";
import DashboardNavbar from "./_components/Navbar/DashboardNavbar";
import { authService } from "@/service/auth.service";
import { Roles } from "@/constants/role";

export default async function DashboardLayout({
    superAdmin,
    cxAdmin,
    customer
}: {
    superAdmin: React.ReactNode;
    cxAdmin: React.ReactNode;
    customer: React.ReactNode;
}) {
    const session = await authService.getMe();
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
