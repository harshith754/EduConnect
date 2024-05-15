-- AlterTable
ALTER TABLE "ProfessionalDetails" ADD COLUMN     "resumeId" TEXT;

-- CreateTable
CREATE TABLE "LecturesDelivered" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "LecturesDelivered_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lecture" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "dateDelivered" TEXT,
    "venue" TEXT,
    "organization" TEXT,
    "audience" TEXT,
    "description" TEXT,
    "fileProof" TEXT,
    "lecturesDeliveredId" INTEGER,

    CONSTRAINT "Lecture_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LecturesDelivered_email_key" ON "LecturesDelivered"("email");

-- AddForeignKey
ALTER TABLE "LecturesDelivered" ADD CONSTRAINT "LecturesDelivered_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lecture" ADD CONSTRAINT "Lecture_lecturesDeliveredId_fkey" FOREIGN KEY ("lecturesDeliveredId") REFERENCES "LecturesDelivered"("id") ON DELETE SET NULL ON UPDATE CASCADE;
