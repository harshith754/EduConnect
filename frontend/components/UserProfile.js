import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CldImage } from "next-cloudinary";

import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import ProfileDownload from "./ProfileDownload";
import { Spinner } from "./Spinner";

export const UserProfile = ({ userEmail = "" }) => {
  const { data: session } = useSession();

  const [facultyDetails, setFacultyDetails] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [showCards, setShowCards] = useState({
    personalInfo: true,
    professionalDetails: true,
    booksPublished: true,
    patentsRegistered: true,
    appreciationAndAwards: true,
    lecturesDelivered: true,
    researchPaper: true,
    financialSupport: true,
    fellowships: true,
    committeeDetails: true,
    activityDetails: true,
    trainingRevenues: true,
  });
  const toggleShowCard = (cardName) => {
    setShowCards((prev) => ({
      ...prev,
      [cardName]: !prev[cardName],
    }));
  };

  const getPersonalDetails = async () => {
    if (session === undefined) return;
    setIsLoading(true);

    if (userEmail != "") {
      const { data } = await axios.get(`/api/faculty-details/${userEmail}`);

      setFacultyDetails(data.facultyDetails);
    } else {
      const { data } = await axios.get(
        `/api/faculty-details/${session.user.email}`,
      );

      setFacultyDetails(data.facultyDetails);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getPersonalDetails();
  }, [session]);

  async function handlePrint() {
    const html2pdf = await require("html2pdf.js");
    const element = document.querySelector("#faculty-profile");
    html2pdf(element, {
      margin: [0.5, 0.25], // [top, right, bottom, left] in inches
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] },
      filename: `${session?.user.name}'s Profile.pdf`,
    });
  }
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div
      className="flex flex-col px-6 py-3 items-center justify-center"
      id="faculty-profile"
    >
      <h2 className="text-lg font-bold mb-4 ">
        {facultyDetails?.personalDetails?.fullName}'s Faculty Profile
        <Button
          onClick={() => {
            setShowCards({
              personalInfo: true,
              professionalDetails: true,
              booksPublished: true,
              patentsRegistered: true,
              appreciationAndAwards: true,
              lecturesDelivered: true,
              researchPaper: true,
              financialSupport: true,
              fellowships: true,
              committeeDetails: true,
              activityDetails: true,
              trainingRevenues: true,
            });
          }}
          className="text-white ml-3"
          data-html2canvas-ignore
        >
          Reset Selections
        </Button>
      </h2>

      {/* <div className=" w-[60%] bg-gray-400">
        {JSON.stringify(facultyDetails)}
      </div> */}

      <div className="space-y-6 ">
        <Card
          className={`mt-3 ${!showCards.personalInfo ? "hidden" : ""}`}
          {...(!showCards.personalInfo && { "data-html2canvas-ignore": true })}
        >
          <CardHeader className="flex flex-row items-center gap-10">
            <CardTitle>Personal Information</CardTitle>
            <Checkbox
              checked={showCards.personalInfo}
              onCheckedChange={() => toggleShowCard("personalInfo")}
              data-html2canvas-ignore
            />
          </CardHeader>
          <CardContent>
            <div className="flex flex-row gap-x-[30%] px-5">
              <div className="flex flex-wrap gap-x-5 ">
                <div>
                  <strong>Full Name:</strong>{" "}
                  {facultyDetails.personalDetails?.fullName}
                </div>
                <div>
                  <strong>Gender:</strong>{" "}
                  {facultyDetails.personalDetails?.gender}
                </div>
                <div>
                  <strong>Date of Birth:</strong>{" "}
                  {facultyDetails.personalDetails?.dateOfBirth}
                </div>
                <div>
                  <strong>Email:</strong>{" "}
                  {facultyDetails.personalDetails?.email}
                </div>
                <div>
                  <strong>Mobile Number:</strong>{" "}
                  {facultyDetails.personalDetails?.mobileNumber}
                </div>
                <div>
                  <strong>Aadhar Details:</strong>{" "}
                  {facultyDetails.personalDetails?.aadharDetails}
                </div>
                <div>
                  <strong>Faculty ID:</strong>{" "}
                  {facultyDetails.personalDetails?.facultyId}
                </div>
                <div>
                  <strong>Blood Group:</strong>{" "}
                  {facultyDetails.personalDetails?.bloodGroup}
                </div>
              </div>
              <div>
                {facultyDetails.personalDetails?.imageId && (
                  <CldImage
                    width={250}
                    height={280}
                    crop="fill"
                    src={facultyDetails.personalDetails?.imageId}
                    alt="image"
                    className="rounded-lg flex flex-col box-border items-center justify-end"
                  />
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          {...(!showCards.professionalDetails && {
            "data-html2canvas-ignore": true,
          })}
          className={`mt-3 ${!showCards.professionalDetails ? "hidden" : ""}`}
        >
          <CardHeader className="flex flex-row items-center gap-10">
            <CardTitle>Professional Details</CardTitle>
            <Checkbox
              checked={showCards.professionalDetails}
              onCheckedChange={() => toggleShowCard("professionalDetails")}
              data-html2canvas-ignore
            />
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-x-3">
              <div>
                <strong>Department:</strong>{" "}
                {facultyDetails.professionalDetails?.department}
              </div>
              <div>
                <strong>Designation:</strong>{" "}
                {facultyDetails.professionalDetails?.designation}
              </div>
              <div>
                <strong>Date of Joining:</strong>{" "}
                {facultyDetails.professionalDetails?.dateOfJoining}
              </div>
              <div>
                <strong>Highest Qualification:</strong>{" "}
                {facultyDetails.professionalDetails?.highestQualification}
              </div>
              <div>
                <strong>Teaching Experience:</strong>{" "}
                {facultyDetails.professionalDetails?.teachingExperience} years
              </div>
              <div>
                <strong>Institute Experience:</strong>{" "}
                {facultyDetails.professionalDetails?.instituteExperience} years
              </div>
            </div>
            <div className="rounded-xl shadow-xl">
              <Table>
                <TableCaption>Educational Qualifications</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Degree</TableHead>
                    <TableHead>Institute</TableHead>
                    <TableHead>Year of Completion</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {facultyDetails.professionalDetails?.educationalQualifications.map(
                    (qual) => (
                      <TableRow key={qual.id}>
                        <TableCell className="font-medium">
                          {qual.degree}
                        </TableCell>
                        <TableCell>{qual.institute}</TableCell>
                        <TableCell>{qual.yearOfCompletion}</TableCell>
                      </TableRow>
                    ),
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card
          {...(!showCards.booksPublished && {
            "data-html2canvas-ignore": true,
          })}
          className={`mt-3 ${!showCards.booksPublished ? "hidden" : ""}`}
        >
          <CardHeader className="flex flex-row items-center gap-10">
            <CardTitle>Books Published</CardTitle>
            <Checkbox
              checked={showCards.booksPublished}
              onCheckedChange={() => toggleShowCard("booksPublished")}
              data-html2canvas-ignore
            />
          </CardHeader>
          <CardContent>
            <div className="rounded-xl shadow-xl">
              <Table>
                <TableCaption>Details of Books Published</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Publishers</TableHead>
                    <TableHead>Year of Publication</TableHead>
                    <TableHead>ISBN</TableHead>
                    <TableHead>Chapters</TableHead>
                    <TableHead>Co-Authors</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {facultyDetails.booksPublished?.books.map((book) => (
                    <TableRow key={book.id}>
                      <TableCell className="font-medium">
                        {book.title}
                      </TableCell>
                      <TableCell>{book.publishers}</TableCell>
                      <TableCell>{book.yearOfPublication}</TableCell>
                      <TableCell>{book.ISBN}</TableCell>
                      <TableCell>{book.chapters}</TableCell>
                      <TableCell>{book.coAuthors}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        <Card
          {...(!showCards.patentsRegistered && {
            "data-html2canvas-ignore": true,
          })}
          className={`mt-3 ${!showCards.patentsRegistered ? "hidden" : ""}`}
        >
          <CardHeader className="flex flex-row items-center gap-10">
            <CardTitle>Patents Registered</CardTitle>
            <Checkbox
              checked={showCards.patentsRegistered}
              onCheckedChange={() => toggleShowCard("patentsRegistered")}
              data-html2canvas-ignore
            />
          </CardHeader>
          <CardContent>
            <div className="rounded-xl shadow-xl">
              <Table>
                <TableCaption>Patents Registered</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patent Title</TableHead>
                    <TableHead>Application No</TableHead>
                    <TableHead>Publication Date</TableHead>
                    <TableHead>Authors</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {facultyDetails.patentsRegistered?.patents.map((patent) => (
                    <TableRow key={patent.id}>
                      <TableCell className="font-medium">
                        {patent.patentTitle}
                      </TableCell>
                      <TableCell>{patent.applicationNo}</TableCell>
                      <TableCell>{patent.publicationDate}</TableCell>
                      <TableCell>{patent.authorList}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        <Card
          {...(!showCards.appreciationAndAwards && {
            "data-html2canvas-ignore": true,
          })}
          className={`mt-3 ${!showCards.appreciationAndAwards ? "hidden" : ""}`}
        >
          <CardHeader className="flex flex-row items-center gap-10">
            <CardTitle>Appreciation and Awards</CardTitle>
            <Checkbox
              checked={showCards.appreciationAndAwards}
              onCheckedChange={() => toggleShowCard("appreciationAndAwards")}
              data-html2canvas-ignore
            />
          </CardHeader>
          <CardContent>
            <div className="rounded-xl shadow-xl">
              <Table>
                <TableCaption>Awards Received</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Award Name</TableHead>
                    <TableHead>Agency Name</TableHead>
                    <TableHead>Year Received</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {facultyDetails.awardsReceived?.awards.map((award) => (
                    <TableRow key={award.id}>
                      <TableCell className="font-medium">
                        {award.awardName}
                      </TableCell>
                      <TableCell>{award.agencyName}</TableCell>
                      <TableCell>{award.yearReceived}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card
          {...(!showCards.lecturesDelivered && {
            "data-html2canvas-ignore": true,
          })}
          className={`mt-3 ${!showCards.lecturesDelivered ? "hidden" : ""}`}
        >
          <CardHeader className="flex flex-row items-center gap-10">
            <CardTitle>Guest Lecture/Expert Lecture Delivered</CardTitle>
            <Checkbox
              checked={showCards.lecturesDelivered}
              onCheckedChange={() => toggleShowCard("lecturesDelivered")}
              data-html2canvas-ignore
            />
          </CardHeader>
          <CardContent>
            <div className="rounded-xl shadow-xl">
              <Table>
                <TableCaption>Lectures Delivered</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Date Delivered</TableHead>
                    <TableHead>Venue</TableHead>
                    <TableHead>Audience</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {facultyDetails.lecturesDelivered?.lectures.map((lecture) => (
                    <TableRow key={lecture.id}>
                      <TableCell className="font-medium">
                        {lecture.title}
                      </TableCell>
                      <TableCell>{lecture.dateDelivered}</TableCell>
                      <TableCell>{lecture.venue}</TableCell>
                      <TableCell>{lecture.audience}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card
          {...(!showCards.researchPaper && { "data-html2canvas-ignore": true })}
          className={`mt-3 ${!showCards.researchPaper ? "hidden" : ""}`}
        >
          <CardHeader className="flex flex-row items-center gap-10">
            <CardTitle>Research Paper Information</CardTitle>
            <Checkbox
              checked={showCards.researchPaper}
              onCheckedChange={() => toggleShowCard("researchPaper")}
              data-html2canvas-ignore
            />
          </CardHeader>
          <CardContent>
            <div className="rounded-xl shadow-xl">
              <Table>
                <TableCaption>Research Papers</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Authors</TableHead>
                    <TableHead>Year of Publication</TableHead>
                    <TableHead>Date of Publication</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {facultyDetails.papersPublished?.papers.map((paper) => (
                    <TableRow key={paper.id}>
                      <TableCell className="font-medium">
                        {paper.title}
                      </TableCell>
                      <TableCell>{paper.authors}</TableCell>
                      <TableCell>{paper.yearOfPublication}</TableCell>
                      <TableCell>{paper.dateOfPublication}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card
          {...(!showCards.financialSupport && {
            "data-html2canvas-ignore": true,
          })}
          className={`mt-3 ${!showCards.financialSupport ? "hidden" : ""}`}
        >
          <CardHeader className="flex flex-row items-center gap-10">
            <CardTitle>Financial Support for Conferences/Workshops</CardTitle>
            <Checkbox
              checked={showCards.financialSupport}
              onCheckedChange={() => toggleShowCard("financialSupport")}
              data-html2canvas-ignore
            />
          </CardHeader>
          <CardContent>
            <div className="rounded-xl shadow-xl">
              <Table>
                <TableCaption>
                  Financial Support for Conferences/Workshops
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Date From</TableHead>
                    <TableHead>Date To</TableHead>
                    <TableHead>Membership Fee</TableHead>
                    <TableHead>Travel Expenses</TableHead>
                    <TableHead>Registration Fee</TableHead>
                    <TableHead>Amount Provided</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {facultyDetails.financialSupport?.supports.map((support) => (
                    <TableRow key={support.id}>
                      <TableCell className="font-medium">
                        {support.title}
                      </TableCell>
                      <TableCell>{support.dateFrom}</TableCell>
                      <TableCell>{support.dateTo}</TableCell>
                      <TableCell>{support.membershipFee}</TableCell>
                      <TableCell>{support.travelExpenses}</TableCell>
                      <TableCell>{support.registrationFee}</TableCell>
                      <TableCell>{support.amountProvided}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card
          {...(!showCards.fellowships && { "data-html2canvas-ignore": true })}
          className={`mt-3 ${!showCards.fellowships ? "hidden" : ""}`}
        >
          <CardHeader className="flex flex-row items-center gap-10">
            <CardTitle>
              Granted National/International Fellowship/Financial Support
            </CardTitle>
            <Checkbox
              checked={showCards.fellowships}
              onCheckedChange={() => toggleShowCard("fellowships")}
              data-html2canvas-ignore
            />
          </CardHeader>
          <CardContent>
            <div className="rounded-xl shadow-xl">
              <Table>
                <TableCaption>National/International Fellowships</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fellowship Name</TableHead>
                    <TableHead>Financial Support</TableHead>
                    <TableHead>Purpose of Grant</TableHead>
                    <TableHead>Stature of Fellowship</TableHead>
                    <TableHead>Awarding Agency</TableHead>
                    <TableHead>Date of Award</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {facultyDetails.fellowshipSupport?.fellowships.map(
                    (fellowship) => (
                      <TableRow key={fellowship.id}>
                        <TableCell className="font-medium">
                          {fellowship.nameOfFellowship}
                        </TableCell>
                        <TableCell>{fellowship.financialSupport}</TableCell>
                        <TableCell>{fellowship.purposeOfGrant}</TableCell>
                        <TableCell>{fellowship.statureOfFellowship}</TableCell>
                        <TableCell>{fellowship.awardingAgency}</TableCell>
                        <TableCell>{fellowship.dateOfAward}</TableCell>
                      </TableRow>
                    ),
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card
          {...(!showCards.committeeDetails && {
            "data-html2canvas-ignore": true,
          })}
          className={`mt-3 ${!showCards.committeeDetails ? "hidden" : ""}`}
        >
          <CardHeader className="flex flex-row items-center gap-10">
            <CardTitle>
              Institutional and Department Committee Details
            </CardTitle>
            <Checkbox
              checked={showCards.committeeDetails}
              onCheckedChange={() => toggleShowCard("committeeDetails")}
              data-html2canvas-ignore
            />
          </CardHeader>
          <CardContent>
            <div className="rounded-xl shadow-xl">
              <Table>
                <TableCaption>
                  Institutional/Department Committee Details
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Committee Name</TableHead>
                    <TableHead>Duration of Service (Years)</TableHead>
                    <TableHead>Role/Position</TableHead>
                    <TableHead>Proof</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {facultyDetails.committeeDetails?.committees.map(
                    (committee) => (
                      <TableRow key={committee.id}>
                        <TableCell className="font-medium">
                          {committee.committeeName}
                        </TableCell>
                        <TableCell>{committee.durationOfService}</TableCell>
                        <TableCell>{committee.roleOrPosition}</TableCell>
                        <TableCell>{committee.proof}</TableCell>
                      </TableRow>
                    ),
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        <Card
          {...(!showCards.activityDetails && {
            "data-html2canvas-ignore": true,
          })}
          className={`mt-3 ${!showCards.activityDetails ? "hidden" : ""}`}
        >
          <CardHeader className="flex flex-row items-center gap-10">
            <CardTitle>Co-curricular/Extracurricular Activities</CardTitle>
            <Checkbox
              checked={showCards.activityDetails}
              onCheckedChange={() => toggleShowCard("activityDetails")}
              data-html2canvas-ignore
            />
          </CardHeader>
          <CardContent>
            <div className="rounded-xl shadow-xl">
              <Table>
                <TableCaption>Activities</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Activity Name</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Role/Position</TableHead>
                    <TableHead>Achievements</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {facultyDetails.activityDetails?.activities.map(
                    (activity) => (
                      <TableRow key={activity.id}>
                        <TableCell className="font-medium">
                          {activity.activityName}
                        </TableCell>
                        <TableCell>{activity.duration}</TableCell>
                        <TableCell>{activity.roleOrPosition}</TableCell>
                        <TableCell>{activity.achievements}</TableCell>
                      </TableRow>
                    ),
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        <Card
          {...(!showCards.trainingRevenues && {
            "data-html2canvas-ignore": true,
          })}
          className={`mt-3 ${!showCards.trainingRevenues ? "hidden" : ""}`}
        >
          <CardHeader className="flex flex-row items-center gap-10">
            <CardTitle>Consultancy and Corporate Training Revenue</CardTitle>
            <Checkbox
              checked={showCards.trainingRevenues}
              onCheckedChange={() => toggleShowCard("trainingRevenues")}
              data-html2canvas-ignore
            />
          </CardHeader>
          <CardContent>
            <div className="rounded-xl shadow-xl">
              <Table>
                <TableCaption>
                  Consultancy/Corporate Training Revenue
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Organization</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Duration</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {facultyDetails.trainingRevenues?.revenues.map((revenue) => (
                    <TableRow key={revenue.id}>
                      <TableCell className="font-medium">
                        {revenue.name}
                      </TableCell>
                      <TableCell>{revenue.organization}</TableCell>
                      <TableCell>{revenue.amount}</TableCell>
                      <TableCell>{revenue.dates}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
      <Button
        onClick={handlePrint}
        className="text-white margin-x-auto justify-center items-center"
        data-html2canvas-ignore
      >
        Download
      </Button>
      {/* {facultyDetails !== "" && (
        <div data-html2canvas-ignore>
          <ProfileDownload facultyDetails={facultyDetails} />
        </div>
      )} */}
    </div>
  );
};
