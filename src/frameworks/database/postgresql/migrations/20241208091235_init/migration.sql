-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "linkedinLink" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "roleName" TEXT NOT NULL,
    "profileAvatar" TEXT NOT NULL,
    "temporalExhibitionLink" TEXT NOT NULL,
    "profileIsActivated" BOOLEAN NOT NULL DEFAULT false,
    "followers" INTEGER NOT NULL,
    "lastEntry" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_linkedinLink_key" ON "User"("linkedinLink");
