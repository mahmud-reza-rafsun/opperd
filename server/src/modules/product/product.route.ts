import { Router } from "express";
import { productController } from "./product.controller";
import { checkAuth } from "../../shared/middlewares/checkAuth";
import { Role } from "@prisma/client";
import { validateRequest } from "../../shared/middlewares/validateRequest";
import { productValidation } from "../../zod/product.validation";

const router = Router();

// Public routes
router.get("/", productController.getAllProducts);
router.get("/slug/:slug", productController.getProductBySlug);
router.get("/:id", productController.getProductById);

// Protected routes
router.post(
    "/",
    checkAuth(Role.SUPER_ADMIN, Role.CX_ADMIN, Role.CUSTOMER),
    validateRequest(productValidation.createProductSchema),
    productController.createProduct
);
router.patch(
    "/:id",
    checkAuth(Role.SUPER_ADMIN, Role.CX_ADMIN, Role.CUSTOMER),
    validateRequest(productValidation.updateProductSchema),
    productController.updateProduct
);
router.delete("/:id", checkAuth(Role.SUPER_ADMIN, Role.SUPER_ADMIN), productController.deleteProduct);

export const productRoutes = router;
