/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `Document` table. All the data in the column will be lost.
  - The primary key for the `Event` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `attendesList` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `isOnlineFormat` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `memberId` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `orginiser` on the `Event` table. All the data in the column will be lost.
  - The `id` column on the `Event` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Lead` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `deletedAt` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `priority` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Lead` table. All the data in the column will be lost.
  - The `id` column on the `Lead` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `deletedAt` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `followers` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastEntry` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `profileAvatar` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `temporalExhibitionLink` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `UserTeam` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `Lead` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[billingEmail]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[calendlyLink]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `number` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Made the column `link` on table `Document` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `noteId` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orginizer` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyName` to the `Lead` table without a default value. This is not possible if the table is not empty.
  - Added the required column `countryName` to the `Lead` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Lead` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstname` to the `Lead` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobName` to the `Lead` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `Lead` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `calendlyLink` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TeamStatus" AS ENUM ('active', 'inactive');

-- CreateEnum
CREATE TYPE "InsightCategory" AS ENUM ('activities', 'notes', 'recent_event');

-- AlterEnum
ALTER TYPE "DocumentCategory" ADD VALUE 'csv';

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_memberId_fkey";

-- DropForeignKey
ALTER TABLE "Lead" DROP CONSTRAINT "Lead_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserTeam" DROP CONSTRAINT "UserTeam_teamId_fkey";

-- DropForeignKey
ALTER TABLE "UserTeam" DROP CONSTRAINT "UserTeam_userId_fkey";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "deletedAt",
ADD COLUMN     "number" INTEGER NOT NULL,
ADD COLUMN     "street" TEXT;

-- AlterTable
ALTER TABLE "Document" DROP COLUMN "deletedAt",
ALTER COLUMN "data" DROP NOT NULL,
ALTER COLUMN "link" SET NOT NULL;

-- AlterTable
ALTER TABLE "Event" DROP CONSTRAINT "Event_pkey",
DROP COLUMN "attendesList",
DROP COLUMN "deletedAt",
DROP COLUMN "isOnlineFormat",
DROP COLUMN "memberId",
DROP COLUMN "orginiser",
ADD COLUMN     "attendesListLink" TEXT,
ADD COLUMN     "companyLogoLink" TEXT,
ADD COLUMN     "noteId" TEXT NOT NULL,
ADD COLUMN     "orginizer" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "websiteLink" DROP NOT NULL,
ADD CONSTRAINT "Event_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Lead" DROP CONSTRAINT "Lead_pkey",
DROP COLUMN "deletedAt",
DROP COLUMN "priority",
DROP COLUMN "userId",
ADD COLUMN     "companyName" TEXT NOT NULL,
ADD COLUMN     "countryName" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "firstname" TEXT NOT NULL,
ADD COLUMN     "isDraft" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "jobName" TEXT NOT NULL,
ADD COLUMN     "lastname" TEXT NOT NULL,
ADD COLUMN     "meetingSummaryLink" TEXT,
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "status" "LeadStatus" NOT NULL DEFAULT 'created',
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "opened" DROP NOT NULL,
ALTER COLUMN "clicked" DROP NOT NULL,
ALTER COLUMN "landingPageVisited" DROP NOT NULL,
ADD CONSTRAINT "Lead_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Note" DROP COLUMN "deletedAt";

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "status" "TeamStatus" NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "followers",
DROP COLUMN "lastEntry",
DROP COLUMN "profileAvatar",
DROP COLUMN "temporalExhibitionLink",
ADD COLUMN     "addressId" TEXT NOT NULL,
ADD COLUMN     "billingEmail" TEXT,
ADD COLUMN     "billingFullname" TEXT,
ADD COLUMN     "calendlyLink" TEXT NOT NULL,
ADD COLUMN     "companyName" TEXT NOT NULL,
ADD COLUMN     "firstname" TEXT NOT NULL,
ADD COLUMN     "jobName" TEXT NOT NULL,
ADD COLUMN     "lastname" TEXT NOT NULL,
ADD COLUMN     "otherInfo" TEXT,
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "photoLink" TEXT,
ADD COLUMN     "vatNumber" TEXT;

-- DropTable
DROP TABLE "UserTeam";

-- CreateTable
CREATE TABLE "Job" (
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Company" (
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "UserToTeam" (
    "userId" INTEGER NOT NULL,
    "teamId" TEXT NOT NULL,
    "isTeamLead" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserToTeam_pkey" PRIMARY KEY ("userId","teamId")
);

-- CreateTable
CREATE TABLE "Insight" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "type" "InsightCategory" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Insight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InsightsOnLeads" (
    "leadId" INTEGER NOT NULL,
    "insightId" INTEGER NOT NULL,

    CONSTRAINT "InsightsOnLeads_pkey" PRIMARY KEY ("leadId","insightId")
);

-- CreateTable
CREATE TABLE "EventToUser" (
    "userId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "EventToUser_pkey" PRIMARY KEY ("userId","eventId")
);

-- CreateTable
CREATE TABLE "Chat" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "chatId" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Job_name_key" ON "Job"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Company_name_key" ON "Company"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Lead_email_key" ON "Lead"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_billingEmail_key" ON "User"("billingEmail");

-- CreateIndex
CREATE UNIQUE INDEX "User_calendlyLink_key" ON "User"("calendlyLink");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_jobName_fkey" FOREIGN KEY ("jobName") REFERENCES "Job"("name") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyName_fkey" FOREIGN KEY ("companyName") REFERENCES "Company"("name") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToTeam" ADD CONSTRAINT "UserToTeam_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserToTeam" ADD CONSTRAINT "UserToTeam_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InsightsOnLeads" ADD CONSTRAINT "InsightsOnLeads_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InsightsOnLeads" ADD CONSTRAINT "InsightsOnLeads_insightId_fkey" FOREIGN KEY ("insightId") REFERENCES "Insight"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventToUser" ADD CONSTRAINT "EventToUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventToUser" ADD CONSTRAINT "EventToUser_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
