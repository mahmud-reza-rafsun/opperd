// src/app.ts
import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";
import qs from "qs";

// src/config/cors.ts
import createCors from "cors";

// src/config/env.ts
import dotenv from "dotenv";
import status from "http-status";
import path from "path";

// src/shared/errors/appError.ts
var AppError = class extends Error {
  constructor(statusCode, message, isOperational = true, stack) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
};

// src/config/env.ts
dotenv.config({ path: path.join(process.cwd(), ".env") });
var loadEnvVars = () => {
  const requiredEnvVars = [
    "NODE_ENV",
    "PORT",
    "APP_NAME",
    "APP_URL",
    "DATABASE_URL",
    "FRONTEND_URL",
    "BETTER_AUTH_URL",
    "BETTER_AUTH_SECRET",
    "BETTER_AUTH_SESSION_TOKEN_EXPIRES_IN",
    "BETTER_AUTH_SESSION_TOKEN_UPDATE_AGE",
    "ACCESS_TOKEN_SECRET",
    "ACCESS_TOKEN_EXPIRES_IN",
    "REFRESH_TOKEN_SECRET",
    "REFRESH_TOKEN_EXPIRES_IN",
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "GOOGLE_CALLBACK_URL",
    "EMAIL_SENDER_SMTP_USER",
    "EMAIL_SENDER_SMTP_PASS",
    "EMAIL_SENDER_SMTP_HOST",
    "EMAIL_SENDER_SMTP_PORT",
    "EMAIL_SENDER_SMTP_FROM",
    "CLOUDINARY_CLOUD_NAME",
    "CLOUDINARY_API_KEY",
    "CLOUDINARY_API_SECRET",
    "CLOUDINARY_UPLOAD_PRESET",
    "RATE_LIMIT_WINDOW_MS",
    "RATE_LIMIT_MAX_REQUESTS"
  ];
  requiredEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
      throw new AppError(
        status.INTERNAL_SERVER_ERROR,
        `Environment variable ${varName} is required but not set in .env file.`
      );
    }
  });
  return {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    APP_NAME: process.env.APP_NAME ?? "Your App",
    APP_URL: process.env.APP_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    FRONTEND_URL: process.env.FRONTEND_URL,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_SESSION_TOKEN_EXPIRES_IN: process.env.BETTER_AUTH_SESSION_TOKEN_EXPIRES_IN,
    BETTER_AUTH_SESSION_TOKEN_UPDATE_AGE: process.env.BETTER_AUTH_SESSION_TOKEN_UPDATE_AGE,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
    EMAIL_SENDER: {
      SMTP_USER: process.env.EMAIL_SENDER_SMTP_USER,
      SMTP_PASS: process.env.EMAIL_SENDER_SMTP_PASS,
      SMTP_HOST: process.env.EMAIL_SENDER_SMTP_HOST,
      SMTP_PORT: process.env.EMAIL_SENDER_SMTP_PORT,
      SMTP_FROM: process.env.EMAIL_SENDER_SMTP_FROM
    },
    CLOUDINARY: {
      CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
      CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
      CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
      CLOUDINARY_UPLOAD_PRESET: process.env.CLOUDINARY_UPLOAD_PRESET
    },
    RATE_LIMIT_WINDOW_MS: process.env.RATE_LIMIT_WINDOW_MS,
    RATE_LIMIT_MAX_REQUESTS: process.env.RATE_LIMIT_MAX_REQUESTS
  };
};
var envVars = loadEnvVars();

// src/config/cors.ts
var origin = [envVars.FRONTEND_URL];
var cors = createCors({
  origin,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
});

// src/config/logger.ts
import morgan from "morgan";
var httpLogger = envVars.NODE_ENV === "production" ? morgan("combined") : morgan("dev");
var logger = {
  error: (...args) => {
    console.error(`[ERROR] ${(/* @__PURE__ */ new Date()).toISOString()}`, ...args);
  },
  info: console.info,
  warn: console.warn
};

// src/config/rate-limit.ts
import rateLimit from "express-rate-limit";
var windowMs = parseInt(envVars.RATE_LIMIT_WINDOW_MS || "900000", 10);
var maxRequests = parseInt(
  envVars.RATE_LIMIT_MAX_REQUESTS || (envVars.NODE_ENV === "production" ? "100" : "1000"),
  10
);
var globalLimiter = rateLimit({
  windowMs,
  max: maxRequests,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests, please try again later."
  }
});
var authLimiter = rateLimit({
  windowMs: 15 * 60 * 1e3,
  max: envVars.NODE_ENV === "production" ? 20 : 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many authentication attempts, please try again later."
  }
});

// src/routes/index.ts
import { Router as Router3 } from "express";

// src/modules/health/health.route.ts
import { Router } from "express";

// src/shared/utils/catch-async.ts
var catchAsync = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

// src/shared/utils/send-response.ts
var sendResponse = (res, responseData) => {
  const { status: status8, success, message, data, meta } = responseData;
  res.status(status8).json({
    success,
    message,
    data,
    meta
  });
};

// src/modules/health/health.controller.ts
var health = catchAsync(async (_req, res) => {
  sendResponse(res, {
    status: 200,
    success: true,
    message: "Health test route is working!",
    data: {
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      version: "1.0.0"
    }
  });
});
var healthController = {
  health
};

// src/modules/health/health.route.ts
var router = Router();
router.get("/", healthController.health);
var healthRoutes = router;

// src/modules/auth/auth.route.ts
import { Role as Role4 } from "@prisma/client";
import { Router as Router2 } from "express";

// src/modules/auth/auth.controller.ts
import status4 from "http-status";

// src/shared/utils/cookie.ts
var setCookie = (res, key, value, options) => {
  res.cookie(key, value, options);
};
var getCookie = (req, key) => {
  return req.cookies[key];
};
var clearCookie = (res, key, options) => {
  res.clearCookie(key, options);
};
var cookieUtils = {
  setCookie,
  getCookie,
  clearCookie
};

// src/shared/utils/jwt.ts
import jwt from "jsonwebtoken";
var createToken = (payload, secret, { expiresIn }) => {
  const token = jwt.sign(payload, secret, { expiresIn });
  return token;
};
var verifyToken = (token, secret) => {
  try {
    const decoded = jwt.verify(token, secret);
    return {
      success: true,
      data: decoded
    };
  } catch (error) {
    const isExpired = error instanceof jwt.TokenExpiredError;
    return {
      success: false,
      message: isExpired ? "Token has expired" : error instanceof Error ? error.message : "Unknown error",
      error,
      code: isExpired ? "TOKEN_EXPIRED" : "TOKEN_INVALID"
    };
  }
};
var jwtUtils = {
  createToken,
  verifyToken
};

// src/shared/utils/token.ts
var getAccessToken = (payload) => {
  const accessToken = jwtUtils.createToken(
    payload,
    envVars.ACCESS_TOKEN_SECRET,
    { expiresIn: envVars.ACCESS_TOKEN_EXPIRES_IN }
  );
  return accessToken;
};
var getRefreshToken = (payload) => {
  const refreshToken = jwtUtils.createToken(
    payload,
    envVars.REFRESH_TOKEN_SECRET,
    { expiresIn: envVars.REFRESH_TOKEN_EXPIRES_IN }
  );
  return refreshToken;
};
var setAccessTokenCookie = (res, token) => {
  cookieUtils.setCookie(res, "accessToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 60 * 60 * 24 * 1e3
  });
};
var setRefreshTokenCookie = (res, token) => {
  cookieUtils.setCookie(res, "refreshToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 60 * 60 * 24 * 1e3 * 7
  });
};
var setBetterAuthSessionCookie = (res, token) => {
  cookieUtils.setCookie(res, "better-auth.session_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 60 * 60 * 24 * 1e3
  });
};
var setAuthCookies = (res, tokens) => {
  setAccessTokenCookie(res, tokens.accessToken);
  setRefreshTokenCookie(res, tokens.refreshToken);
  setBetterAuthSessionCookie(res, tokens.sessionToken);
};
var tokenUtils = {
  getAccessToken,
  getRefreshToken,
  setAccessTokenCookie,
  setRefreshTokenCookie,
  setBetterAuthSessionCookie,
  setAuthCookies
};

// src/modules/auth/auth.service.ts
import status3 from "http-status";

// src/database/prisma.ts
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
var globalForPrisma = globalThis;
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { bearer, emailOTP } from "better-auth/plugins";
import { Role, UserStatus } from "@prisma/client";

// src/shared/utils/email.ts
import ejs from "ejs";
import status2 from "http-status";
import nodemailer from "nodemailer";
import path2 from "path";
var transporter = nodemailer.createTransport({
  host: envVars.EMAIL_SENDER.SMTP_HOST,
  secure: true,
  auth: {
    user: envVars.EMAIL_SENDER.SMTP_USER,
    pass: envVars.EMAIL_SENDER.SMTP_PASS
  },
  port: Number(envVars.EMAIL_SENDER.SMTP_PORT)
});
transporter.verify();
var sendEmail = async ({
  subject,
  templateData,
  templateName,
  to,
  attachments
}) => {
  try {
    const templatePath = path2.resolve(
      process.cwd(),
      `src/templates/${templateName}.ejs`
    );
    const td = templateData;
    const expiresVal = td && Object.prototype.hasOwnProperty.call(td, "expiresInMinutes") ? td["expiresInMinutes"] : void 0;
    const expiresInMinutes = typeof expiresVal === "number" ? expiresVal : 5;
    const templateDataWithDefaults = {
      appName: envVars.APP_NAME ?? "Your App",
      supportEmail: envVars.EMAIL_SENDER.SMTP_FROM ?? "support@example.com",
      year: (/* @__PURE__ */ new Date()).getFullYear(),
      expiresInMinutes,
      ...td
    };
    const html = await ejs.renderFile(templatePath, templateDataWithDefaults);
    await transporter.sendMail({
      from: envVars.EMAIL_SENDER.SMTP_FROM,
      to,
      subject,
      html,
      attachments: attachments?.map((attachment) => ({
        filename: attachment.filename,
        content: attachment.content,
        contentType: attachment.contentType
      }))
    });
  } catch {
    throw new AppError(status2.INTERNAL_SERVER_ERROR, `Failed to send email to ${to}`);
  }
};

// src/lib/auth.ts
import { prismaAdapter } from "better-auth/adapters/prisma";
var auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  baseURL: envVars.BETTER_AUTH_URL,
  secret: envVars.BETTER_AUTH_SECRET,
  trustedOrigins: [
    envVars.APP_URL,
    envVars.FRONTEND_URL,
    envVars.BETTER_AUTH_URL,
    "http://localhost:3000"
  ],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true
  },
  socialProviders: {
    google: {
      clientId: envVars.GOOGLE_CLIENT_ID,
      clientSecret: envVars.GOOGLE_CLIENT_SECRET,
      accessType: "offline",
      prompt: "select_account consent",
      mapProfileToUser: () => {
        return {
          role: Role.CUSTOMER,
          status: UserStatus.ACTIVE,
          needPasswordChange: false,
          emailVerified: true,
          isDeleted: false,
          deletedAt: null
        };
      }
    }
  },
  emailVerification: {
    sendOnSignUp: true,
    sendOnSignIn: true,
    autoSignInAfterVerification: true
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: Role.CUSTOMER
      },
      status: {
        type: "string",
        required: true,
        defaultValue: UserStatus.ACTIVE
      },
      needPasswordChange: {
        type: "boolean",
        required: true,
        defaultValue: false
      },
      isDeleted: {
        type: "boolean",
        required: true,
        defaultValue: false
      },
      deletedAt: {
        type: "date",
        required: false,
        defaultValue: null
      }
    }
  },
  plugins: [
    bearer(),
    emailOTP({
      overrideDefaultEmailVerification: true,
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "email-verification") {
          const user = await prisma.user.findUnique({
            where: {
              email
            }
          });
          if (!user) {
            console.error(
              `User with email ${email} not found. Cannot send verification OTP.`
            );
            return;
          }
          if (user && !user.emailVerified) {
            sendEmail({
              to: email,
              subject: "Verify your email",
              templateName: "otp",
              templateData: {
                userName: user.name,
                appName: envVars.APP_NAME,
                otp
              }
            });
          }
        } else if (type === "forget-password") {
          const user = await prisma.user.findUnique({
            where: {
              email
            }
          });
          if (user) {
            sendEmail({
              to: email,
              subject: "Password Reset OTP",
              templateName: "otp",
              templateData: {
                userName: user.name,
                appName: envVars.APP_NAME,
                otp
              }
            });
          }
        }
      },
      expiresIn: 5 * 60,
      // 5 minutes in seconds
      otpLength: 6
    })
  ],
  session: {
    expiresIn: 60 * 60 * 60 * 24,
    // 1 day in seconds
    updateAge: 60 * 60 * 60 * 24,
    // 1 day in seconds
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 60 * 24
      // 1 day in seconds
    }
  },
  redirectURLs: {
    signIn: `${envVars.BETTER_AUTH_URL}/api/v1/auth/google/success`
  },
  advanced: {
    useSecureCookies: envVars.NODE_ENV === "production",
    cookies: {
      state: {
        attributes: {
          sameSite: envVars.NODE_ENV === "production" ? "none" : "lax",
          secure: envVars.NODE_ENV === "production",
          httpOnly: true,
          path: "/"
        }
      },
      sessionToken: {
        attributes: {
          sameSite: envVars.NODE_ENV === "production" ? "none" : "lax",
          secure: envVars.NODE_ENV === "production",
          httpOnly: true,
          path: "/"
        }
      }
    }
  }
});

// src/modules/auth/auth.service.ts
import { Role as Role2, UserStatus as UserStatus2 } from "@prisma/client";

// src/lib/transporter.ts
import nodemailer2 from "nodemailer";
var transporter2 = nodemailer2.createTransport({
  service: "gmail",
  auth: {
    user: envVars.EMAIL_SENDER.SMTP_USER,
    pass: envVars.EMAIL_SENDER.SMTP_PASS
  }
});

// src/modules/auth/auth.service.ts
import path3 from "path";
import ejs2 from "ejs";

// src/lib/googleAuth.ts
import { OAuth2Client } from "google-auth-library";
var googleClient = new OAuth2Client({
  clientId: envVars.GOOGLE_CLIENT_ID
});

// src/modules/auth/auth.service.ts
import { AuthProvider } from "@prisma/client";
var buildTokenPayload = (user) => ({
  userId: user.id,
  role: user.role,
  name: user.name,
  email: user.email,
  status: user.status,
  isDeleted: user.isDeleted,
  emailVerified: user.emailVerified
});
var registerUser = async (payload) => {
  const { name, email, password, image } = payload;
  if (email) {
    const existingUser = await prisma.user.findUnique({
      where: {
        email
      }
    });
    if (existingUser) {
      throw new AppError(status3.CONFLICT, "Email already exists");
    }
  }
  const data = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
      image
    }
  });
  if (!data.user) {
    throw new AppError(status3.BAD_REQUEST, "Failed to register user");
  }
  try {
    const payload2 = buildTokenPayload(data.user);
    const accessToken = tokenUtils.getAccessToken(payload2);
    const refreshToken = tokenUtils.getRefreshToken(payload2);
    return {
      ...data,
      accessToken,
      refreshToken,
      user: data.user
    };
  } catch (error) {
    await prisma.user.delete({
      where: {
        id: data.user.id
      }
    });
    throw error;
  }
};
var loginUser = async (payload) => {
  const { email, password } = payload;
  let data;
  try {
    data = await auth.api.signInEmail({
      body: {
        email,
        password
      }
    });
  } catch (err) {
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
    if (msg.includes("Email not verified") || msg.toLowerCase().includes("email not verified")) {
      const needsVerification = { needsVerification: true, email };
      return needsVerification;
    }
    throw err;
  }
  if (data.user.status === "BLOCKED") {
    throw new AppError(status3.FORBIDDEN, "User is blocked");
  }
  if (data.user.isDeleted || data.user.status === "DELETED") {
    throw new AppError(status3.NOT_FOUND, "User is deleted");
  }
  const tokenPayload = buildTokenPayload(data.user);
  const accessToken = tokenUtils.getAccessToken(tokenPayload);
  const refreshToken = tokenUtils.getRefreshToken(tokenPayload);
  return {
    ...data,
    accessToken,
    refreshToken
  };
};
var resendOTP = async (email) => {
  const isUserExist = await prisma.user.findUnique({ where: { email } });
  if (!isUserExist) {
    throw new AppError(status3.NOT_FOUND, "User not found");
  }
  if (isUserExist.emailVerified) {
    throw new AppError(status3.BAD_REQUEST, "Email already verified");
  }
  const existingVerification = await prisma.verification.findFirst({
    where: {
      identifier: email,
      expiresAt: {
        gt: /* @__PURE__ */ new Date()
      }
    }
  });
  if (existingVerification) {
    throw new AppError(
      status3.TOO_MANY_REQUESTS,
      "A verification email was already sent recently. Please check your inbox or try again later."
    );
  }
  try {
    const sdk = auth.api;
    if (typeof sdk.requestEmailVerificationOTP === "function") {
      await sdk.requestEmailVerificationOTP({ body: { email } });
    } else if (typeof sdk.requestVerificationEmailOTP === "function") {
      await sdk.requestVerificationEmailOTP({ body: { email } });
    } else if (typeof sdk.requestEmailOTP === "function") {
      await sdk.requestEmailOTP({
        body: { email, type: "email-verification" }
      });
    } else if (typeof sdk["requestSignInOTP"] === "function") {
      await sdk["requestSignInOTP"]({ body: { email } });
    } else {
      throw new Error(
        "No suitable method available on auth SDK to request verification OTP"
      );
    }
  } catch {
    throw new AppError(
      status3.INTERNAL_SERVER_ERROR,
      "Failed to resend verification OTP"
    );
  }
};
var getMe = async (user) => {
  const isUserExists = await prisma.user.findUnique({
    where: {
      id: user.id
    }
  });
  if (!isUserExists) {
    throw new AppError(status3.NOT_FOUND, "User not found");
  }
  return isUserExists;
};
var updateProfile = async (user, payload) => {
  const isUserExists = await prisma.user.findUnique({
    where: {
      id: user.id
    }
  });
  if (!isUserExists) {
    throw new AppError(status3.NOT_FOUND, "User not found");
  }
  if (isUserExists.isDeleted || isUserExists.status === "DELETED") {
    throw new AppError(status3.NOT_FOUND, "User not found");
  }
  const updated = await prisma.user.update({
    where: { id: user.id },
    data: {
      name: payload.name || isUserExists.name,
      image: payload.image || isUserExists.image,
      updatedAt: /* @__PURE__ */ new Date()
    }
  });
  return updated;
};
var getNewToken = async (refreshToken, sessionToken) => {
  const isSessionTokenExists = await prisma.session.findUnique({
    where: {
      token: sessionToken
    },
    include: {
      user: true
    }
  });
  if (!isSessionTokenExists) {
    throw new AppError(status3.UNAUTHORIZED, "Invalid session token");
  }
  const verifiedRefreshToken = jwtUtils.verifyToken(refreshToken, envVars.REFRESH_TOKEN_SECRET);
  if (!verifiedRefreshToken.success && verifiedRefreshToken.error) {
    throw new AppError(status3.UNAUTHORIZED, "Invalid refresh token");
  }
  const data = verifiedRefreshToken.data;
  const payload = buildTokenPayload(data);
  const newAccessToken = tokenUtils.getAccessToken(payload);
  const newRefreshToken = tokenUtils.getRefreshToken(payload);
  const { token } = await prisma.session.update({
    where: {
      token: sessionToken
    },
    data: {
      token: sessionToken,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1e3),
      updatedAt: /* @__PURE__ */ new Date()
    }
  });
  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    sessionToken: token
  };
};
var changePassword = async (payload, sessionToken) => {
  const session = await auth.api.getSession({
    headers: new Headers({
      Authorization: `Bearer ${sessionToken}`
    })
  });
  if (!session) {
    throw new AppError(status3.UNAUTHORIZED, "Invalid session token");
  }
  const { currentPassword, newPassword } = payload;
  const result = await auth.api.changePassword({
    body: {
      currentPassword,
      newPassword,
      revokeOtherSessions: true
    },
    headers: new Headers({
      Authorization: `Bearer ${sessionToken}`
    })
  });
  if (session.user.needPasswordChange) {
    await prisma.user.update({
      where: {
        id: session.user.id
      },
      data: {
        needPasswordChange: false
      }
    });
  }
  const tokenPayload = buildTokenPayload(session.user);
  const accessToken = tokenUtils.getAccessToken(tokenPayload);
  const refreshToken = tokenUtils.getRefreshToken(tokenPayload);
  return {
    ...result,
    accessToken,
    refreshToken
  };
};
var logoutUser = async (sessionToken) => {
  const result = await auth.api.signOut({
    headers: new Headers({
      Authorization: `Bearer ${sessionToken}`
    })
  });
  return result;
};
var verifyEmail = async (email, otp) => {
  const result = await auth.api.verifyEmailOTP({
    body: {
      email,
      otp
    }
  });
  if (result.status && !result.user.emailVerified) {
    await prisma.user.update({
      where: {
        email
      },
      data: {
        emailVerified: true
      }
    });
  }
};
var forgetPassword = async (email) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      email
    }
  });
  if (!isUserExist) {
    throw new AppError(status3.NOT_FOUND, "User not found");
  }
  if (!isUserExist.emailVerified) {
    throw new AppError(status3.BAD_REQUEST, "Email not verified");
  }
  if (isUserExist.isDeleted || isUserExist.status === "DELETED") {
    throw new AppError(status3.NOT_FOUND, "User not found");
  }
  await auth.api.requestPasswordResetEmailOTP({
    body: {
      email
    }
  });
};
var resetPassword = async (email, otp, newPassword) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      email
    }
  });
  if (!isUserExist) {
    throw new AppError(status3.NOT_FOUND, "User not found");
  }
  if (!isUserExist.emailVerified) {
    throw new AppError(status3.BAD_REQUEST, "Email not verified");
  }
  if (isUserExist.isDeleted || isUserExist.status === "DELETED") {
    throw new AppError(status3.NOT_FOUND, "User not found");
  }
  await auth.api.resetPasswordEmailOTP({
    body: {
      email,
      otp,
      password: newPassword
    }
  });
  if (isUserExist.needPasswordChange) {
    await prisma.user.update({
      where: {
        email
      },
      data: {
        needPasswordChange: false
      }
    });
  }
  await prisma.session.deleteMany({
    where: {
      userId: isUserExist.id
    }
  });
};
var googleLogin = async (payload) => {
  let googleIdTokenPayload = null;
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: payload.idToken,
      audience: envVars.GOOGLE_CLIENT_ID
    });
    googleIdTokenPayload = ticket.getPayload();
  } catch (error) {
    console.log("Google ID Token Verification Failed", error);
    throw new AppError(
      status3.UNAUTHORIZED,
      "Invalid Or Expired Google Id Token"
    );
  }
  if (!googleIdTokenPayload) {
    throw new AppError(
      status3.UNAUTHORIZED,
      "Invalid Or Expired Google Id Token"
    );
  }
  if (!googleIdTokenPayload.email) {
    throw new AppError(status3.BAD_REQUEST, "Google Email Not Found");
  }
  if (!googleIdTokenPayload.name) {
    throw new AppError(status3.BAD_REQUEST, "Google Email User Name Not Found");
  }
  const ifUserExistWithGoogleAuth = await prisma.user.findUnique({
    where: {
      email: googleIdTokenPayload.email,
      role: Role2.CUSTOMER,
      googleId: googleIdTokenPayload.sub
    }
  });
  let user = ifUserExistWithGoogleAuth;
  if (!ifUserExistWithGoogleAuth) {
    const ifUserExistWithCredentials = await prisma.user.findUnique({
      where: {
        email: googleIdTokenPayload.email,
        role: Role2.CUSTOMER,
        authProvider: AuthProvider.CREDENTIAL
      }
    });
    if (ifUserExistWithCredentials) {
      if (!ifUserExistWithCredentials.emailVerified) {
        throw new AppError(status3.FORBIDDEN, "Email Not Verified");
      }
      if (ifUserExistWithCredentials.status === UserStatus2.BLOCKED) {
        throw new AppError(status3.FORBIDDEN, "User Is Blocked");
      }
      if (ifUserExistWithCredentials.isDeleted || ifUserExistWithCredentials.status === UserStatus2.DELETED) {
        throw new AppError(status3.FORBIDDEN, "User Is Deleted");
      }
      user = await prisma.user.update({
        where: { id: ifUserExistWithCredentials.id },
        data: { googleId: googleIdTokenPayload.sub }
      });
    } else {
      user = await prisma.user.create({
        data: {
          name: googleIdTokenPayload.name,
          email: googleIdTokenPayload.email,
          role: Role2.CUSTOMER,
          googleId: googleIdTokenPayload.sub,
          authProvider: AuthProvider.GOOGLE,
          emailVerified: true,
          customerProfile: {
            create: {}
          }
        }
      });
      const newUser = user;
      (async () => {
        try {
          const templatePath = path3.join(
            process.cwd(),
            "src/app/templates/user-welcome-email.ejs"
          );
          const html = await ejs2.renderFile(templatePath, {
            name: newUser.name
          });
          await transporter2.sendMail({
            from: envVars.EMAIL_SENDER.SMTP_FROM,
            to: newUser.email,
            subject: "Welcome To Opperd Technology",
            html
          });
        } catch (err) {
          console.log("Welcome email failed", err);
        }
      })();
    }
  }
  if (!user) {
    throw new AppError(status3.NOT_FOUND, "User Not Found");
  }
  if (user.status === UserStatus2.BLOCKED) {
    throw new AppError(status3.FORBIDDEN, "User Is Blocked");
  }
  if (user.isDeleted || user.status === UserStatus2.DELETED) {
    throw new AppError(status3.FORBIDDEN, "User Is Deleted");
  }
  const tokenPayload = buildTokenPayload(user);
  const accessToken = tokenUtils.getAccessToken(tokenPayload);
  const refreshToken = tokenUtils.getRefreshToken(tokenPayload);
  return {
    accessToken,
    refreshToken,
    token: void 0
    // Google login e Better Auth session toiri hoy na
  };
};
var authService = {
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

// src/modules/auth/auth.controller.ts
var registerUser2 = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await authService.registerUser(payload);
  const { accessToken, refreshToken, token, ...rest } = result;
  tokenUtils.setAuthCookies(res, { accessToken, refreshToken, sessionToken: token });
  sendResponse(res, {
    status: status4.CREATED,
    success: true,
    message: "User registered successfully",
    data: {
      token,
      accessToken,
      refreshToken,
      ...rest
    }
  });
});
var loginUser2 = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await authService.loginUser(payload);
  if (result?.needsVerification) {
    const n = result;
    return sendResponse(res, {
      status: status4.FORBIDDEN,
      success: false,
      message: "Email not verified",
      data: { email: n.email }
    });
  }
  const { accessToken, refreshToken, token, ...rest } = result;
  if (typeof token !== "string") {
    throw new AppError(
      status4.INTERNAL_SERVER_ERROR,
      "Session token is missing"
    );
  }
  if (typeof accessToken !== "string" || typeof refreshToken !== "string") {
    throw new AppError(status4.INTERNAL_SERVER_ERROR, "Auth tokens are missing");
  }
  tokenUtils.setAuthCookies(res, { accessToken, refreshToken, sessionToken: token });
  sendResponse(res, {
    status: status4.OK,
    success: true,
    message: "User logged in successfully",
    data: {
      token,
      accessToken,
      refreshToken,
      ...rest
    }
  });
});
var getMe2 = catchAsync(
  async (req, res) => {
    const user = req.user;
    const result = await authService.getMe(user);
    sendResponse(res, {
      status: status4.OK,
      success: true,
      message: "User profile fetched successfully",
      data: result
    });
  }
);
var updateProfile2 = catchAsync(async (req, res) => {
  const { name, image } = req.body;
  const user = req.user;
  const result = await authService.updateProfile(user, { name, image });
  sendResponse(res, {
    status: status4.OK,
    success: true,
    message: "Profile updated successfully",
    data: result
  });
});
var getNewToken2 = catchAsync(
  async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    const betterAuthSessionToken = req.cookies["better-auth.session_token"];
    if (!refreshToken) {
      throw new AppError(status4.UNAUTHORIZED, "Refresh token is missing");
    }
    const result = await authService.getNewToken(refreshToken, betterAuthSessionToken);
    const { accessToken, refreshToken: newRefreshToken, sessionToken } = result;
    tokenUtils.setAuthCookies(res, { accessToken, refreshToken: newRefreshToken, sessionToken });
    sendResponse(res, {
      status: status4.OK,
      success: true,
      message: "New tokens generated successfully",
      data: {
        accessToken,
        refreshToken: newRefreshToken,
        sessionToken
      }
    });
  }
);
var changePassword2 = catchAsync(
  async (req, res) => {
    const payload = req.body;
    const betterAuthSessionToken = req.cookies["better-auth.session_token"];
    const result = await authService.changePassword(payload, betterAuthSessionToken);
    const { accessToken, refreshToken, token } = result;
    tokenUtils.setAuthCookies(res, { accessToken, refreshToken, sessionToken: token });
    sendResponse(res, {
      status: status4.OK,
      success: true,
      message: "Password changed successfully",
      data: result
    });
  }
);
var logoutUser2 = catchAsync(
  async (req, res) => {
    const betterAuthSessionToken = req.cookies["better-auth.session_token"];
    const result = await authService.logoutUser(betterAuthSessionToken);
    cookieUtils.clearCookie(res, "accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    });
    cookieUtils.clearCookie(res, "refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    });
    cookieUtils.clearCookie(res, "better-auth.session_token", {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    });
    sendResponse(res, {
      status: status4.OK,
      success: true,
      message: "User logged out successfully",
      data: result
    });
  }
);
var verifyEmail2 = catchAsync(
  async (req, res) => {
    const { email, otp } = req.body;
    await authService.verifyEmail(email, otp);
    sendResponse(res, {
      status: status4.OK,
      success: true,
      message: "Email verified successfully"
    });
  }
);
var resendOTP2 = catchAsync(async (req, res) => {
  const { email } = req.body;
  await authService.resendOTP(email);
  sendResponse(res, {
    status: status4.OK,
    success: true,
    message: "Verification OTP resent successfully"
  });
});
var forgetPassword2 = catchAsync(
  async (req, res) => {
    const { email } = req.body;
    await authService.forgetPassword(email);
    sendResponse(res, {
      status: status4.OK,
      success: true,
      message: "Password reset OTP sent to email successfully"
    });
  }
);
var resetPassword2 = catchAsync(async (req, res) => {
  const { email, otp, newPassword } = req.body;
  await authService.resetPassword(email, otp, newPassword);
  sendResponse(res, {
    status: status4.OK,
    success: true,
    message: "Password reset successfully"
  });
});
var googleLogin2 = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await authService.googleLogin(payload);
  const { accessToken, refreshToken } = result;
  tokenUtils.setAccessTokenCookie(res, accessToken);
  tokenUtils.setRefreshTokenCookie(res, refreshToken);
  sendResponse(res, {
    status: status4.OK,
    success: true,
    message: "Google login successful",
    data: {
      accessToken,
      refreshToken
    }
  });
});
var authController = {
  registerUser: registerUser2,
  loginUser: loginUser2,
  getMe: getMe2,
  updateProfile: updateProfile2,
  getNewToken: getNewToken2,
  changePassword: changePassword2,
  logoutUser: logoutUser2,
  verifyEmail: verifyEmail2,
  resendOTP: resendOTP2,
  forgetPassword: forgetPassword2,
  resetPassword: resetPassword2,
  googleLogin: googleLogin2
};

// src/shared/middlewares/checkAuth.ts
import status5 from "http-status";
import { Role as Role3, UserStatus as UserStatus3 } from "@prisma/client";
var checkAuth = (...authRoles) => async (req, res, next) => {
  try {
    const sessionToken = cookieUtils.getCookie(
      req,
      "better-auth.session_token"
    );
    if (sessionToken) {
      const sessionExists = await prisma.session.findFirst({
        where: {
          token: sessionToken,
          expiresAt: {
            gt: /* @__PURE__ */ new Date()
          }
        },
        include: {
          user: true
        }
      });
      if (sessionExists && sessionExists.user) {
        const user = sessionExists.user;
        const now = /* @__PURE__ */ new Date();
        const expiresAt = new Date(sessionExists.expiresAt);
        const createdAt = new Date(sessionExists.createdAt);
        const sessionLifeTime = expiresAt.getTime() - createdAt.getTime();
        const timeRemaining = expiresAt.getTime() - now.getTime();
        const percentRemaining = timeRemaining / sessionLifeTime * 100;
        if (percentRemaining < 20) {
          res.setHeader("X-Session-Refresh", "true");
          res.setHeader("X-Session-Expires-At", expiresAt.toISOString());
          res.setHeader("X-Time-Remaining", timeRemaining.toString());
        }
        if (user.status === UserStatus3.BLOCKED || user.status === UserStatus3.DELETED) {
          throw new AppError(
            status5.UNAUTHORIZED,
            "Unauthorized access! User is not active."
          );
        }
        if (user.isDeleted) {
          throw new AppError(
            status5.UNAUTHORIZED,
            "Unauthorized access! User is deleted."
          );
        }
        if (authRoles.length > 0 && !authRoles.includes(user.role)) {
          throw new AppError(
            status5.FORBIDDEN,
            "Forbidden access! You do not have permission to access this resource."
          );
        }
        req.user = {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.image
        };
      }
    }
    const accessToken = cookieUtils.getCookie(req, "accessToken");
    if (!accessToken) {
      throw new AppError(
        status5.UNAUTHORIZED,
        "Unauthorized access! No access token provided."
      );
    }
    const verifiedToken = jwtUtils.verifyToken(
      accessToken,
      envVars.ACCESS_TOKEN_SECRET
    );
    if (!verifiedToken.success) {
      const message = verifiedToken.code === "TOKEN_EXPIRED" ? "Unauthorized access! Access token has expired. Please refresh your token." : "Unauthorized access! Invalid access token.";
      throw new AppError(status5.UNAUTHORIZED, message);
    }
    if (authRoles.length > 0 && !authRoles.includes(verifiedToken.data.role)) {
      throw new AppError(
        status5.FORBIDDEN,
        "Forbidden access! You do not have permission to access this resource."
      );
    }
    if (!req.user) {
      const tokenData = verifiedToken.data;
      req.user = {
        id: String(tokenData.userId || tokenData.id || ""),
        name: String(tokenData.name || ""),
        email: String(tokenData.email || ""),
        role: tokenData.role || Role3.CUSTOMER,
        image: String(tokenData.image || "")
      };
    }
    if (!req.user?.id) {
      throw new AppError(
        status5.UNAUTHORIZED,
        "Unauthorized access! User information is missing in the token."
      );
    }
    next();
  } catch (error) {
    next(error);
  }
};

// src/modules/auth/auth.route.ts
var router2 = Router2();
router2.post("/register", authController.registerUser);
router2.post("/login", authController.loginUser);
router2.get("/me", checkAuth(Role4.ADMIN, Role4.CUSTOMER), authController.getMe);
router2.post("/refresh-token", authController.getNewToken);
router2.post("/change-password", checkAuth(Role4.ADMIN, Role4.CUSTOMER), authController.changePassword);
router2.post("/logout", checkAuth(Role4.ADMIN, Role4.CUSTOMER), authController.logoutUser);
router2.post("/verify-email", authController.verifyEmail);
router2.post("/forget-password", authController.forgetPassword);
router2.post("/reset-password", authController.resetPassword);
router2.post("/resend-otp", authController.resendOTP);
router2.post("/google-login", authController.googleLogin);
router2.patch(
  "/profile",
  checkAuth(Role4.ADMIN, Role4.CUSTOMER),
  authController.updateProfile
);
var authRoutes = router2;

// src/routes/index.ts
var router3 = Router3();
router3.use("/health", healthRoutes);
router3.use("/auth", authRoutes);
var apiRoutes = router3;

// src/app.ts
import path4 from "path";

// src/shared/middlewares/notFound.ts
import status6 from "http-status";
function notFound(req, res) {
  res.status(status6.NOT_FOUND).json({
    message: `Can't find ${req.originalUrl} on this server!`,
    path: req.originalUrl,
    date: Date()
  });
}

// src/shared/middlewares/errorHandler.ts
import status7 from "http-status";
var errorHandler = (err, _req, res) => {
  const isDevelopment = envVars.NODE_ENV === "development";
  logger.error("Global Error Handler:", err);
  let statusCode;
  let message;
  let stack;
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    stack = err.stack;
  } else if (err instanceof Error) {
    statusCode = status7.INTERNAL_SERVER_ERROR;
    message = err.message || "Internal Server Error";
    stack = err.stack;
  } else {
    statusCode = status7.INTERNAL_SERVER_ERROR;
    message = "Internal Server Error";
    stack = void 0;
  }
  const errorResponse = {
    success: false,
    message,
    stack: isDevelopment ? stack : void 0
  };
  res.status(statusCode).json(errorResponse);
};
var globalErrorHandler = errorHandler;

// src/app.ts
var app = express();
app.set("query parser", (str) => qs.parse(str));
app.set("view engine", "ejs");
app.set("views", path4.resolve(process.cwd(), `src/templates`));
app.use(express.json());
app.use(helmet());
app.use(httpLogger);
app.use(cors);
app.use(globalLimiter);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}
app.get("/", (_req, res) => {
  res.status(200).json({
    title: "Opperd APIs",
    description: "Built with Mordern Tech - A production-ready Express Server with TypeScript, security, and best practices.",
    version: "1.0.0",
    docs: "https://github.com/mahmud-reza-rafsun/opperd"
  });
});
app.use("/api/v1", apiRoutes);
app.use(notFound);
app.use(globalErrorHandler);

// src/server.ts
var server = null;
var bootstrap = async () => {
  try {
    server = app.listen(envVars.PORT, () => {
      console.log(`Server is running on http://localhost:${envVars.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};
var shutdown = (signal, exitCode) => {
  console.log(`${signal} signal received: closing HTTP server`);
  if (server) {
    server.close(() => {
      console.log("HTTP server closed");
    });
  }
  process.exit(exitCode);
};
process.on("SIGTERM", () => shutdown("SIGTERM", 0));
process.on("SIGINT", () => shutdown("SIGINT", 0));
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  if (server) {
    server.close(() => {
      console.log("HTTP server closed due to uncaught exception");
    });
  }
  process.exit(1);
});
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  if (server) {
    server.close(() => {
      console.log("HTTP server closed due to unhandled rejection");
    });
  }
  process.exit(1);
});
bootstrap();
