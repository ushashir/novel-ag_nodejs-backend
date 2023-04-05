-- CreateEnum
CREATE TYPE "RoleEnumType" AS ENUM ('AGENT', 'ADMIN');

-- CreateTable
CREATE TABLE "agents" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "address" TEXT,
    "avatar" TEXT,
    "verified" BOOLEAN DEFAULT false,
    "password" TEXT NOT NULL,
    "role" "RoleEnumType" NOT NULL DEFAULT 'AGENT',
    "verificationCode" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "provider" TEXT,
    "passwordResetToken" TEXT,
    "passwordResetAt" TIMESTAMP(3),

    CONSTRAINT "agents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prosperity-hubs" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "prosperity-hubs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "warehouses" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "warehouses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "agents_email_key" ON "agents"("email");

-- CreateIndex
CREATE UNIQUE INDEX "agents_phone_key" ON "agents"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "agents_verificationCode_key" ON "agents"("verificationCode");

-- CreateIndex
CREATE INDEX "agents_email_verificationCode_passwordResetToken_idx" ON "agents"("email", "verificationCode", "passwordResetToken");

-- CreateIndex
CREATE UNIQUE INDEX "agents_email_verificationCode_passwordResetToken_key" ON "agents"("email", "verificationCode", "passwordResetToken");
