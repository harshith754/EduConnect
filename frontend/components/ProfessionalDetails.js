import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const ProfessionalDetails = () => {
  // State for form fields
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
    { degree: "", institute: "", year: "" },
  ]);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic for form submission here
    console.log("Professional Details submitted:", {
      designation,
      department,
      dateOfJoining,
      highestQualification,
      totalYearsOfTeachingExperience,
      totalYearsOfTeachingExperienceInInstitute,
      educationalQualifications,
    });
  };

  // Function to add a new educational qualification section
  const handleAddEducation = () => {
    setEducationalQualifications([
      ...educationalQualifications,
      { degree: "", institute: "", year: "" },
    ]);
  };

  // Function to update educational qualification details
  const handleEducationChange = (index, field, value) => {
    const updatedEducations = [...educationalQualifications];
    updatedEducations[index][field] = value;
    setEducationalQualifications(updatedEducations);
  };

  return (
    <div className="flex flex-col px-6 py-3">
      <h2 className="text-lg font-bold mb-4">Professional Details Form</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Label>Designation:</Label>
        <Input
          type="text"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
        />

        <Label>Department:</Label>
        <Input
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />

        <Label>Date of Joining:</Label>
        <Input
          type="text"
          value={dateOfJoining}
          onChange={(e) => setDateOfJoining(e.target.value)}
        />

        <Label>Highest Qualification:</Label>
        <Input
          type="text"
          value={highestQualification}
          onChange={(e) => setHighestQualification(e.target.value)}
        />

        <Label>Total Years of Teaching Experience:</Label>
        <Input
          type="text"
          value={totalYearsOfTeachingExperience}
          onChange={(e) => setTotalYearsOfTeachingExperience(e.target.value)}
        />

        <Label>Total Years of Teaching Experience (In Institute):</Label>
        <Input
          type="text"
          value={totalYearsOfTeachingExperienceInInstitute}
          onChange={(e) =>
            setTotalYearsOfTeachingExperienceInInstitute(e.target.value)
          }
        />

        <Label>Total Years of Teaching Experience (In Institute):</Label>
        <Input
          type="text"
          value={totalYearsOfTeachingExperienceInInstitute}
          onChange={(e) =>
            setTotalYearsOfTeachingExperienceInInstitute(e.target.value)
          }
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
            />
            <Input
              type="text"
              placeholder="Institute"
              value={education.institute}
              onChange={(e) =>
                handleEducationChange(index, "institute", e.target.value)
              }
            />
            <Input
              type="text"
              placeholder="Year"
              value={education.year}
              onChange={(e) =>
                handleEducationChange(index, "year", e.target.value)
              }
            />
          </div>
        ))}

        <Button
          type="button"
          onClick={handleAddEducation}
          className="bg-green-500 text-white py-2 px-4 rounded"
        >
          Add Education
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

export default ProfessionalDetails;
