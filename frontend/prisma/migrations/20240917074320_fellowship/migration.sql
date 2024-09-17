-- CreateTable
CREATE TABLE "FellowshipSupport" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "FellowshipSupport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fellowship" (
    "id" SERIAL NOT NULL,
    "nameOfFellowship" TEXT,
    "financialSupport" TEXT,
    "purposeOfGrant" TEXT,
    "statureOfFellowship" TEXT,
    "awardingAgency" TEXT,
    "dateOfAward" TEXT,
    "certificate" TEXT,
    "fellowshipSupportId" INTEGER,

    CONSTRAINT "Fellowship_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FellowshipSupport_email_key" ON "FellowshipSupport"("email");

-- AddForeignKey
ALTER TABLE "FellowshipSupport" ADD CONSTRAINT "FellowshipSupport_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fellowship" ADD CONSTRAINT "Fellowship_fellowshipSupportId_fkey" FOREIGN KEY ("fellowshipSupportId") REFERENCES "FellowshipSupport"("id") ON DELETE SET NULL ON UPDATE CASCADE;
