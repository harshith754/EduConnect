import React from "react";
import * as XLSX from "xlsx";
import { Button } from "./ui/button";

const ExcelDownload = ({ jsonData }) => {
  const downloadExcel = () => {
    const data = [];

    jsonData.forEach((item) => {
      // Extract personal details
      const personalDetails = {};
      const professionalDetails = {};
      const counts = {}; // New object for counts

      // Extract personal details
      if (item.email) personalDetails.Email = item.email;
      if (item.name) personalDetails.Name = item.name;
      if (item.personalDetails?.fullName)
        personalDetails["Full Name"] = item.personalDetails.fullName;
      if (item.personalDetails?.gender)
        personalDetails.Gender = item.personalDetails.gender;
      if (item.personalDetails?.dateOfBirth)
        personalDetails["Date of Birth"] = item.personalDetails.dateOfBirth;
      if (item.personalDetails?.mobileNumber)
        personalDetails["Mobile Number"] = item.personalDetails.mobileNumber;
      if (item.personalDetails?.aadharDetails)
        personalDetails["Aadhar Details"] = item.personalDetails.aadharDetails;
      if (item.personalDetails?.facultyId)
        personalDetails["Faculty ID"] = item.personalDetails.facultyId;
      if (item.personalDetails?.bloodGroup)
        personalDetails["Blood Group"] = item.personalDetails.bloodGroup;

      // Extract professional details
      if (item.professionalDetails?.department)
        professionalDetails.Department = item.professionalDetails.department;
      if (item.professionalDetails?.designation)
        professionalDetails.Designation = item.professionalDetails.designation;
      if (item.professionalDetails?.dateOfJoining)
        professionalDetails["Date of Joining"] =
          item.professionalDetails.dateOfJoining;
      if (item.professionalDetails?.highestQualification)
        professionalDetails["Highest Qualification"] =
          item.professionalDetails.highestQualification;
      if (item.professionalDetails?.teachingExperience)
        professionalDetails["Teaching Experience"] =
          item.professionalDetails.teachingExperience;
      if (item.professionalDetails?.instituteExperience)
        professionalDetails["Institute Experience"] =
          item.professionalDetails.instituteExperience;
      if (item.professionalDetails?.recognizedAsResearchGuide)
        professionalDetails["Recognized as Research Guide"] =
          item.professionalDetails.recognizedAsResearchGuide;
      if (item.professionalDetails?.yearOfRecognition)
        professionalDetails["Year of Recognition"] =
          item.professionalDetails.yearOfRecognition;

      // Add counts
      if (item.booksPublished?._count?.books !== undefined) {
        counts["Number of Books"] = item.booksPublished._count.books;
      }
      if (item.patentsRegistered?._count?.patents !== undefined) {
        counts["Number of Patents"] = item.patentsRegistered._count.patents;
      }
      if (item.awardsReceived?._count?.awards !== undefined) {
        counts["Number of Awards"] = item.awardsReceived._count.awards;
      }

      let isPushed = false;

      // Extract books
      if (item.booksPublished?.books) {
        item.booksPublished.books.forEach((book) => {
          const rowData = {
            ...personalDetails,
            ...professionalDetails,
            ...counts,
          };

          if (book.title) rowData.Title = book.title;
          if (book.publishers) rowData.Publishers = book.publishers;
          if (book.yearOfPublication)
            rowData.YearOfPublication = book.yearOfPublication;
          if (book.dateOfPublication)
            rowData.DateOfPublication = book.dateOfPublication;

          data.push(rowData);
          isPushed = true;
        });
      }

      // Extract patents
      if (item.patentsRegistered?.patents) {
        item.patentsRegistered.patents.forEach((patent) => {
          const rowData = {
            ...personalDetails,
            ...professionalDetails,
            ...counts,
          };

          if (patent.patentType) rowData["Patent Type"] = patent.patentType;
          if (patent.applicationNo)
            rowData["Application No"] = patent.applicationNo;
          if (patent.patentTitle) rowData["Patent Title"] = patent.patentTitle;
          if (patent.publicationDate)
            rowData["Publication Date"] = patent.publicationDate;
          if (patent.formFillingDate)
            rowData["Form Filling Date"] = patent.formFillingDate;
          if (patent.authorList) rowData["Author List"] = patent.authorList;
          if (patent.publishedYear)
            rowData["Published Year"] = patent.publishedYear;

          data.push(rowData);
          isPushed = true;
        });
      }

      // Extract awards
      if (item.awardsReceived?.awards) {
        item.awardsReceived.awards.forEach((award) => {
          const rowData = {
            ...personalDetails,
            ...professionalDetails,
            ...counts,
          };

          if (award.awardName) rowData["Award Name"] = award.awardName;
          if (award.agencyName) rowData["Agency Name"] = award.agencyName;
          if (award.agencyEmail) rowData["Agency Email"] = award.agencyEmail;
          if (award.agencyAddress)
            rowData["Agency Address"] = award.agencyAddress;
          if (award.yearReceived) rowData["Year Received"] = award.yearReceived;
          if (award.hasFellowship)
            rowData["Has Fellowship"] = award.hasFellowship;

          data.push(rowData);
          isPushed = true;
        });
      }

      if (!isPushed) {
        data.push({ ...personalDetails, ...professionalDetails, ...counts });
      }
    });

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Faculty Information");

    XLSX.writeFile(wb, "FacultyInformation.xlsx");
  };

  return (
    <Button onClick={downloadExcel} className="text-white mt-4 bg-red-500">
      Download Excel
    </Button>
  );
};

export default ExcelDownload;
