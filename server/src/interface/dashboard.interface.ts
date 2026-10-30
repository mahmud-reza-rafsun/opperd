import { DashboardPeriod } from "@prisma/client";

export interface ICreateDashboard {
    period: DashboardPeriod;
    date: Date;
    totalUsers?: number;
    newUsers?: number;
    activeUsers?: number;
    blockedUsers?: number;
    totalProducts?: number;
    activeListings?: number;
    soldProducts?: number;
    featuredProducts?: number;
    newListings?: number;
    totalRevenue?: number;
    featuredRevenue?: number;
    refundedAmount?: number;
    totalReports?: number;
    resolvedReports?: number;
    totalChats?: number;
    totalFavorites?: number;
}

export interface IDashboardFilter {
    period?: DashboardPeriod;
    startDate?: Date;
    endDate?: Date;
}
