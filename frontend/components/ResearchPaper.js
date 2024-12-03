import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import axios from "axios";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Spinner } from "./Spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const ResearchAndPublications = () => {
  const { data: session } = useSession();
  const [formEditable, setFormEditable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [researchPapers, setResearchPapers] = useState([
    {
      title: "",
      authors: "",
      yearOfPublication: "",
      dateOfPublication: "",
      linkToArticle: "",
      publicationType: "", // Add a single field to replace multiple boolean flags
      numberOfCitations: "",
      abstract: "",
    },
  ]);

  const dummy = [
    {
      abstract:
        "Transverse flux machines (TFMs) are complex in construction and have a three dimensional flux path. Therefore, three dimensional (3D) finite element method (FEM) is usually used for the electromagnetic analysis of TFMs. Though the 3D-FEM technique is very accurate, computational time is very high. In the initial design and optimization process, fast and reasonably accurate analytical techniques ar...",
      authors: "Priyanka Golatgaonkar, Rajaram Ugale, Bhalchandra Chaudhari",
      dateOfPublication: "20-22 July 2022",
      isBook: false,
      isConference: true,
      isJournal: false,
      linkToArticle: "/xpl/conhome/9872524/proceeding",
      numberOfCitations: "0",
      title:
        "Modification in Method of Images for Three Dimensional Magnetic Field Analysis of a Transverse Flux Permanent Magnet Machine",
      yearOfPublication: "2022",
    },
  ];

  // Function to add a new research paper section
  const handleAddResearchPaper = () => {
    setResearchPapers([
      ...researchPapers,
      {
        title: "",
        authors: "",
        yearOfPublication: "",
        dateOfPublication: "",
        linkToArticle: "",
        publicationType: "", // Add a single field to replace multiple boolean flags
        numberOfCitations: "",
        abstract: "",
      },
    ]);
  };

  // Function to update research paper details
  const handleResearchPaperChange = (index, field, value) => {
    const updatedResearchPapers = [...researchPapers];
    updatedResearchPapers[index][field] = value;
    setResearchPapers(updatedResearchPapers);
  };

  const handleDeleteResearchPaper = (index) => {
    const updatedResearchPapers = [...researchPapers];
    updatedResearchPapers.splice(index, 1);
    setResearchPapers(updatedResearchPapers);
    console.log(updatedResearchPapers); // This logs the updated list
  };

  useEffect(() => {
    getResearchPapers();
  }, []);

  const getResearchPapers = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `/api/papers-published/${session.user.email}`,
      );
      const reqData = data.papersPublished;
      const formattedPapers = reqData.papers.map((paper) => ({
        title: paper.title || "",
        authors: paper.authors || "",
        yearOfPublication: paper.yearOfPublication || "",
        dateOfPublication: paper.dateOfPublication || "",
        linkToArticle: paper.linkToArticle || "",
        numberOfCitations: paper.numberOfCitations || "",
        abstract: paper.abstract || "",
        publicationType: paper.isConference
          ? "conference"
          : paper.isJournal
            ? "journal"
            : paper.isBook
              ? "book"
              : "other",
      }));
      setResearchPapers(formattedPapers);
      setFormEditable(false);
      toast("Info loaded");
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedPapers = researchPapers.map((paper) => ({
      title: paper.title || "",
      authors: paper.authors || "",
      yearOfPublication: paper.yearOfPublication || "",
      dateOfPublication: paper.dateOfPublication || "",
      linkToArticle: paper.linkToArticle || "",
      numberOfCitations: paper.numberOfCitations || "",
      isConference: paper.publicationType === "conference",
      isJournal: paper.publicationType === "journal",
      isBook: paper.publicationType === "book",
      abstract: paper.abstract || "",
    }));

    console.log("Papers submitted:", {
      email: session.user.email,
      formattedPapers,
    });

    axios.post("/api/papers-published", {
      email: session.user.email,
      researchPapers: formattedPapers,
    });
    setFormEditable(false);
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="flex flex-col px-6 py-3">
      <h2 className="text-lg font-bold mb-4">Research Papers Form</h2>

      <form className="flex flex-col gap-4">
        {researchPapers.map((paper, index) => (
          <div key={index}>
            <Card className="flex flex-col w-[80%] ml-8">
              <CardHeader>
                <CardTitle>Research Paper {index + 1}</CardTitle>
              </CardHeader>
              <CardContent>
                <Label>Title of the Paper:</Label>
                <Input
                  type="text"
                  placeholder="Title of the Paper"
                  value={paper.title}
                  onChange={(e) =>
                    handleResearchPaperChange(index, "title", e.target.value)
                  }
                  disabled={!formEditable}
                  className={
                    "mb-2 disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
                  }
                />

                <Label>Abstract:</Label>
                <Input
                  type="text"
                  placeholder="Enter the abstract"
                  value={paper.abstract}
                  onChange={(e) =>
                    handleResearchPaperChange(index, "abstract", e.target.value)
                  }
                  disabled={!formEditable}
                  className={
                    "mb-2 disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
                  }
                />

                <Label>Name of the Author/s:</Label>
                <Input
                  type="text"
                  placeholder="Name of the Author/s"
                  value={paper.authors}
                  onChange={(e) =>
                    handleResearchPaperChange(index, "authors", e.target.value)
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
                  value={paper.yearOfPublication}
                  onChange={(e) =>
                    handleResearchPaperChange(
                      index,
                      "yearOfPublication",
                      e.target.value,
                    )
                  }
                  disabled={!formEditable}
                  className={
                    "mb-2 disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
                  }
                />

                <Label>Date of Publication:</Label>
                <Input
                  type="text"
                  placeholder="DD/MM/YYYY"
                  value={paper.dateOfPublication}
                  onChange={(e) =>
                    handleResearchPaperChange(
                      index,
                      "dateOfPublication",
                      e.target.value,
                    )
                  }
                  disabled={!formEditable}
                  className={
                    "mb-2 disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
                  }
                />

                <Label>Link to Article/Paper/Abstract of the Article:</Label>
                <Input
                  type="text"
                  placeholder="Link to Article/Paper/Abstract of the Article"
                  value={paper.linkToArticle}
                  onChange={(e) =>
                    handleResearchPaperChange(
                      index,
                      "linkToArticle",
                      e.target.value,
                    )
                  }
                  disabled={!formEditable}
                  className={
                    "mb-2 disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
                  }
                />

                <Label>Publication Type:</Label>
                <Select
                  value={paper.publicationType}
                  onValueChange={(value) =>
                    handleResearchPaperChange(index, "publicationType", value)
                  }
                  disabled={!formEditable}
                >
                  <SelectTrigger
                    className={`w-full ${!formEditable ? "disabled:bg-gray-300 disabled:text-black disabled:opacity-100" : ""}`}
                  >
                    <SelectValue placeholder="Select Publication Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="journal">Journal</SelectItem>
                    <SelectItem value="conference">Conference</SelectItem>
                    <SelectItem value="book">Book</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>

                <Label>Number of Citations:</Label>
                <Input
                  type="text"
                  placeholder="Enter number of citations(current)"
                  value={paper.numberOfCitations}
                  onChange={(e) =>
                    handleResearchPaperChange(
                      index,
                      "numberOfCitations",
                      e.target.value,
                    )
                  }
                  disabled={!formEditable}
                  className={
                    "mb-2 disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
                  }
                />
              </CardContent>
              <CardFooter>
                {formEditable && (
                  <Button
                    type="button"
                    onClick={() => handleDeleteResearchPaper(index)}
                    className="text-white w-[200px] mx-auto bg-red-500 mb-3"
                  >
                    Delete Research Paper
                  </Button>
                )}{" "}
              </CardFooter>
            </Card>
          </div>
        ))}

        {formEditable && (
          <>
            <Button
              type="button"
              onClick={handleAddResearchPaper}
              className="mx-auto bg-green-500  w-[500px] text-white py-2 px-4 rounded"
            >
              Add Research Paper
            </Button>

            <Button
              type="submit"
              className="mx-auto w-[500px] text-white py-2 px-4 rounded"
              onClick={handleSubmit}
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

export default ResearchAndPublications;
