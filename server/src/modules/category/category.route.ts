import { Router } from "express";
import { categoryController } from "./category.controller";
import { checkAuth } from "../../shared/middlewares/checkAuth";
import { Role } from "@prisma/client";

const router = Router();

// Public
router.get("/", categoryController.getAllCategories);
router.get("/slug/:slug", categoryController.getCategoryBySlug);
router.get("/:id", categoryController.getCategoryById);

router.post("/", checkAuth(Role.SUPER_ADMIN, Role.CX_ADMIN), categoryController.createCategory);
router.patch("/:id", checkAuth(Role.SUPER_ADMIN, Role.CX_ADMIN), categoryController.updateCategory);
router.delete("/:id", checkAuth(Role.SUPER_ADMIN, Role.CX_ADMIN), categoryController.deleteCategory);

export const categoryRoutes = router;
