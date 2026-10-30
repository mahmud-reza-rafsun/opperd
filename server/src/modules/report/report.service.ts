import { prisma } from "../../database/prisma";
import { ICreateReport } from "../../interface/report.interface";

const createReport = async (payload: ICreateReport) => {
    const data = await prisma.report.create({
        data: payload,
    });
    return data;
};

const getAllReports = async () => {
    const data = await prisma.report.findMany({
        include: {
            product: { select: { id: true, title: true, slug: true } },
            reporter: { select: { id: true, name: true, email: true } },
        },
        orderBy: { createdAt: "desc" },
    });
    return data;
};

const getReportById = async (id: string) => {
    const data = await prisma.report.findUnique({
        where: { id },
        include: {
            product: { select: { id: true, title: true, slug: true } },
            reporter: { select: { id: true, name: true, email: true } },
        },
    });
    return data;
};

const resolveReport = async (id: string) => {
    const data = await prisma.report.update({
        where: { id },
        data: { isResolved: true },
    });
    return data;
};

const deleteReport = async (id: string) => {
    const data = await prisma.report.delete({
        where: { id },
    });
    return data;
};

export const reportService = {
    createReport,
    getAllReports,
    getReportById,
    resolveReport,
    deleteReport,
};
