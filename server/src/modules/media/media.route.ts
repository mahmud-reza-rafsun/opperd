import { Router } from "express";
import { mediaController } from "./media.controller";
import { checkAuth } from "../../shared/middlewares/checkAuth";
import { Role } from "@prisma/client";

const router = Router();

router.get(
  "/:publicId/transform",
  checkAuth(Role.SUPER_ADMIN, Role.CX_ADMIN, Role.CUSTOMER),
  mediaController.signMedia,
);
router.post(
  "/upload/presign",
  checkAuth(Role.SUPER_ADMIN, Role.CX_ADMIN),
  mediaController.createPresign,
);
router.post(
  "/upload/delete",
  checkAuth(Role.SUPER_ADMIN, Role.CX_ADMIN),
  mediaController.deleteUploads,
);

export const mediaRoutes = router;
