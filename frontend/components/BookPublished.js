import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";
import axios from "axios";
import { useSession } from "next-auth/react";
import { CldImage, CldUploadButton } from "next-cloudinary";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Spinner } from "./Spinner";

export const BookPublished = () => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const [books, setBooks] = useState([
    {
      ISBN: "",
      title: "",
      chapters: " ",
      publishers: "",
      coAuthors: "",
      yearOfPublication: "",
      dateOfPublication: "",
      fileId: "",
    },
  ]);

  const handleAddBook = () => {
    setBooks([
      ...books,
      {
        ISBN: "",
        title: "",
        chapters: " ",
        publishers: "",
        coAuthors: "",
        yearOfPublication: "",
        dateOfPublication: "",
        fileId: "",
      },
    ]);
  };

  const handleDeleteBook = (index) => {
    const updatedBooks = [...books];
    updatedBooks.splice(index, 1);
    setBooks(updatedBooks);
  };

  const handleBookChange = (index, field, value) => {
    const updatedBooks = [...books];
    updatedBooks[index][field] = value;
    setBooks(updatedBooks);
  };

  const [formEditable, setFormEditable] = useState(true);
  const getBookDetails = async () => {
    setIsLoading(true);

    try {
      const { data } = await axios.get(
        `/api/books-published/${session.user.email}`,
      );

      if (data.booksPublished === null) return;
      const reqData = data.booksPublished;
      console.log(reqData);
      const formattedBooks = reqData.books.map(({ id, ...rest }) => rest);
      setBooks(formattedBooks);
      setFormEditable(false);
      toast("Info loaded");
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getBookDetails();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Books submitted:", {
      email: session.user.email,
      books,
    });

    axios.post("/api/books-published", {
      email: session.user.email,
      books,
    });
    setFormEditable(false);
    // Add your logic for submitting the books data
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="flex flex-col px-6 py-3">
      <h2 className="text-lg font-bold mb-4">Book Information Form:</h2>
      <form className="flex flex-col gap-4">
        {books.map((book, index) => (
          <div key={index}>
            <Card className="flex flex-col w-[80%] ml-8">
              <CardHeader>
                <CardTitle>Book {index + 1}</CardTitle>
              </CardHeader>
              <CardContent>
                <Label>ISBN number:</Label>
                <Input
                  type="text"
                  placeholder="ISBN number"
                  value={book.ISBN}
                  onChange={(e) =>
                    handleBookChange(index, "ISBN", e.target.value)
                  }
                  disabled={!formEditable}
                  className={
                    "mb-2 disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
                  }
                />
                <Label>Title of the book:</Label>
                <Input
                  type="text"
                  placeholder="Title"
                  value={book.title}
                  onChange={(e) =>
                    handleBookChange(index, "title", e.target.value)
                  }
                  disabled={!formEditable}
                  className={
                    "mb-2 disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
                  }
                />
                <Label>Title of the Chapters:</Label>
                <Input
                  type="text"
                  placeholder="Chapters published"
                  value={book.chapters}
                  onChange={(e) =>
                    handleBookChange(index, "chapters", e.target.value)
                  }
                  disabled={!formEditable}
                  className={
                    "mb-2 disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
                  }
                />
                <Label>Name of co-authors:</Label>
                <Input
                  type="text"
                  placeholder="coAuthors"
                  value={book.coAuthors}
                  onChange={(e) =>
                    handleBookChange(index, "coAuthors", e.target.value)
                  }
                  disabled={!formEditable}
                  className={
                    "mb-2 disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
                  }
                />
                <Label>Publishers:</Label>
                <Input
                  type="text"
                  placeholder="publishers"
                  value={book.publishers}
                  onChange={(e) =>
                    handleBookChange(index, "publishers", e.target.value)
                  }
                  disabled={!formEditable}
                  className={
                    "mb-2 disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
                  }
                />
                <Label>Year of Publication:</Label>
                <Input
                  type="text"
                  placeholder="Year of Publication"
                  value={book.yearOfPublication}
                  onChange={(e) =>
                    handleBookChange(index, "yearOfPublication", e.target.value)
                  }
                  disabled={!formEditable}
                  className={
                    "mb-2 disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
                  }
                />
                <Label>Date of Publication:</Label>
                <Input
                  type="date"
                  placeholder="DD/MM/YYYY"
                  value={book.dateOfPublication}
                  onChange={(e) =>
                    handleBookChange(index, "dateOfPublication", e.target.value)
                  }
                  disabled={!formEditable}
                  className={
                    "mb-2 disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
                  }
                />

                <Label>File Upload:</Label>
                {book.fileId && book.fileId !== "" ? (
                  <>
                    <CldImage
                      width={250}
                      height={280}
                      crop="fill"
                      src={book.fileId}
                      alt="image"
                      className="rounded-lg flex flex-col box-border items-center justify-end"
                    />

                    {formEditable && (
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          handleBookChange(index, "fileId", "");
                        }}
                        className=" w-[300px] text-white py-2 px-4 rounded"
                      >
                        Edit File
                      </Button>
                    )}
                  </>
                ) : (
                  <>
                    <CldUploadButton
                      onUpload={(result) => {
                        handleBookChange(
                          index,
                          "fileId",
                          result.info.public_id,
                        );
                      }}
                      uploadPreset="artPage"
                      className="w-[80%] sm:w-[65%] text-gray-500 bg-white py-2 px-4 rounded-lg text-left mb-2"
                    >
                      Upload an Image
                    </CldUploadButton>
                  </>
                )}
              </CardContent>
              <CardFooter className="h-min">
                {formEditable && (
                  <Button
                    type="button"
                    onClick={() => handleDeleteBook(index)}
                    className="text-white w-[200px] mx-auto bg-red-500"
                  >
                    Delete
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        ))}

        {formEditable && (
          <>
            <Button
              type="button"
              onClick={handleAddBook}
              className="mx-auto bg-green-500  w-[500px] text-white py-2 px-4 rounded"
            >
              Add Book
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit}
              className="mx-auto w-[500px] text-white py-2 px-4 rounded"
            >
              Submit
            </Button>
          </>
        )}

        {!formEditable && (
          <Button
            className="mx-auto w-[300px] text-white py-2 px-4 rounded"
            onClick={() => setFormEditable(true)}
          >
            Edit Details
          </Button>
        )}
      </form>
    </div>
  );
};
