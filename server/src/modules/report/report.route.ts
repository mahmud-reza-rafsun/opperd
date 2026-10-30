import { Router } from "express";
import { reportController } from "./report.controller";
import { checkAuth } from "../../shared/middlewares/checkAuth";
import { Role } from "@prisma/client";
import { validateRequest } from "../../shared/middlewares/validateRequest";
import { reportValidation } from "../../zod/report.validation";

const router = Router();

// Customer — report submit korte parbe
router.post(
    "/",
    checkAuth(Role.CUSTOMER),
    validateRequest(reportValidation.createReportSchema),
    reportController.createReport
);

// Super Admin only
router.get("/", checkAuth(Role.SUPER_ADMIN, Role.CX_ADMIN, Role.CUSTOMER), reportController.getAllReports);
router.get("/:id", checkAuth(Role.SUPER_ADMIN, Role.CX_ADMIN, Role.CUSTOMER), reportController.getReportById);
router.patch("/:id/resolve", checkAuth(Role.SUPER_ADMIN, Role.CX_ADMIN, Role.CUSTOMER), reportController.resolveReport);
router.delete("/:id", checkAuth(Role.SUPER_ADMIN, Role.CX_ADMIN, Role.CUSTOMER), reportController.deleteReport);

export const reportRoutes = router;
