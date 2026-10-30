import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.route";
import { productRoutes } from "../modules/product/product.route";
import { cartRoutes } from "../modules/cart/cart.route";
import { reportRoutes } from "../modules/report/report.route";
import { dashboardRoutes } from "../modules/dashboard/dashboard.route";
import { categoryRoutes } from "../modules/category/category.route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/cart", cartRoutes);
router.use("/reports", reportRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/categories", categoryRoutes);

export const apiRoutes = router;
