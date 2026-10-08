import { Role } from "@prisma/client";

import { Router } from "express";
import { authController } from "./auth.controller";
import { checkAuth } from "../../shared/middlewares/checkAuth";

const router = Router()

router.post("/register", authController.registerUser)
router.post("/login", authController.loginUser)
router.get("/me", checkAuth(Role.ADMIN, Role.CUSTOMER), authController.getMe)
router.post("/refresh-token", authController.getNewToken)
router.post("/change-password", checkAuth(Role.ADMIN, Role.CUSTOMER), authController.changePassword)
router.post("/logout", checkAuth(Role.ADMIN, Role.CUSTOMER), authController.logoutUser)
router.post("/verify-email", authController.verifyEmail)
router.post("/forget-password", authController.forgetPassword)
router.post("/reset-password", authController.resetPassword)
router.post("/resend-otp", authController.resendOTP);
router.get("/login/:provider", authController.socialLogin);
router.get("/:provider/success", authController.socialLoginSuccess);
router.get("/oauth/error", authController.handleOAuthError);
router.patch(
  "/profile",
  checkAuth(Role.ADMIN, Role.CUSTOMER),
  authController.updateProfile,
);

export const authRoutes = router;
