-- CreateTable
CREATE TABLE "PapersPublished" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "PapersPublished_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Paper" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "authors" TEXT,
    "yearOfPublication" TEXT,
    "linkToArticle" TEXT,
    "papersPublishedId" INTEGER,

    CONSTRAINT "Paper_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PapersPublished_email_key" ON "PapersPublished"("email");

-- AddForeignKey
ALTER TABLE "PapersPublished" ADD CONSTRAINT "PapersPublished_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paper" ADD CONSTRAINT "Paper_papersPublishedId_fkey" FOREIGN KEY ("papersPublishedId") REFERENCES "PapersPublished"("id") ON DELETE SET NULL ON UPDATE CASCADE;
