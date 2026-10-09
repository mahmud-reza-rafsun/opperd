import { Request, Response } from "express";
import status from "http-status";
import { envVars } from "../../config/env";
import { auth } from "../../lib/auth";
import { catchAsync } from "../../shared/utils/catch-async";
import { cookieUtils } from "../../shared/utils/cookie";
import { sendResponse } from "../../shared/utils/send-response";
import { tokenUtils } from "../../shared/utils/token";
import { authService } from "./auth.service";
import { AppError } from "../../shared/errors/appError";
import { NeedsVerification } from "./auth.type";

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const result = await authService.registerUser(payload);

  const { accessToken, refreshToken, token, ...rest } = result;

  tokenUtils.setAuthCookies(res, { accessToken, refreshToken, sessionToken: token as string });

  sendResponse(res, {
    status: status.CREATED,
    success: true,
    message: "User registered successfully",
    data: {
      token,
      accessToken,
      refreshToken,
      ...rest,
    },
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await authService.loginUser(payload);
  if ((result as NeedsVerification)?.needsVerification) {
    const n = result as NeedsVerification;
    return sendResponse(res, {
      status: status.FORBIDDEN,
      success: false,
      message: "Email not verified",
      data: { email: n.email },
    });
  }

  const { accessToken, refreshToken, token, ...rest } =
    result as unknown as Record<string, unknown>;

  if (typeof token !== "string") {
    throw new AppError(
      status.INTERNAL_SERVER_ERROR,
      "Session token is missing",
    );
  }

  if (typeof accessToken !== "string" || typeof refreshToken !== "string") {
    throw new AppError(status.INTERNAL_SERVER_ERROR, "Auth tokens are missing");
  }

  tokenUtils.setAuthCookies(res, { accessToken, refreshToken, sessionToken: token });

  sendResponse(res, {
    status: status.OK,
    success: true,
    message: "User logged in successfully",
    data: {
      token,
      accessToken,
      refreshToken,
      ...rest,
    },
  });
});

const getMe = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    const result = await authService.getMe(user);
    sendResponse(res, {
      status: status.OK,
      success: true,
      message: "User profile fetched successfully",
      data: result,
    });
  }
)

const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const { name, image } = req.body as { name?: string; image?: string };
  const user = req.user;

  const result = await authService.updateProfile(user, { name, image });

  sendResponse(res, {
    status: status.OK,
    success: true,
    message: "Profile updated successfully",
    data: result,
  });
});

const getNewToken = catchAsync(
  async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    const betterAuthSessionToken = req.cookies["better-auth.session_token"];
    if (!refreshToken) {
      throw new AppError(status.UNAUTHORIZED, "Refresh token is missing");
    }
    const result = await authService.getNewToken(refreshToken, betterAuthSessionToken);

    const { accessToken, refreshToken: newRefreshToken, sessionToken } = result;

    tokenUtils.setAuthCookies(res, { accessToken, refreshToken: newRefreshToken, sessionToken });

    sendResponse(res, {
      status: status.OK,
      success: true,
      message: "New tokens generated successfully",
      data: {
        accessToken,
        refreshToken: newRefreshToken,
        sessionToken,
      },
    });
  }
)

const changePassword = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body;
    const betterAuthSessionToken = req.cookies["better-auth.session_token"];

    const result = await authService.changePassword(payload, betterAuthSessionToken);

    const { accessToken, refreshToken, token } = result;

    tokenUtils.setAuthCookies(res, { accessToken, refreshToken, sessionToken: token as string });

    sendResponse(res, {
      status: status.OK,
      success: true,
      message: "Password changed successfully",
      data: result,
    });
  }
)

const logoutUser = catchAsync(
  async (req: Request, res: Response) => {
    const betterAuthSessionToken = req.cookies["better-auth.session_token"];
    const result = await authService.logoutUser(betterAuthSessionToken);
    cookieUtils.clearCookie(res, 'accessToken', {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    cookieUtils.clearCookie(res, 'refreshToken', {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    cookieUtils.clearCookie(res, 'better-auth.session_token', {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    sendResponse(res, {
      status: status.OK,
      success: true,
      message: "User logged out successfully",
      data: result,
    });
  }
)

const verifyEmail = catchAsync(
  async (req: Request, res: Response) => {
    const { email, otp } = req.body;
    await authService.verifyEmail(email, otp);

    sendResponse(res, {
      status: status.OK,
      success: true,
      message: "Email verified successfully",
    });
  }
)

const resendOTP = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body;
  await authService.resendOTP(email);

  sendResponse(res, {
    status: status.OK,
    success: true,
    message: "Verification OTP resent successfully",
  });
});

const forgetPassword = catchAsync(
  async (req: Request, res: Response) => {
    const { email } = req.body;
    await authService.forgetPassword(email);

    sendResponse(res, {
      status: status.OK,
      success: true,
      message: "Password reset OTP sent to email successfully",
    });
  }
)

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const { email, otp, newPassword } = req.body;
  await authService.resetPassword(email, otp, newPassword);

  sendResponse(res, {
    status: status.OK,
    success: true,
    message: "Password reset successfully",
  });
});


const googleLogin = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const result = await authService.googleLogin(payload);

  const { accessToken, refreshToken } = result;

  tokenUtils.setAccessTokenCookie(res, accessToken);
  tokenUtils.setRefreshTokenCookie(res, refreshToken);

  sendResponse(res, {
    status: status.OK,
    success: true,
    message: "Google login successful",
    data: {
      accessToken,
      refreshToken,
    },
  });
});


export const authController = {
  registerUser,
  loginUser,
  getMe,
  updateProfile,
  getNewToken,
  changePassword,
  logoutUser,
  verifyEmail,
  resendOTP,
  forgetPassword,
  resetPassword,
  googleLogin
};
