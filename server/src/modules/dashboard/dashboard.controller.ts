import { Request, Response } from "express";
import { status } from "http-status";
import { catchAsync } from "../../shared/utils/catchAsync";
import { sendResponse } from "../../shared/utils/sendResponse";
import { dashboardService } from "./dashboard.service";
import { DashboardPeriod } from "@prisma/client";

const getStats = catchAsync(async (req: Request, res: Response) => {
    const { period = DashboardPeriod.DAILY, startDate, endDate } = req.query;

    const data = await dashboardService.getStats(
        period as DashboardPeriod,
        startDate ? new Date(startDate as string) : undefined,
        endDate ? new Date(endDate as string) : undefined
    );

    sendResponse(res, {
        status: status.OK,
        success: true,
        message: "Dashboard stats fetched successfully",
        data,
    });
});

export const dashboardController = { getStats };
