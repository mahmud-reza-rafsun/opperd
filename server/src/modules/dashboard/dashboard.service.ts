import { prisma } from "../../database/prisma";
import { DashboardPeriod } from "@prisma/client";

const getStats = async (period: DashboardPeriod, startDate?: Date, endDate?: Date) => {
    const now = new Date();

    let from: Date;

    if (startDate && endDate) {
        from = startDate;
    } else if (period === DashboardPeriod.DAILY) {
        from = new Date(new Date().setHours(0, 0, 0, 0));
    } else if (period === DashboardPeriod.WEEKLY) {
        from = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
    } else {
        from = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30);
    }

    const dateRange = startDate && endDate
        ? { gte: startDate, lte: endDate }
        : { gte: from };

    const [
        totalUsers,
        newUsers,
        activeUsers,
        blockedUsers,
        totalProducts,
        activeListings,
        soldProducts,
        featuredProducts,
        newListings,
        totalReports,
        resolvedReports,
    ] = await Promise.all([
        prisma.user.count(),
        prisma.user.count({ where: { createdAt: dateRange } }),
        prisma.user.count({ where: { isDeleted: false } }),
        prisma.user.count({ where: { isDeleted: false, createdAt: dateRange } }),
        prisma.user.count({ where: { isDeleted: false, status: "ACTIVE" } }),
        prisma.user.count({ where: { isDeleted: false, status: "BLOCKED" } }),
        prisma.product.count({ where: { isDeleted: false } }),
        prisma.product.count({ where: { status: "ACTIVE", isDeleted: false } }),
        prisma.product.count({ where: { status: "SOLD", isDeleted: false } }),
        prisma.product.count({ where: { isFeatured: true, isDeleted: false } }),
        prisma.product.count({ where: { isDeleted: false, createdAt: dateRange } }),
        prisma.report.count(),
        prisma.report.count({ where: { isResolved: true } }),
    ]);

    return {
        period,
        dateRange: { from, to: endDate ?? now },
        users: {
            totalUsers,
            newUsers,
            activeUsers,
            blockedUsers,
        },
        products: {
            totalProducts,
            activeListings,
            soldProducts,
            featuredProducts,
            newListings,
        },
        engagement: {
            totalReports,
            resolvedReports,
            unresolvedReports: totalReports - resolvedReports,
        },
    };
};

export const dashboardService = { getStats };
