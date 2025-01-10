-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "number" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "documentId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "jobName" DROP NOT NULL;
