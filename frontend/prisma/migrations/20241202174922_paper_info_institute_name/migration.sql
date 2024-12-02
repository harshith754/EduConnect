-- AlterTable
ALTER TABLE "Paper" ADD COLUMN     "isBook" BOOLEAN DEFAULT false,
ADD COLUMN     "isConference" BOOLEAN DEFAULT true,
ADD COLUMN     "isJournal" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "instituteName" TEXT;
