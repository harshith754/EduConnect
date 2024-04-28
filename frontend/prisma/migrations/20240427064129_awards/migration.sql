-- CreateTable
CREATE TABLE "AwardsReceived" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "AwardsReceived_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Award" (
    "id" SERIAL NOT NULL,
    "awardName" TEXT,
    "agencyName" TEXT,
    "agencyEmail" TEXT,
    "agencyAddress" TEXT,
    "yearReceived" TEXT,
    "hasFellowship" TEXT,
    "awardsReceivedId" INTEGER,

    CONSTRAINT "Award_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AwardsReceived_email_key" ON "AwardsReceived"("email");

-- AddForeignKey
ALTER TABLE "AwardsReceived" ADD CONSTRAINT "AwardsReceived_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Award" ADD CONSTRAINT "Award_awardsReceivedId_fkey" FOREIGN KEY ("awardsReceivedId") REFERENCES "AwardsReceived"("id") ON DELETE SET NULL ON UPDATE CASCADE;
