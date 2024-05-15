import axios from "axios";
import { CldImage } from "next-cloudinary";
import React, { useEffect, useState } from "react";

export const FacultyDisplay = () => {
  const [data, setData] = useState();
  useEffect(() => {
    getInformation();
  }, []);

  const getInformation = async () => {
    const selectedFields = [
      "email",
      "fullName",
      "designation",
      "department",
      "highestQualification",
      "teachingExperience",
      "mobileNumber",
      "imageId",
    ];

    const selectedTitles = ["User", "PersonalDetails", "ProfessionalDetails"];

    const { data } = await axios.post("/api/get-information", {
      selectedFields,
      selectedTitles,
    });

    console.log(JSON.stringify(data.postData));

    setData(data.postData);
  };
  return (
    <div className="flex flex-col px-6 py-3 font-normal">
      <h2 className="text-lg font-bold mb-4">All faculties</h2>

      <div className="flex flex-col gap-2">
        {data &&
          data.map((faculty, index) => (
            <div
              key={index}
              className="flex flex-row py-2 shadow-md rounded-md"
            >
              <div className="pr-5 pl-2">
                {faculty?.personalDetails?.imageId && (
                  <CldImage
                    width={200}
                    height={220}
                    crop="fill"
                    src={faculty.personalDetails.imageId}
                    alt="image"
                    className="rounded-lg flex flex-col box-border items-center justify-center"
                  />
                )}
              </div>

              <div>
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  {faculty?.email || ""}
                </p>
                <p>
                  <span className="font-semibold">Full Name:</span>{" "}
                  {faculty?.personalDetails?.fullName || ""}
                </p>
                <p>
                  <span className="font-semibold">Department:</span>{" "}
                  {faculty?.professionalDetails?.department || ""}
                </p>
                <p>
                  <span className="font-semibold">Designation:</span>{" "}
                  {faculty?.professionalDetails?.designation || ""}
                </p>
                <p>
                  <span className="font-semibold">Highest Qualification:</span>{" "}
                  {faculty?.professionalDetails?.highestQualification || ""}
                </p>
                <p>
                  <span className="font-semibold">Mobile Number:</span>{" "}
                  {faculty?.personalDetails?.mobileNumber || ""}
                </p>
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  {faculty?.professionalDetails?.email || ""}
                </p>
                <p>
                  <span className="font-semibold">Teaching Experience:</span>{" "}
                  {faculty?.professionalDetails?.teachingExperience || ""}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
