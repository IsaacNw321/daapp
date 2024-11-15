-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'DANCER', 'REPRESENTATIVE', 'CONTACT');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT NOT NULL,
    "photo" TEXT,
    "userRole" "UserRole" NOT NULL DEFAULT 'CONTACT',
    "active" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dancer" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "Payment" INTEGER NOT NULL DEFAULT 0,
    "allergies" TEXT,
    "CI" INTEGER,
    "age" INTEGER,
    "dateBirth" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "phone" INTEGER,
    "Adress" TEXT,

    CONSTRAINT "Dancer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Representative" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "Payment" INTEGER NOT NULL DEFAULT 0,
    "phone" INTEGER,
    "Adress" TEXT,

    CONSTRAINT "Representative_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DancerR" (
    "id" TEXT NOT NULL,
    "representativeId" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "allergies" TEXT NOT NULL,
    "cI" INTEGER NOT NULL,
    "age" INTEGER NOT NULL,
    "dateBirth" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Payment" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "DancerR_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "representativeId" TEXT,
    "dancerId" TEXT,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Dancer_userId_key" ON "Dancer"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Representative_userId_key" ON "Representative"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_representativeId_key" ON "Review"("representativeId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_dancerId_key" ON "Review"("dancerId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_dancerId_representativeId_key" ON "Review"("dancerId", "representativeId");

-- CreateIndex
CREATE UNIQUE INDEX "Question_question_key" ON "Question"("question");

-- CreateIndex
CREATE UNIQUE INDEX "Question_answer_key" ON "Question"("answer");

-- AddForeignKey
ALTER TABLE "Dancer" ADD CONSTRAINT "Dancer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Representative" ADD CONSTRAINT "Representative_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DancerR" ADD CONSTRAINT "DancerR_representativeId_fkey" FOREIGN KEY ("representativeId") REFERENCES "Representative"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_representativeId_fkey" FOREIGN KEY ("representativeId") REFERENCES "Representative"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_dancerId_fkey" FOREIGN KEY ("dancerId") REFERENCES "Dancer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
