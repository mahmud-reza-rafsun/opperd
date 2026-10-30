import { Request, Response } from "express";
import { status } from "http-status";
import { catchAsync } from "../../shared/utils/catchAsync";
import { sendResponse } from "../../shared/utils/sendResponse";
import { reportService } from "./report.service";

const createReport = catchAsync(async (req: Request, res: Response) => {
    const payload = {
        ...req.body,
        reporterId: req.user?.id,
    };

    const data = await reportService.createReport(payload);

    sendResponse(res, {
        status: status.CREATED,
        success: true,
        message: "Report submitted successfully",
        data,
    });
});

const getAllReports = catchAsync(async (req: Request, res: Response) => {
    const data = await reportService.getAllReports();

    sendResponse(res, {
        status: status.OK,
        success: true,
        message: "Reports fetched successfully",
        data,
    });
});

const getReportById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const data = await reportService.getReportById(id as string);

    sendResponse(res, {
        status: status.OK,
        success: true,
        message: "Report fetched successfully",
        data,
    });
});

const resolveReport = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const data = await reportService.resolveReport(id as string);

    sendResponse(res, {
        status: status.OK,
        success: true,
        message: "Report resolved successfully",
        data,
    });
});

const deleteReport = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const data = await reportService.deleteReport(id as string);

    sendResponse(res, {
        status: status.OK,
        success: true,
        message: "Report deleted successfully",
        data,
    });
});

export const reportController = {
    createReport,
    getAllReports,
    getReportById,
    resolveReport,
    deleteReport,
};
