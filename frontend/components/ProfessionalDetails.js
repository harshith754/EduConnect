import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Spinner } from "./Spinner";

const ProfessionalDetails = () => {
  // State for form fields'
  const { data: session } = useSession();

  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const [dateOfJoining, setDateOfJoining] = useState("");
  const [highestQualification, setHighestQualification] = useState("");
  const [totalYearsOfTeachingExperience, setTotalYearsOfTeachingExperience] =
    useState("");
  const [
    totalYearsOfTeachingExperienceInInstitute,
    setTotalYearsOfTeachingExperienceInInstitute,
  ] = useState("");

  // State for multiple educational qualifications
  const [educationalQualifications, setEducationalQualifications] = useState([
    { degree: "", institute: "", yearOfCompletion: "" },
  ]);

  const [message, setMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  useState(() => {
    if (message !== "");
    console.log(message);
  }, [message]);

  const calculateTeachingExperience = () => {
    // Check if the dateOfJoining is in the correct format (MM/YYYY)
    // const datePattern = /^(0[1-9]|1[0-2])\/(19\d{2}|20\d{2})$/; // MM/YYYY format
    // if (!datePattern.test(dateOfJoining)) {
    //   toast("Invalid date format. Please enter the date in MM/YYYY format.");

    //   return;
    // }

    // Split the dateOfJoining into month and year
    const [joiningMonth, joiningYear] = dateOfJoining.split("/").map(Number);
    // Get the current date
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    // Validate the month and year values
    if (joiningMonth < 1 || joiningMonth > 12) {
      toast("Invalid month. Please enter a month between 01 and 12.");
      return;
    }
    if (joiningYear < 1900 || joiningYear > currentYear) {
      toast(
        `Invalid year. Please enter a year between 1900 and ${currentYear}.`,
      );

      return;
    } // Note: Month is 0-indexed in JavaScript

    // Calculate the difference in years
    let yearsOfExperience = currentYear - joiningYear;

    // Adjust years if the current month is before the joining month
    if (currentMonth < joiningMonth) {
      yearsOfExperience--;
    }
    setTotalYearsOfTeachingExperienceInInstitute((p) => yearsOfExperience);
  };

  const [formEditable, setFormEditable] = useState(true);

  useEffect(() => {
    getProfessionalDetails();
  }, []);

  const getProfessionalDetails = async () => {
    setIsLoading(true);
    const { data } = await axios.get(
      `/api/professional-details/${session.user.email}`,
    );

    console.log(data.professionalDetails);
    if (data && data.professionalDetails) {
      const reqData = data.professionalDetails;
      setDesignation(reqData.designation);
      setDepartment(reqData.department);
      setDateOfJoining(reqData.dateOfJoining);
      const formattedEducationalQualifications =
        reqData.educationalQualifications.map(
          ({ professionalDetailsId, ...rest }) => rest,
        );
      setEducationalQualifications(formattedEducationalQualifications);
      setTotalYearsOfTeachingExperience(reqData.teachingExperience);
      setTotalYearsOfTeachingExperienceInInstitute(reqData.instituteExperience);
      setHighestQualification(reqData.highestQualification);
      setFormEditable(false);
      toast("Info loaded");
    }
    setIsLoading(false);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Client-side validation logic
    if (
      !designation ||
      !department ||
      !dateOfJoining ||
      !highestQualification ||
      !totalYearsOfTeachingExperience ||
      !totalYearsOfTeachingExperienceInInstitute ||
      !educationalQualifications
    ) {
      toast.error("Please fill out all required fields.");
      return;
    }

    // If all validations pass, proceed with form submission
    console.log("Professional Details submitted:", {
      designation,
      department,
      dateOfJoining,
      highestQualification,
      totalYearsOfTeachingExperience,
      totalYearsOfTeachingExperienceInInstitute,
      educationalQualifications,
      email: session.user.email,
    });

    axios.post("/api/professional-details", {
      designation,
      department,
      dateOfJoining,
      highestQualification,
      teachingExperience: totalYearsOfTeachingExperience,
      instituteExperience: totalYearsOfTeachingExperienceInInstitute,
      educationalQualifications,
      email: session.user.email,
    });
    setFormEditable(false);
  };

  // Function to add a new educational qualification section
  const handleAddEducation = () => {
    setEducationalQualifications([
      ...educationalQualifications,
      { degree: "", institute: "", yearOfCompletion: "" },
    ]);
  };
  const handleDeleteEducation = (index) => {
    const updatedEducationalQualifications = [...educationalQualifications];
    updatedEducationalQualifications.splice(index, 1);
    setEducationalQualifications(updatedEducationalQualifications);
  };

  // Function to update educational qualification details
  const handleEducationChange = (index, field, value) => {
    const updatedEducations = [...educationalQualifications];
    updatedEducations[index][field] = value;
    setEducationalQualifications(updatedEducations);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col px-6 py-3">
      <h2 className="text-lg font-bold mb-4">Professional Details Form</h2>
      <form className="flex flex-col gap-4">
        <Label>Designation:</Label>

        <Select
          value={designation}
          className="block w-max mt-1 px-10 disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
          onValueChange={(e) => {
            setDesignation(e);
          }}
          defaultValue={designation}
          disabled={!formEditable}
        >
          <SelectTrigger className="w-max disabled:bg-gray-300 disabled:text-black disabled:opacity-100">
            <SelectValue placeholder="Select Designation" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="Professor">Professor</SelectItem>
            <SelectItem value="Associate Professor">
              Associate Professor
            </SelectItem>
            <SelectItem value="Assistant Professor">
              Assistant Professor
            </SelectItem>
            <SelectItem value="Lecturer">Lecturer</SelectItem>
            <SelectItem value="Research Scientist">
              Research Scientist
            </SelectItem>
          </SelectContent>
        </Select>

        <Label>Department:</Label>
        <Select
          value={department}
          className="block w-[280px] mt-1 disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
          onValueChange={(e) => {
            setDepartment(e);
          }}
          defaultValue={department}
          disabled={!formEditable}
        >
          <SelectTrigger className="w-max disabled:bg-gray-300 disabled:text-black disabled:opacity-100">
            <SelectValue placeholder="Select Department" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="Computer Engineering">
              Computer Engineering
            </SelectItem>
            <SelectItem value="Electronics and Telecommunication Engineering (EXTC)">
              Electronics and Telecommunication Engineering (EXTC)
            </SelectItem>
            <SelectItem value="Computer Science">Computer Science</SelectItem>
            <SelectItem value="Data Science">Data Science</SelectItem>
            <SelectItem value="Artificial Intelligence and Machine Learning (AIML)">
              Artificial Intelligence and Machine Learning (AIML)
            </SelectItem>
            {/* Add more department options as needed */}
          </SelectContent>
        </Select>
        <Label>Date of Joining:</Label>
        <Input
          type="date"
          placeholder="MM/YYYY"
          value={dateOfJoining}
          onChange={(e) => {
            setDateOfJoining(e.target.value);

            if (dateOfJoining >= 7) calculateTeachingExperience();
          }}
          disabled={!formEditable}
          className={
            "disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
          }
        />

        <Label>Highest Qualification:</Label>
        <Select
          value={highestQualification}
          className={
            "block  mt-1 disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
          }
          onValueChange={(e) => {
            setHighestQualification(e);
          }}
          defaultValue={highestQualification}
          disabled={!formEditable}
        >
          <SelectTrigger className="w-max p-5 disabled:bg-gray-300 disabled:text-black disabled:opacity-100">
            <SelectValue placeholder="Select Highest Qualification" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="Ph.D. in Engineering">
              Ph.D. in Engineering
            </SelectItem>
            <SelectItem value="M.S. in Engineering">
              M.S. in Engineering
            </SelectItem>
            <SelectItem value="M.Eng. in Engineering">
              M.Eng. in Engineering
            </SelectItem>
            <SelectItem value="M.Tech. in Engineering">
              M.Tech. in Engineering
            </SelectItem>
            <SelectItem value="MCA for Computer Engineering faculty">
              MCA for Computer Engineering faculty
            </SelectItem>
            <SelectItem value="B.E. in Engineering">
              B.E. in Engineering
            </SelectItem>
            <SelectItem value="B.Tech. in Engineering">
              B.Tech. in Engineering
            </SelectItem>
            <SelectItem value="B.S. in Engineering">
              B.S. in Engineering
            </SelectItem>
          </SelectContent>
        </Select>

        <Label>Total Years of Teaching Experience:</Label>
        <Input
          type="text"
          placeholder="Total Years of Teaching Experience"
          value={totalYearsOfTeachingExperience}
          onChange={(e) => setTotalYearsOfTeachingExperience(e.target.value)}
          disabled={!formEditable}
          className={
            "disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
          }
        />

        <Label>Total Years of Teaching Experience (In Institute):</Label>
        <Input
          type="text"
          placeholder="Total Years of Teaching Experience (In Institute)"
          value={totalYearsOfTeachingExperienceInInstitute}
          onChange={(e) =>
            setTotalYearsOfTeachingExperienceInInstitute(e.target.value)
          }
          className={
            "disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
          }
          disabled={!formEditable}
        />

        <Label>Educational Qualifications:</Label>
        {educationalQualifications.map((education, index) => (
          <div key={index} className="flex gap-4">
            <Input
              type="text"
              placeholder="Degree"
              value={education.degree}
              onChange={(e) =>
                handleEducationChange(index, "degree", e.target.value)
              }
              className={
                "disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
              }
              disabled={!formEditable}
            />
            <Input
              type="text"
              placeholder="Institute"
              value={education.institute}
              onChange={(e) =>
                handleEducationChange(index, "institute", e.target.value)
              }
              className={
                "disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
              }
              disabled={!formEditable}
            />
            <Input
              type="text"
              placeholder="Year"
              value={education.yearOfCompletion}
              onChange={(e) =>
                handleEducationChange(index, "yearOfCompletion", e.target.value)
              }
              className={
                "disabled:bg-gray-300 disabled:text-black disabled:opacity-100"
              }
              disabled={!formEditable}
            />
            {formEditable && (
              <Button
                type="button"
                onClick={() => handleDeleteEducation(index)}
              >
                Delete
              </Button>
            )}
          </div>
        ))}

        {formEditable && (
          <>
            <Button
              type="button"
              onClick={handleAddEducation}
              className="bg-green-500 text-white py-2 px-4 rounded"
            >
              Add Educational Qualifications.
            </Button>
            <Button
              type="submit"
              className="mx-auto w-[300px] text-white py-2 px-4 rounded"
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

export default ProfessionalDetails;
