-- CreateTable
CREATE TABLE "BooksPublished" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "BooksPublished_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "publishers" TEXT,
    "yearOfPublication" TEXT,
    "dateOfPubication" TEXT,
    "booksPublishedId" INTEGER,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BooksPublished_email_key" ON "BooksPublished"("email");

-- AddForeignKey
ALTER TABLE "BooksPublished" ADD CONSTRAINT "BooksPublished_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_booksPublishedId_fkey" FOREIGN KEY ("booksPublishedId") REFERENCES "BooksPublished"("id") ON DELETE SET NULL ON UPDATE CASCADE;
