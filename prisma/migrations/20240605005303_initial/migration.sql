-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('CPF', 'CNPJ');

-- CreateEnum
CREATE TYPE "CreditorType" AS ENUM ('SUPPLIER', 'SERVICES', 'TAXES', 'EMPLOYEES', 'BANKS', 'OTHER');

-- CreateEnum
CREATE TYPE "SpendingStatus" AS ENUM ('PENDING', 'PAID');

-- CreateTable
CREATE TABLE "creditors" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "documentType" "DocumentType" NOT NULL DEFAULT 'CPF',
    "type" "CreditorType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "creditors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spendings" (
    "id" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "type" "SpendingStatus" NOT NULL DEFAULT 'PENDING',
    "creditorId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "payAt" TIMESTAMP(3) NOT NULL,
    "text" TEXT,

    CONSTRAINT "spendings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "spendings" ADD CONSTRAINT "spendings_creditorId_fkey" FOREIGN KEY ("creditorId") REFERENCES "creditors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
