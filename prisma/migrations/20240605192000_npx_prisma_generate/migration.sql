/*
  Warnings:

  - You are about to drop the `spendings` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('PENDING', 'PAID');

-- CreateEnum
CREATE TYPE "TransactionOperations" AS ENUM ('CREDIT', 'DEBIT');

-- DropForeignKey
ALTER TABLE "spendings" DROP CONSTRAINT "spendings_creditorId_fkey";

-- DropTable
DROP TABLE "spendings";

-- DropEnum
DROP TYPE "SpendingStatus";

-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL,
    "creditorId" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "operation" "TransactionOperations" NOT NULL,
    "status" "TransactionStatus" NOT NULL DEFAULT 'PENDING',
    "transactionType" TEXT DEFAULT 'Boleto',
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "payAt" TIMESTAMP(3) NOT NULL,
    "payedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "text" TEXT,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_creditorId_fkey" FOREIGN KEY ("creditorId") REFERENCES "creditors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
