/*
  Warnings:

  - The `teachingExperience` column on the `ProfessionalDetails` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `instituteExperience` column on the `ProfessionalDetails` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "EducationalQualification" ALTER COLUMN "degree" DROP NOT NULL,
ALTER COLUMN "institute" DROP NOT NULL,
ALTER COLUMN "yearOfCompletion" DROP NOT NULL,
ALTER COLUMN "yearOfCompletion" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "ProfessionalDetails" DROP COLUMN "teachingExperience",
ADD COLUMN     "teachingExperience" INTEGER,
DROP COLUMN "instituteExperience",
ADD COLUMN     "instituteExperience" INTEGER;
