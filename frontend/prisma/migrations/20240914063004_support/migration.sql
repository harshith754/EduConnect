-- CreateTable
CREATE TABLE "FinancialSupport" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "FinancialSupport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Support" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "dateFrom" TEXT,
    "dateTo" TEXT,
    "membershipFee" TEXT,
    "travelExpenses" TEXT,
    "registrationFee" TEXT,
    "certificate" TEXT,
    "financialSupportId" INTEGER,

    CONSTRAINT "Support_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FinancialSupport_email_key" ON "FinancialSupport"("email");

-- AddForeignKey
ALTER TABLE "FinancialSupport" ADD CONSTRAINT "FinancialSupport_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Support" ADD CONSTRAINT "Support_financialSupportId_fkey" FOREIGN KEY ("financialSupportId") REFERENCES "FinancialSupport"("id") ON DELETE SET NULL ON UPDATE CASCADE;
