-- AlterTable
ALTER TABLE "PapersPublished" ADD COLUMN     "totalArticles" INTEGER,
ADD COLUMN     "totalCitations" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "IEEEAuthorId" INTEGER,
ALTER COLUMN "instituteName" SET DEFAULT 'SPIT';
