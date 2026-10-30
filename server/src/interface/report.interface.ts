import { ReportReason } from "@prisma/client";

export interface ICreateReport {
    productId: string;
    reporterId: string;
    reason: ReportReason;
    details?: string;
}
