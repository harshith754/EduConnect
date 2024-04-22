/*
  Warnings:

  - You are about to drop the column `dateOfPubication` on the `Book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "dateOfPubication",
ADD COLUMN     "dateOfPublication" TEXT;
