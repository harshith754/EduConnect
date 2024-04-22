/*
  Warnings:

  - You are about to drop the column `userId` on the `PersonalDetails` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `PersonalDetails` will be added. If there are existing duplicate values, this will fail.
  - Made the column `email` on table `PersonalDetails` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "PersonalDetails" DROP CONSTRAINT "PersonalDetails_userId_fkey";

-- DropIndex
DROP INDEX "PersonalDetails_userId_key";

-- AlterTable
ALTER TABLE "PersonalDetails" DROP COLUMN "userId",
ALTER COLUMN "email" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PersonalDetails_email_key" ON "PersonalDetails"("email");

-- AddForeignKey
ALTER TABLE "PersonalDetails" ADD CONSTRAINT "PersonalDetails_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
