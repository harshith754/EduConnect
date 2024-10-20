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

export const UserProfile = () => {
  const { data: session } = useSession();

  const [facultyDetails, setFacultyDetails] = useState("");
  console.log(session?.user.email);

  useEffect(() => {
    getPersonalDetails();
  }, [session]);

  const getPersonalDetails = async () => {
    if (session === undefined) return;
    const { data } = await axios.get(
      `/api/faculty-details/${session.user.email}`,
    );

    // const { data } = await axios.get(
    //   `/api/personal-details/${session.user.email}`,
    // );

    console.log(data);

    setFacultyDetails(data.facultyDetails);
  };
  return (
    <div className="flex flex-col px-6 py-3">
      <h2 className="text-lg font-bold mb-4">Faculty Profile</h2>
      <div className="space-y-6 w-[80%]">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-row gap-[30%] px-5">
              <div className="flex flex-col space-y-2">
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

        <Card>
          <CardHeader>
            <CardTitle>Professional Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-2">
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

        <Card>
          <CardHeader>
            <CardTitle>Books Published</CardTitle>
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
        <Card>
          <CardHeader>
            <CardTitle>Patents Registered</CardTitle>
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
        <Card>
          <CardHeader>
            <CardTitle>Appreciation and Awards</CardTitle>
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

        <Card>
          <CardHeader>
            <CardTitle>Guest Lecture/Expert Lecture Delivered</CardTitle>
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

        <Card>
          <CardHeader>
            <CardTitle>Research Paper Information</CardTitle>
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

        <Card>
          <CardHeader>
            <CardTitle>Financial Support for Conferences/Workshops</CardTitle>
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

        <Card>
          <CardHeader>
            <CardTitle>
              Granted National/International Fellowship/Financial Support
            </CardTitle>
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

        <Card>
          <CardHeader>
            <CardTitle>
              Institutional and Department Committee Details
            </CardTitle>
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
        <Card>
          <CardHeader>
            <CardTitle>Co-curricular/Extracurricular Activities</CardTitle>
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
        <Card>
          <CardHeader>
            <CardTitle>Consultancy and Corporate Training Revenue</CardTitle>
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
    </div>
  );
};
