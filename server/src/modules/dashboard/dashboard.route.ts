import { Router } from "express";
import { dashboardController } from "./dashboard.controller";
import { checkAuth } from "../../shared/middlewares/checkAuth";
import { Role } from "@prisma/client";

const router = Router();

router.get("/", checkAuth(Role.SUPER_ADMIN, Role.CX_ADMIN), dashboardController.getStats);

export const dashboardRoutes = router;
