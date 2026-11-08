import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.route";
import { productRoutes } from "../modules/product/product.route";
import { categoryRoutes } from "../modules/category/category.route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);

export const apiRoutes = router;
