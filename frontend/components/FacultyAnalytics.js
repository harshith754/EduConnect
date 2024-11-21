import React, { useEffect, useState } from "react";

import { DepartmentDistribution } from "@/charts/DepartmentDistribution";
import { QualificationDistribution } from "@/charts/QualificationDistribution";
import PublicationsAndResearch from "@/charts/PublicationsAndResearch";
import { useSession } from "next-auth/react";

const facultyData = [
  {
    name: "Dr. A. Sharma",
    department: "Computer Engineering",
    qualification: "PhD",
    gender: "Male",
    age: 45,
    teachingExperience: 20,
    bookChapters: 12,
    researchPapers: 25,
    awards: 5,
  },
  {
    name: "Dr. B. Verma",
    department: "Data Science",
    qualification: "PhD",
    gender: "Female",
    age: 39,
    teachingExperience: 15,
    bookChapters: 8,
    researchPapers: 18,
    awards: 3,
  },
  {
    name: "Prof. C. Kumar",
    department: "Electronics",
    qualification: "MTech",
    gender: "Male",
    age: 50,
    teachingExperience: 25,
    bookChapters: 5,
    researchPapers: 30,
    awards: 6,
  },
  {
    name: "Dr. D. Patel",
    department: "Computer Engineering",
    qualification: "PhD",
    gender: "Female",
    age: 42,
    teachingExperience: 18,
    bookChapters: 9,
    researchPapers: 22,
    awards: 4,
  },
  {
    name: "Prof. E. Rao",
    department: "Data Science",
    qualification: "MCA",
    gender: "Male",
    age: 35,
    teachingExperience: 12,
    bookChapters: 6,
    researchPapers: 15,
    awards: 2,
  },
  {
    name: "Dr. F. Nair",
    department: "Electronics",
    qualification: "PhD",
    gender: "Female",
    age: 48,
    teachingExperience: 22,
    bookChapters: 7,
    researchPapers: 28,
    awards: 5,
  },
  // {
  //   name: "Prof. G. Singh",
  //   department: "Computer Engineering",
  //   qualification: "MCA",
  //   gender: "Male",
  //   age: 38,
  //   teachingExperience: 14,
  //   bookChapters: 3,
  //   researchPapers: 17,
  //   awards: 1,
  // },
  // {
  //   name: "Dr. H. Mehta",
  //   department: "Data Science",
  //   qualification: "PhD",
  //   gender: "Female",
  //   age: 44,
  //   teachingExperience: 19,
  //   bookChapters: 10,
  //   researchPapers: 21,
  //   awards: 3,
  // },
  // {
  //   name: "Prof. I. Yadav",
  //   department: "Electronics",
  //   qualification: "MTech",
  //   gender: "Male",
  //   age: 46,
  //   teachingExperience: 20,
  //   bookChapters: 4,
  //   researchPapers: 26,
  //   awards: 4,
  // },
  // {
  //   name: "Dr. J. Agarwal",
  //   department: "Computer Engineering",
  //   qualification: "PhD",
  //   gender: "Female",
  //   age: 41,
  //   teachingExperience: 16,
  //   bookChapters: 11,
  //   researchPapers: 19,
  //   awards: 2,
  // },
  // {
  //   name: "Prof. K. Desai",
  //   department: "Data Science",
  //   qualification: "MTech",
  //   gender: "Male",
  //   age: 36,
  //   teachingExperience: 11,
  //   bookChapters: 7,
  //   researchPapers: 14,
  //   awards: 1,
  // },
  // {
  //   name: "Dr. L. Gupta",
  //   department: "Electronics",
  //   qualification: "PhD",
  //   gender: "Female",
  //   age: 49,
  //   teachingExperience: 24,
  //   bookChapters: 5,
  //   researchPapers: 27,
  //   awards: 6,
  // },
  // {
  //   name: "Prof. M. Khanna",
  //   department: "Computer Engineering",
  //   qualification: "MTech",
  //   gender: "Male",
  //   age: 37,
  //   teachingExperience: 13,
  //   bookChapters: 2,
  //   researchPapers: 18,
  //   awards: 2,
  // },
  // {
  //   name: "Dr. N. Bose",
  //   department: "Data Science",
  //   qualification: "PhD",
  //   gender: "Female",
  //   age: 43,
  //   teachingExperience: 17,
  //   bookChapters: 9,
  //   researchPapers: 20,
  //   awards: 3,
  // },
  // {
  //   name: "Prof. O. Jain",
  //   department: "Electronics",
  //   qualification: "MTech",
  //   gender: "Male",
  //   age: 47,
  //   teachingExperience: 21,
  //   bookChapters: 6,
  //   researchPapers: 25,
  //   awards: 4,
  // },
  // {
  //   name: "Dr. P. Reddy",
  //   department: "AIML",
  //   qualification: "PhD",
  //   gender: "Female",
  //   age: 40,
  //   teachingExperience: 15,
  //   bookChapters: 8,
  //   researchPapers: 23,
  //   awards: 5,
  // },
  // {
  //   name: "Prof. Q. Kapoor",
  //   department: "Data Science",
  //   qualification: "MCA",
  //   gender: "Male",
  //   age: 34,
  //   teachingExperience: 10,
  //   bookChapters: 7,
  //   researchPapers: 16,
  //   awards: 2,
  // },
  // {
  //   name: "Dr. R. Pillai",
  //   department: "AIML",
  //   qualification: "PhD",
  //   gender: "Female",
  //   age: 46,
  //   teachingExperience: 23,
  //   bookChapters: 5,
  //   researchPapers: 29,
  //   awards: 6,
  // },
  // {
  //   name: "Prof. S. Tiwari",
  //   department: "Computer Engineering",
  //   qualification: "MCA",
  //   gender: "Male",
  //   age: 39,
  //   teachingExperience: 14,
  //   bookChapters: 3,
  //   researchPapers: 20,
  //   awards: 3,
  // },
  // {
  //   name: "Dr. T. Bhatt",
  //   department: "AIML",
  //   qualification: "PhD",
  //   gender: "Female",
  //   age: 42,
  //   teachingExperience: 18,
  //   bookChapters: 9,
  //   researchPapers: 22,
  //   awards: 4,
  // },
];

export const FacultyAnalytics = () => {
  const { data: session } = useSession();

  if (session?.user?.role !== "admin") {
    return <div>Only accessable to admins.</div>;
  }
  return (
    <div className="flex flex-col px-6 py-3 gap-5">
      <div className="w-full flex flex-row gap-2 ">
        <div className="w-1/2">
          <DepartmentDistribution />
        </div>
        <div className="w-1/2">
          <QualificationDistribution />
        </div>
      </div>

      <div>
        <PublicationsAndResearch />
      </div>
    </div>
  );
};
