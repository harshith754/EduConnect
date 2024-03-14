import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
const ResearchAndPublications = () => {
  const [researchPapers, setResearchPapers] = useState([
    {
      title: "",
      authors: "",
      yearOfPublication: "",
      linkToArticle: "",
    },
  ]);

  // Function to add a new research paper section
  const handleAddResearchPaper = () => {
    setResearchPapers([
      ...researchPapers,
      {
        title: "",
        authors: "",
        yearOfPublication: "",
        linkToArticle: "",
      },
    ]);
  };

  // Function to update research paper details
  const handleResearchPaperChange = (index, field, value) => {
    const updatedResearchPapers = [...researchPapers];
    updatedResearchPapers[index][field] = value;
    setResearchPapers(updatedResearchPapers);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Add your logic for form submission here
    console.log("Research Papers submitted:", researchPapers);
  };

  return (
    <div className="flex flex-col px-6 py-3">
      <h2 className="text-lg font-bold mb-4">Research Papers Form</h2>
      <form onSubmit={handleSubmit} className="flex flex-col divide-y ">
        {researchPapers.map((paper, index) => (
          <div key={index} className="flex flex-col gap-2 w-[80%] mx-auto py-2">
            <h3 className="text-lg font-bold mb-2">
              Research Paper {index + 1}
            </h3>
            <Input
              type="text"
              placeholder="Title of the Paper"
              value={paper.title}
              onChange={(e) =>
                handleResearchPaperChange(index, "title", e.target.value)
              }
            />
            <Input
              type="text"
              placeholder="Name of the Author/s"
              value={paper.authors}
              onChange={(e) =>
                handleResearchPaperChange(index, "authors", e.target.value)
              }
            />
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
            />
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
            />
          </div>
        ))}

        <Button
          type="button"
          onClick={handleAddResearchPaper}
          className="bg-green-500 text-white py-2 px-4 rounded"
        >
          Add Research Paper
        </Button>

        <Button
          type="submit"
          className="mx-auto w-[300px] text-white py-2 px-4 rounded"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ResearchAndPublications;
