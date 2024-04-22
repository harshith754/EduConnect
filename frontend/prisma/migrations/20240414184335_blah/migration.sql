-- CreateTable
CREATE TABLE "ProfessionalDetails" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "department" TEXT,
    "designation" TEXT,
    "dateOfJoining" TEXT,
    "highestQualification" TEXT,
    "teachingExperience" TEXT,
    "instituteExperience" TEXT,
    "recognizedAsResearchGuide" TEXT,
    "yearOfRecognition" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ProfessionalDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EducationalQualification" (
    "id" SERIAL NOT NULL,
    "degree" TEXT NOT NULL,
    "institute" TEXT NOT NULL,
    "yearOfCompletion" INTEGER NOT NULL,
    "professionalDetailsId" INTEGER,

    CONSTRAINT "EducationalQualification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProfessionalDetails_email_key" ON "ProfessionalDetails"("email");

-- AddForeignKey
ALTER TABLE "ProfessionalDetails" ADD CONSTRAINT "ProfessionalDetails_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EducationalQualification" ADD CONSTRAINT "EducationalQualification_professionalDetailsId_fkey" FOREIGN KEY ("professionalDetailsId") REFERENCES "ProfessionalDetails"("id") ON DELETE SET NULL ON UPDATE CASCADE;
