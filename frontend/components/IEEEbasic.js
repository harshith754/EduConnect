"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ImportPaperData } from "./ImportPaperData";
import { PublicationData } from "./PublicationData";
import { Spinner } from "./Spinner";

export const IEEEbasic = () => {
  const [authorId, setAuthorId] = useState("");
  const [data, setData] = useState(null);
  const [isLoadingAuthorInfo, setIsLoadingAuthorInfo] = useState(false);
  const [error, setError] = useState("");
  const [authorPapers, setAuthorPapers] = useState(null);
  const [isLoadingPapers, setIsLoadingPapers] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    const storedAuthorId = localStorage.getItem("ieeeAuthorId");

    if (storedAuthorId) {
      setAuthorId(storedAuthorId);
      fetchIEEEAuthorDetails();
    } else if (session?.user?.authorId) {
      setAuthorId(session.user.authorId);
      localStorage.setItem("ieeeAuthorId", session.user.authorId);
      fetchIEEEAuthorDetails();
    }
  }, [authorId]);

  const fetchIEEEAuthorDetails = async () => {
    if (!authorId || authorId.trim() === "") {
      setError("Please enter a valid Author ID");
      return;
    }
    try {
      setIsLoadingAuthorInfo(true);
      setError("");
      const response = await axios.get(`/api/ieee-author-details/${authorId}`);

      if (response.data.data && response.data.data.length > 0) {
        setData(response.data.data);
        setError("");
        localStorage.setItem("ieeeAuthorId", authorId);
      } else {
        setError("No author found with this ID");
        setData(null);
      }
    } catch (error) {
      console.error("Error fetching author details:", error);
      setError("Error fetching author details. Please check the Author ID.");
      setData(null);
    } finally {
      setIsLoadingAuthorInfo(false);
    }
  };

  const fetchIEEEAuthorPapers = async () => {
    if (!authorId || authorId.trim() === "") {
      setError("Please enter a valid Author ID");
      return;
    }
    try {
      setIsLoadingPapers(true);
      setError("");
      const response = await axios.post(`/api/ieee-paper-details/${authorId}`, {
        searchWithin: [`"Author Ids":${authorId}`],
        returnType: "SEARCH",
        history: "no",
        highlight: true,
        returnFacets: ["ALL"],
        sortType: "newest",
      });
      console.log(response.data.data);

      if (response.data.data) {
        setAuthorPapers(response.data.data);
        setError("");
      } else {
        setError("No papers found for this Author ID");
        setAuthorPapers(null);
      }
    } catch (error) {
      console.error("Error fetching author papers:", error);
      setError("Error fetching author papers. Please check the Author ID.");
      setAuthorPapers(null);
    } finally {
      setIsLoadingPapers(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Reset previous states
    setData(null);
    setAuthorPapers(null);
    setError("");

    // Perform simultaneous requests
    await Promise.all([fetchIEEEAuthorDetails()]);
  };

  return (
    <div className="max-w-4xl mx-auto w-full">
      <form
        onSubmit={handleSubmit}
        className="mb-2 flex items-center space-x-2"
      >
        <label htmlFor="ieee-id" className="text-xs font-medium text-gray-600">
          IEEE_ID:
        </label>

        <input
          id="ieee-id"
          type="text"
          value={authorId}
          onChange={(e) => setAuthorId(e.target.value)}
          placeholder="Enter IEEE Author ID"
          className="w-full px-2 py-1 border border-gray-300 rounded-l focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 text-xs"
        />

        <button
          type="submit"
          disabled={isLoadingAuthorInfo || isLoadingPapers}
          className="bg-blue-500 text-white px-3 py-1 text-xs rounded-r hover:bg-blue-600 disabled:bg-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-400"
        >
          {isLoadingAuthorInfo || isLoadingPapers ? "Searching..." : "Search"}
        </button>
      </form>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}
      {(isLoadingAuthorInfo || isLoadingPapers) && <Spinner />}
      {!isLoadingAuthorInfo && data && (
        <PublicationData data={data} showAuthor={false} />
      )}
    </div>
  );
};
