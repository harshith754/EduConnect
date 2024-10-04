-- CreateTable
CREATE TABLE "CommitteeDetails" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "CommitteeDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Committee" (
    "id" SERIAL NOT NULL,
    "committeeName" TEXT,
    "durationOfService" TEXT,
    "proof" TEXT,
    "responsibilities" TEXT,
    "roleOrPosition" TEXT,
    "committeeDetailsId" INTEGER,

    CONSTRAINT "Committee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityDetails" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "ActivityDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "achievements" TEXT,
    "activityName" TEXT,
    "certificate" TEXT,
    "duration" TEXT,
    "impact" TEXT,
    "roleOrPosition" TEXT,
    "activityDetailsId" INTEGER,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingRevenues" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "TrainingRevenues_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Revenue" (
    "id" SERIAL NOT NULL,
    "amount" TEXT,
    "certificateProof" TEXT,
    "dates" TEXT,
    "name" TEXT,
    "organization" TEXT,
    "trainingRevenuesId" INTEGER,

    CONSTRAINT "Revenue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CommitteeDetails_email_key" ON "CommitteeDetails"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ActivityDetails_email_key" ON "ActivityDetails"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TrainingRevenues_email_key" ON "TrainingRevenues"("email");

-- AddForeignKey
ALTER TABLE "CommitteeDetails" ADD CONSTRAINT "CommitteeDetails_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Committee" ADD CONSTRAINT "Committee_committeeDetailsId_fkey" FOREIGN KEY ("committeeDetailsId") REFERENCES "CommitteeDetails"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityDetails" ADD CONSTRAINT "ActivityDetails_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_activityDetailsId_fkey" FOREIGN KEY ("activityDetailsId") REFERENCES "ActivityDetails"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingRevenues" ADD CONSTRAINT "TrainingRevenues_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Revenue" ADD CONSTRAINT "Revenue_trainingRevenuesId_fkey" FOREIGN KEY ("trainingRevenuesId") REFERENCES "TrainingRevenues"("id") ON DELETE SET NULL ON UPDATE CASCADE;
