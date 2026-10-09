-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'CUSTOMER');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'BLOCKED', 'DELETED');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('PENDING', 'PLANNING', 'IN_PROGRESS', 'ON_HOLD', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'FAILED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('ADVANCE', 'INSTALLMENT', 'FINAL');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('BKASH', 'STRIPE');

-- CreateEnum
CREATE TYPE "ExpenseCategory" AS ENUM ('HOSTING', 'DOMAIN', 'TOOLS', 'FREELANCER', 'MARKETING', 'OTHER');

-- CreateEnum
CREATE TYPE "AuthProvider" AS ENUM ('GOOGLE', 'CREDENTIAL');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "role" "Role" NOT NULL DEFAULT 'CUSTOMER',
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "googleId" TEXT,
    "authProvider" "AuthProvider" NOT NULL DEFAULT 'CREDENTIAL',
    "needPasswordChange" BOOLEAN NOT NULL DEFAULT false,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "commit" (
    "id" TEXT NOT NULL,
    "sha" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "authorImage" TEXT,
    "url" TEXT NOT NULL,
    "committedAt" TIMESTAMP(3) NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "commit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer_profile" (
    "id" TEXT NOT NULL,
    "phone" TEXT,
    "company" TEXT,
    "address" TEXT,
    "adminNote" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customer_profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expense" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "category" "ExpenseCategory" NOT NULL DEFAULT 'OTHER',
    "note" TEXT,
    "spentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "projectId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "expense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "milestone" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "weight" INTEGER NOT NULL DEFAULT 1,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),
    "projectId" TEXT NOT NULL,

    CONSTRAINT "milestone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'BDT',
    "amountBdt" INTEGER NOT NULL,
    "type" "PaymentType" NOT NULL DEFAULT 'ADVANCE',
    "method" "PaymentMethod" NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "gatewayPaymentId" TEXT,
    "trxId" TEXT,
    "payerNumber" TEXT,
    "gatewayResponse" JSONB,
    "note" TEXT,
    "dueDate" TIMESTAMP(3),
    "paidAt" TIMESTAMP(3),
    "projectId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" "ProjectStatus" NOT NULL DEFAULT 'PENDING',
    "progress" INTEGER NOT NULL DEFAULT 0,
    "totalAmount" INTEGER NOT NULL DEFAULT 0,
    "advanceAmount" INTEGER NOT NULL DEFAULT 0,
    "currency" TEXT NOT NULL DEFAULT 'BDT',
    "estimatedDays" INTEGER,
    "startDate" TIMESTAMP(3),
    "deadline" TIMESTAMP(3),
    "deliveredAt" TIMESTAMP(3),
    "stagingUrl" TEXT,
    "liveUrl" TEXT,
    "githubRepo" TEXT,
    "webhookSecret" TEXT,
    "customerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_update" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT,
    "isVisibleToCustomer" BOOLEAN NOT NULL DEFAULT true,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "project_update_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_googleId_key" ON "user"("googleId");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "session"("token");

-- CreateIndex
CREATE INDEX "session_userId_idx" ON "session"("userId");

-- CreateIndex
CREATE INDEX "account_userId_idx" ON "account"("userId");

-- CreateIndex
CREATE INDEX "verification_identifier_idx" ON "verification"("identifier");

-- CreateIndex
CREATE INDEX "commit_projectId_committedAt_idx" ON "commit"("projectId", "committedAt");

-- CreateIndex
CREATE UNIQUE INDEX "commit_projectId_sha_key" ON "commit"("projectId", "sha");

-- CreateIndex
CREATE UNIQUE INDEX "customer_profile_userId_key" ON "customer_profile"("userId");

-- CreateIndex
CREATE INDEX "expense_projectId_idx" ON "expense"("projectId");

-- CreateIndex
CREATE INDEX "expense_spentAt_idx" ON "expense"("spentAt");

-- CreateIndex
CREATE INDEX "milestone_projectId_idx" ON "milestone"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "payment_gatewayPaymentId_key" ON "payment"("gatewayPaymentId");

-- CreateIndex
CREATE UNIQUE INDEX "payment_trxId_key" ON "payment"("trxId");

-- CreateIndex
CREATE INDEX "payment_projectId_idx" ON "payment"("projectId");

-- CreateIndex
CREATE INDEX "payment_customerId_createdAt_idx" ON "payment"("customerId", "createdAt");

-- CreateIndex
CREATE INDEX "payment_status_paidAt_idx" ON "payment"("status", "paidAt");

-- CreateIndex
CREATE INDEX "project_customerId_idx" ON "project"("customerId");

-- CreateIndex
CREATE INDEX "project_status_idx" ON "project"("status");

-- CreateIndex
CREATE INDEX "project_update_projectId_createdAt_idx" ON "project_update"("projectId", "createdAt");

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commit" ADD CONSTRAINT "commit_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_profile" ADD CONSTRAINT "customer_profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expense" ADD CONSTRAINT "expense_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "milestone" ADD CONSTRAINT "milestone_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_update" ADD CONSTRAINT "project_update_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
