-- CreateTable
CREATE TABLE "PatentsRegistered" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "PatentsRegistered_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patent" (
    "id" SERIAL NOT NULL,
    "patentType" TEXT,
    "applicationNo" TEXT,
    "patentTitle" TEXT,
    "publicationDate" TEXT,
    "formFillingDate" TEXT,
    "authorList" TEXT,
    "publishedYear" TEXT,
    "patentsRegisteredId" INTEGER,

    CONSTRAINT "Patent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PatentsRegistered_email_key" ON "PatentsRegistered"("email");

-- AddForeignKey
ALTER TABLE "PatentsRegistered" ADD CONSTRAINT "PatentsRegistered_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patent" ADD CONSTRAINT "Patent_patentsRegisteredId_fkey" FOREIGN KEY ("patentsRegisteredId") REFERENCES "PatentsRegistered"("id") ON DELETE SET NULL ON UPDATE CASCADE;
