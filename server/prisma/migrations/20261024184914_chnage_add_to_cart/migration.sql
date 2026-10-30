/*
  Warnings:

  - A unique constraint covering the columns `[userId,productId]` on the table `cart_item` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sessionId,productId]` on the table `cart_item` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "cart_item_productId_idx";

-- DropIndex
DROP INDEX "cart_item_productId_key";

-- AlterTable
ALTER TABLE "cart_item" ADD COLUMN     "sessionId" TEXT,
ADD COLUMN     "userId" TEXT;

-- CreateIndex
CREATE INDEX "cart_item_userId_idx" ON "cart_item"("userId");

-- CreateIndex
CREATE INDEX "cart_item_sessionId_idx" ON "cart_item"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "cart_item_userId_productId_key" ON "cart_item"("userId", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "cart_item_sessionId_productId_key" ON "cart_item"("sessionId", "productId");

-- AddForeignKey
ALTER TABLE "cart_item" ADD CONSTRAINT "cart_item_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
