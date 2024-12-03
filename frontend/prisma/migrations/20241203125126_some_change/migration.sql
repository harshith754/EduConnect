-- AlterTable
ALTER TABLE "Paper" ADD COLUMN     "abstract" TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "IEEEAuthorId" SET DATA TYPE TEXT;
