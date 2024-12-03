import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import axios from "axios";

export const ImportPaperData = ({ data }) => {
  const { data: session } = useSession();

  const transformPublicationData = (data) => {
    return data.records.map((record) => ({
      title: record.articleTitle || "",
      authors:
        record.authors.map((author) => author.preferredName).join(", ") || "",
      yearOfPublication: record.publicationYear || "",
      dateOfPublication: record.publicationDate || "",
      linkToArticle: record.publicationLink || "",
      numberOfCitations: record.citationCount?.toString() || "0",
      isConference: record.isConference,
      isJournal: record.isJournal,
      isBook: record.isBook,
      abstract: record.abstract || "",
    }));
  };

  // Usage
  const shortendedPublications = transformPublicationData(data);
  console.log(shortendedPublications);

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const formattedPapers = shortendedPublications.map((paper) => ({
        title: paper.title || "",
        authors: paper.authors || "",
        yearOfPublication: paper.yearOfPublication || "",
        dateOfPublication: paper.dateOfPublication || "",
        linkToArticle: paper.linkToArticle || "",
        numberOfCitations: paper.numberOfCitations || "",
        isConference: paper.isConference,
        isJournal: paper.isJournal,
        isBook: paper.isBook,
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

      toast("Succesfully imported papers");
    } catch (e) {
      toast("Error " + e);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div>
        <h1 className="text-2xl font-bold mb-6">Imported Publications</h1>
        <Button onClick={handleSubmit}> Store to database </Button>
      </div>

      {shortendedPublications.map((publication, index) => (
        <Card key={index} className="mb-4">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl">{publication.title}</CardTitle>
              <div className="space-x-2">
                {publication.isConference && (
                  <Badge variant="outline">Conference</Badge>
                )}
                {publication.isJournal && (
                  <Badge variant="outline">Journal</Badge>
                )}
                {publication.isBook && <Badge variant="outline">Book</Badge>}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                <strong>Authors:</strong> {publication.authors}
              </p>
              <p>
                <strong>Publication Year:</strong>{" "}
                {publication.yearOfPublication}
              </p>
              <p>
                <strong>Publication Date:</strong>{" "}
                {publication.dateOfPublication}
              </p>
              <p>
                <strong>Citations:</strong> {publication.numberOfCitations}
              </p>

              {publication.abstract && (
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Abstract:</h3>
                  <p className="text-gray-600 italic">{publication.abstract}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
