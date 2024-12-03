import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const authorId = params.authorId;
  try {
    const response = await axios.get(
      `https://ieeexplore.ieee.org/rest/author/${authorId}`,
      {
        headers: {
          Host: "ieeexplore.ieee.org",
          Referer: `https://ieeexplore.ieee.org/author/${authorId}`,
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:133.0) Gecko/20100101 Firefox/133.0",
          Accept: "application/json, text/plain, */*",
          "Accept-Language": "en-US,en;q=0.5",
          "X-Security-Request": "required",
        },
      },
    );

    // Only pass the data you need
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
