import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  const authorId = params.authorId;

  try {
    // Parse the request body to allow potential additional parameters
    const reqBody = await req.json();

    // Perform the axios POST request to IEEE Xplore
    const response = await axios.post(
      "https://ieeexplore.ieee.org/rest/search",
      {
        searchWithin: [`"Author Ids":${authorId}`],
        history: "no",
        highlight: true,
        returnFacets: ["ALL"],
        returnType: "SEARCH",
        sortType: "newest",
        ...reqBody, // Allow overriding or adding additional parameters
      },
      {
        headers: {
          Host: "ieeexplore.ieee.org",
          Referer: `https://ieeexplore.ieee.org/author/${authorId}`,
          "Content-Type": "application/json",
          "Accept-Encoding": "gzip, deflate, br, zstd",
          Origin: "https://ieeexplore.ieee.org",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:133.0) Gecko/20100101 Firefox/133.0",
          "X-Security-Request": "required",
          "Accept-Language": "en-US,en;q=0.5",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-origin",
        },
      },
    );
    // console.log(response.data);
    // Return successful response
    return NextResponse.json(
      {
        data: response.data,
        status: response.status,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching IEEE author details:", error);
    return NextResponse.json(
      {
        message: "An error occurred while fetching author details",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
