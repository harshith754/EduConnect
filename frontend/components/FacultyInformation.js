import axios from "axios";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

export const FacultyInformation = () => {
  const [selectedFields, setSelectedFields] = useState([]);
  const [selectedTitles, setSelectedTitles] = useState([]);

  const availableFields = [
    {
      title: "User",
      fields: [
        "email",
        "name",
        {
          title: "PersonalDetails",
          fields: [
            "fullName",
            "gender",
            "dateOfBirth",
            "mobileNumber",
            "aadharDetails",
            "facultyId",
            "bloodGroup",
          ],
        },
        {
          title: "ProfessionalDetails",
          fields: [
            "email",
            "department",
            "designation",
            "dateOfJoining",
            "highestQualification",
            "teachingExperience",
            "instituteExperience",
            "recognizedAsResearchGuide",
            "yearOfRecognition",
          ],
        },
        {
          title: "BooksPublished",
          fields: [
            "title",
            "publishers",
            "yearOfPublication",
            "dateOfPublication",
          ],
        },
        {
          title: "PatentsRegistered",
          fields: [
            "patentType",
            "applicationNo",
            "patentTitle",
            "publicationDate",
            "formFillingDate",
            "authorList",
            "publishedYear",
          ],
        },
        {
          title: "AwardsReceived",
          fields: [
            "awardName",
            "agencyName",
            "agencyEmail",
            "agencyAddress",
            "yearReceived",
            "hasFellowship",
          ],
        },
      ],
    },
  ];

  const handleCheckboxChange = (fieldName, category) => {
    const isSelected = selectedFields.includes(fieldName);

    if (isSelected) {
      // Field is already selected, remove it from the list
      const updatedFields = selectedFields.filter(
        (field) => field !== fieldName,
      );
      setSelectedFields(updatedFields);

      // Check if the category title is not used by other selected fields
      const isCategoryTitleUsed = selectedFields.some(
        (field) => typeof field !== "string" && field.title === category,
      );
      if (!isCategoryTitleUsed) {
        setSelectedTitles(selectedTitles.filter((title) => title !== category));
      }
    } else {
      // Field is not selected, add it to the list
      const updatedFields = [...selectedFields, fieldName];
      setSelectedFields(updatedFields);

      // Check if the category title is not already added
      const isCategoryTitleAdded = selectedTitles.includes(category);
      if (!isCategoryTitleAdded) {
        setSelectedTitles([...selectedTitles, category]);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(selectedFields);

    const postData = await axios.post("/api/get-information", {
      selectedFields,
      selectedTitles,
    });

    const data = postData.data;

    console.log(JSON.stringify(data));
  };

  const renderCheckboxes = () => {
    return (
      <div className="flex flex-col divide-y-2 pl-5">
        {availableFields.map((table) => (
          <div key={table.title}>
            <h1>{table.title}:</h1>
            <div className="flex flex-col">
              {Array.isArray(table.fields) &&
                table.fields.map((field) =>
                  typeof field === "string" ? (
                    <div className="flex flex-row gap-3 py-1 px-3">
                      <Label key={field}>{field}</Label>

                      <Checkbox
                        checked={selectedFields.includes(field)}
                        onCheckedChange={() =>
                          handleCheckboxChange(field, table.title)
                        }
                      />
                    </div>
                  ) : (
                    <div key={field.title}>
                      <h2>{field.title}</h2>
                      {Array.isArray(field.fields) &&
                        field.fields.map((subField) => (
                          <div className="flex flex-row gap-3 py-1 px-3">
                            <Label key={subField}>{subField}</Label>

                            <Checkbox
                              checked={selectedFields.includes(subField)}
                              onCheckedChange={() =>
                                handleCheckboxChange(subField, field.title)
                              }
                            />
                          </div>
                        ))}
                    </div>
                  ),
                )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col px-6 py-3">
      <div className="flex flex-row gap-[80px] ">
        <div>
          <h1 className="text-lg font-bold mb-4">Select Required Fields</h1>
          {renderCheckboxes()}
        </div>

        <div>
          <h1 className="text-lg font-bold mb-4">Selected Fields</h1>
          <ul>
            {selectedFields.map((title, index) => (
              <li className="pl-3 text-sm" key={index}>
                {title}
              </li>
            ))}
          </ul>

          <Button onClick={handleSubmit}>Get Information</Button>
        </div>

        <div>
          <h1 className="text-lg font-bold mb-4">Selected Categories</h1>
          <ul>
            {selectedTitles.map((title, index) => (
              <li className="pl-3 text-sm" key={index}>
                {title}
              </li>
            ))}
          </ul>

          <Button onClick={handleSubmit}>Get Information</Button>
        </div>
      </div>
    </div>
  );
};
