import axios from "axios";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import ExcelDownload from "./ExcelDownload";

export const FacultyInformation = () => {
  const [selectedFields, setSelectedFields] = useState([]);
  const [selectedTitles, setSelectedTitles] = useState([]);

  const [dataAvailable, setDataAvailable] = useState(false);

  const [data, setData] = useState({});

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

    setDataAvailable(false);

    const { data } = await axios.post("/api/get-information", {
      selectedFields,
      selectedTitles,
    });

    console.log(data.postData);

    const pD = data.postData;

    if (data) {
      const filteredData = pD.map((item) => {
        const filteredItem = { ...item };
        Object.keys(filteredItem).forEach((key) => {
          if (filteredItem[key] === null) {
            delete filteredItem[key];
          } else if (typeof filteredItem[key] === "object") {
            const innerKeys = Object.keys(filteredItem[key]);
            innerKeys.forEach((innerKey) => {
              if (filteredItem[key][innerKey] === null) {
                delete filteredItem[key][innerKey];
              }
            });
          }
        });
        return filteredItem;
      });
      console.log(JSON.stringify(filteredData));
      setData(filteredData);
      setDataAvailable(true);
    } else {
      console.log(JSON.stringify(pD));
    }
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
                      <Checkbox
                        checked={selectedFields.includes(field)}
                        onCheckedChange={() =>
                          handleCheckboxChange(field, table.title)
                        }
                      />
                      <Label key={field}>{field}</Label>
                    </div>
                  ) : (
                    <div key={field.title}>
                      <h2>{field.title}</h2>
                      {Array.isArray(field.fields) &&
                        field.fields.map((subField) => (
                          <div className="flex flex-row gap-3 py-1 px-3">
                            <Checkbox
                              checked={selectedFields.includes(subField)}
                              onCheckedChange={() =>
                                handleCheckboxChange(subField, field.title)
                              }
                            />

                            <Label key={subField}>{subField}</Label>
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

          {dataAvailable && (
            <>
              <ExcelDownload jsonData={data} selectedTitles={selectedTitles} />
            </>
          )}
        </div>
        {/* 
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
        </div> */}
      </div>
    </div>
  );
};
