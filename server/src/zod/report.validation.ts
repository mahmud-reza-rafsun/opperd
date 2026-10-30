import { z } from "zod";
import { ReportReason } from "@prisma/client";

const createReportSchema = z.object({
    body: z.object({
        productId: z.string().min(1, "Product ID is required"),
        reason: z.nativeEnum(ReportReason, { message: "Invalid report reason" }),
        details: z.string().min(10, "Details must be at least 10 characters").optional(),
    }),
});

export const reportValidation = {
    createReportSchema,
};
