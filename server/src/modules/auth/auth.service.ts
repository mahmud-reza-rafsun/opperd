import status from "http-status";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";
import { prisma } from "../../database/prisma";

import { auth } from "../../lib/auth";
import { jwtUtils } from "../../shared/utils/jwt";
import { tokenUtils } from "../../shared/utils/token";
import {
  IChangePasswordPayload,
  ILoginUserPayload,
  IRegisterUserPayload,
  IRequestUser,
  ISocialLoginSession,
  type NeedsVerification,
} from "./auth.type";
import { AppError } from "../../shared/errors/appError";

const buildTokenPayload = (user: {
  id: string;
  role: string;
  name: string | null;
  email: string;
  status: string | null;
  isDeleted: boolean | null;
  emailVerified: boolean | null;
}) => ({
  userId: user.id,
  role: user.role,
  name: user.name,
  email: user.email,
  status: user.status,
  isDeleted: user.isDeleted,
  emailVerified: user.emailVerified,
});

const registerUser = async (payload: IRegisterUserPayload) => {
  const { name, email, password, image } = payload;

  if (email) {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      throw new AppError(status.CONFLICT, "Email already exists");
    }
  }

  const data = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
      image
    },
  });

  if (!data.user) {
    throw new AppError(status.BAD_REQUEST, "Failed to register user");
  }

  try {
    const payload = buildTokenPayload(data.user);
    const accessToken = tokenUtils.getAccessToken(payload);
    const refreshToken = tokenUtils.getRefreshToken(payload);

    return {
      ...data,
      accessToken,
      refreshToken,
      user: data.user,
    };
  } catch (error) {
    await prisma.user.delete({
      where: {
        id: data.user.id,
      },
    });


    throw error;
  }

}

const loginUser = async (payload: ILoginUserPayload) => {
  const { email, password } = payload;

  let data;
  try {
    data = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
  } catch (err: unknown) {
    let msg = "";
    if (err instanceof Error) msg = err.message;
    else if (err && typeof err === "object") {
      try {
        msg = JSON.stringify(err);
      } catch {
        msg = String(err);
      }
    } else {
      msg = String(err);
    }

    if (
      msg.includes("Email not verified") ||
      msg.toLowerCase().includes("email not verified")
    ) {
      const needsVerification = { needsVerification: true, email };
      return needsVerification as NeedsVerification;
    }
    throw err;
  }

  if (data.user.status === "BLOCKED") {
    throw new AppError(status.FORBIDDEN, "User is blocked");
  }

  if (data.user.isDeleted || data.user.status === "DELETED") {
    throw new AppError(status.NOT_FOUND, "User is deleted");
  }

  const tokenPayload = buildTokenPayload(data.user);
  const accessToken = tokenUtils.getAccessToken(tokenPayload);
  const refreshToken = tokenUtils.getRefreshToken(tokenPayload);

  return {
    ...data,
    accessToken,
    refreshToken,
  };
}

const resendOTP = async (email: string) => {
  const isUserExist = await prisma.user.findUnique({ where: { email } });


  if (!isUserExist) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }
  if (isUserExist.emailVerified) {
    throw new AppError(status.BAD_REQUEST, "Email already verified");
  }

  const existingVerification = await prisma.verification.findFirst({
    where: {
      identifier: email,
      expiresAt: {
        gt: new Date(),
      },
    },
  });



  if (existingVerification) {
    throw new AppError(
      status.TOO_MANY_REQUESTS,
      "A verification email was already sent recently. Please check your inbox or try again later.",
    );
  }

  try {
    const sdk = auth.api as unknown as Record<
      string,
      (...args: unknown[]) => Promise<unknown>
    >;

    if (typeof sdk.requestEmailVerificationOTP === "function") {
      await sdk.requestEmailVerificationOTP({ body: { email } } as unknown);
    } else if (typeof sdk.requestVerificationEmailOTP === "function") {
      await sdk.requestVerificationEmailOTP({ body: { email } } as unknown);
    } else if (typeof sdk.requestEmailOTP === "function") {
      await sdk.requestEmailOTP({
        body: { email, type: "email-verification" },
      } as unknown);
    } else if (typeof sdk["requestSignInOTP"] === "function") {
      await sdk["requestSignInOTP"]({ body: { email } } as unknown);
    } else {
      throw new Error(
        "No suitable method available on auth SDK to request verification OTP",
      );
    }
  } catch {
    throw new AppError(
      status.INTERNAL_SERVER_ERROR,
      "Failed to resend verification OTP",
    );
  }
};

const getMe = async (user: IRequestUser) => {
  const isUserExists = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });



  if (!isUserExists) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  return isUserExists;
}

const updateProfile = async (
  user: IRequestUser,
  payload: { name?: string; image?: string },
) => {
  const isUserExists = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });



  if (!isUserExists) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  if (isUserExists.isDeleted || isUserExists.status === "DELETED") {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  const updated = await prisma.user.update({
    where: { id: user.id },
    data: {
      name: payload.name || isUserExists.name,
      image: payload.image || isUserExists.image,
      updatedAt: new Date(),
    },
  });



  return updated;
};

const getNewToken = async (refreshToken: string, sessionToken: string) => {
  const isSessionTokenExists = await prisma.session.findUnique({
    where: {
      token: sessionToken,
    },
    include: {
      user: true,
    },
  });



  if (!isSessionTokenExists) {
    throw new AppError(status.UNAUTHORIZED, "Invalid session token");
  }

  const verifiedRefreshToken = jwtUtils.verifyToken(refreshToken, envVars.REFRESH_TOKEN_SECRET)

  if (!verifiedRefreshToken.success && verifiedRefreshToken.error) {
    throw new AppError(status.UNAUTHORIZED, "Invalid refresh token");
  }

  const data = verifiedRefreshToken.data as JwtPayload;

  const payload = buildTokenPayload(data as unknown as Parameters<typeof buildTokenPayload>[0]);
  const newAccessToken = tokenUtils.getAccessToken(payload);
  const newRefreshToken = tokenUtils.getRefreshToken(payload);

  const { token } = await prisma.session.update({
    where: {
      token: sessionToken,
    },
    data: {
      token: sessionToken,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      updatedAt: new Date(),
    },
  });



  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    sessionToken: token,
  };
}

const changePassword = async (payload: IChangePasswordPayload, sessionToken: string) => {
  const session = await auth.api.getSession({
    headers: new Headers({
      Authorization: `Bearer ${sessionToken}`
    })
  })

  if (!session) {
    throw new AppError(status.UNAUTHORIZED, "Invalid session token");
  }

  const { currentPassword, newPassword } = payload;

  const result = await auth.api.changePassword({
    body: {
      currentPassword,
      newPassword,
      revokeOtherSessions: true,
    },
    headers: new Headers({
      Authorization: `Bearer ${sessionToken}`
    })
  })

  if (session.user.needPasswordChange) {
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        needPasswordChange: false,
      }
    });


  }

  const tokenPayload = buildTokenPayload(session.user);
  const accessToken = tokenUtils.getAccessToken(tokenPayload);
  const refreshToken = tokenUtils.getRefreshToken(tokenPayload);


  return {
    ...result,
    accessToken,
    refreshToken,
  }
}

const logoutUser = async (sessionToken: string) => {
  const result = await auth.api.signOut({
    headers: new Headers({
      Authorization: `Bearer ${sessionToken}`
    })
  })

  return result;
}

const verifyEmail = async (email: string, otp: string) => {

  const result = await auth.api.verifyEmailOTP({
    body: {
      email,
      otp,
    }
  })

  if (result.status && !result.user.emailVerified) {
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        emailVerified: true,
      }
    });


  }
}

const forgetPassword = async (email: string) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    }
  });



  if (!isUserExist) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  if (!isUserExist.emailVerified) {
    throw new AppError(status.BAD_REQUEST, "Email not verified");
  }

  if (isUserExist.isDeleted || isUserExist.status === "DELETED") {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  await auth.api.requestPasswordResetEmailOTP({
    body: {
      email,
    }
  })
}

const resetPassword = async (email: string, otp: string, newPassword: string) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    }
  });



  if (!isUserExist) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  if (!isUserExist.emailVerified) {
    throw new AppError(status.BAD_REQUEST, "Email not verified");
  }

  if (isUserExist.isDeleted || isUserExist.status === "DELETED") {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  await auth.api.resetPasswordEmailOTP({
    body: {
      email,
      otp,
      password: newPassword,
    }
  })

  if (isUserExist.needPasswordChange) {
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        needPasswordChange: false,
      }
    });


  }

  await prisma.session.deleteMany({
    where: {
      userId: isUserExist.id,
    }
  });


}

const socialLoginSuccess = async (session: ISocialLoginSession) => {
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });



  if (!user) {
    throw new AppError(
      status.NOT_FOUND,
      "User not found after social login. Please try again.",
    );
  }

  if (user.status === "BLOCKED") {
    throw new AppError(status.FORBIDDEN, "Your account has been blocked.");
  }

  if (user.isDeleted || user.status === "DELETED") {
    throw new AppError(status.FORBIDDEN, "Your account has been deleted.");
  }

  const payload = buildTokenPayload(user);
  const accessToken = tokenUtils.getAccessToken(payload);
  const refreshToken = tokenUtils.getRefreshToken(payload);

  return { accessToken, refreshToken };
};

export const authService = {
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
  socialLoginSuccess,
};
